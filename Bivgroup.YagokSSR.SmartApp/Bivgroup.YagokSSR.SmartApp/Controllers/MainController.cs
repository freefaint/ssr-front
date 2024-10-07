using System.Diagnostics;
using System.Text;
using BotX.Api.Abstract;
using BotX.Api.Attributes;
using BotX.Api.Configuration;
using BotX.Api.JsonModel.Request;
using Flurl;
using Bivgroup.YagokSSR.SmartApp.Helpers;
using Bivgroup.YagokSSR.SmartApp.Models;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace Bivgroup.YagokSSR.SmartApp.Controllers;

[SmartAppController]
public class MainController
{
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly ReplaceSettings _replaceSettings;
    private readonly string _apiBaseUrl;

    private readonly ILogger<MainController> _logger;


    public MainController(IHttpClientFactory httpClientFactory,
        ReplaceSettings replaceSettings, IConfiguration configuration,
        ILogger<MainController> logger,
        IOptions<BotConfig> botConfig
        )
    {
        _httpClientFactory = httpClientFactory;
        _replaceSettings = replaceSettings;
        _apiBaseUrl = botConfig.Value.ApiBaseUrl;

        _logger = logger;
    }

    [SmartAppControllerMethod("\\S+ \\S+")]
    public async Task ProcessRequest(UserMessage message, IBotMessageSender sender)
    {
        _logger.LogInformation("ProcessRequest");
        HttpResponseMessage result;
        var sw = new Stopwatch();
        sw.Start();
        try
        {
            var httpClient = _httpClientFactory.CreateClient(this.GetType().Name);


            var method = message.Command.Data.SmartAppData.Method.Split(' ')[0];

            var url = Url.Combine(_apiBaseUrl, message.Command.Data.SmartAppData.Method.Split(' ')[1]);
            _logger.LogDebug($"ProcessRequest input data method: {method}; url {url} inputMethod {message.Command.Data.SmartAppData.Method} ");

            #region проброс авторизационного токена
            if (!string.IsNullOrWhiteSpace(ApiHelper._instance.token))
                httpClient.CreateAuthHeaders(ApiHelper._instance.token);
            #endregion
            if (BotXBridgeWhiteList.Hosts.Any(c => url.Contains(c.ToLower()))) { 
            
            }

            switch (method)
            {
                case "GET":
                    result = await httpClient.GetAsync(url);
                    break;
                case "POST":
                    result = await httpClient.PostAsync(url,
                        new StringContent(message.Command.Data.SmartAppData.SmartAppParams.Body, Encoding.UTF8, "application/json"));
                    break;
                case "PUT":
                    result = await httpClient.PutAsync(url,
                        new StringContent(message.Command.Data.SmartAppData.SmartAppParams.Body, Encoding.UTF8, "application/json"));
                    break;
                case "DELETE":
                    result = await httpClient.DeleteAsync(url);
                    break;
                default: throw new ArgumentException();
            }

            var dataString = await result.Content.ReadAsStringAsync();
            _logger.LogInformation($"ProcessRequest origin {dataString}");

            object data = null;

            if (!string.IsNullOrWhiteSpace(dataString))
            {
                foreach (var item in _replaceSettings.ReplaceItems)
                {
                    dataString = dataString.Replace(item.OriginalString, item.ReplacedString, StringComparison.InvariantCultureIgnoreCase);
                }

                _logger.LogInformation($"ProcessRequest updated {dataString}");

                data = JsonConvert.DeserializeObject(dataString);
            }


            await sender.SendSmartAppResponseAsync(message, data);
        }
        catch (Exception ex)
        {
            _logger.LogInformation($"ProcessRequest {ex.Message}", ex);
            await sender.SendSmartAppResponseAsync(message, ex);

            throw;
        }
        finally
        {
            sw.Stop();
            Console.WriteLine($"Time elasped: {sw.ElapsedMilliseconds}ms");
        }

    }
}