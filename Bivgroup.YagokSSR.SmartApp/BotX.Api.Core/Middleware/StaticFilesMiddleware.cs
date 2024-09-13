using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using BotX.Api.Configuration;
using BotX.Api.Executors;
using BotX.Api.JsonModel.Request;
using Flurl;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace BotX.Api.Middleware;

internal class StaticFilesMiddleware
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly StaticFileConfig _staicFiles;
    private readonly RequestDelegate next;

    private const string _contentUrlBasePart = "smartapp_files/static/content_holder/";

    public StaticFilesMiddleware(RequestDelegate next,
        IConfiguration configuration, IHttpClientFactory httpClientFactory,
        IOptions<StaticFileConfig> staicFiles)
    {
        this.next = next;
        _httpClientFactory = httpClientFactory;
        _staicFiles = staicFiles.Value;

    }

    public async Task InvokeAsync(HttpContext context, ILogger<StaticFilesMiddleware> logger, IServiceProvider serviceProvider)
    {
        var path = context.Request.Path.Value.Trim('/');
        try
        {
            if (path.StartsWith(_contentUrlBasePart))
            {
                Stream resp;
                var client = _httpClientFactory.CreateClient(this.GetType().Name);

                var url = path.Replace(_contentUrlBasePart, _staicFiles.StaticFilesOrigin);

                if (_staicFiles.Headers.Any())
                {
                    _staicFiles.Headers.ToList().ForEach(item =>
                    {
                        client.DefaultRequestHeaders.Add(item.Key, item.Value);
                    });
                }

                resp = await client.GetStreamAsync(url);
                await resp.CopyToAsync(context.Response.Body);
                await context.Response.Body.FlushAsync();
            }
            else if (File.Exists(path))
            {
                await using var rs = File.OpenRead(path);
                await rs.CopyToAsync(context.Response.Body);
                await context.Response.Body.FlushAsync();
            }
            else
                throw new FileNotFoundException("File not found");
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
}