using BotX.Api.Configuration;
using BotX.Api.Extensions;
using Bivgroup.YagokSSR.SmartApp.Controllers;
using Bivgroup.YagokSSR.SmartApp.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using Microsoft.Extensions.FileProviders;
using Bivgroup.YagokSSR.SmartApp.Helpers;
using Bivgroup.YagokSSR.SmartApp.PGContext;
using Microsoft.EntityFrameworkCore;

namespace Bivgroup.YagokSSR.SmartApp
{
    public class Startup
    {
        private readonly IConfiguration configuration;

        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            var botConfiguration = configuration.GetSection(key: "BotConfig:BotConfigEntry").Get<List<BotConfigEntry>>();
            var botEntries = MapToBotConfiguration(botConfiguration);
            services.AddOptions();


            services.Configure<YagokApiConfig>(options => configuration.Bind("YagokApiConfig", options));
            services.AddSingleton<YagokApiConfig>(
                ctx => ctx.GetService<IOptions<YagokApiConfig>>().Value);


            services.Configure<BotConfig>(options => configuration.Bind("BotConfig", options));
            services.AddSingleton<BotConfig>(
                ctx => ctx.GetService<IOptions<BotConfig>>().Value);


            services.Configure<StaticFileConfig>(options => configuration.Bind("StaticFileConfig", options));
            services.AddSingleton<StaticFileConfig>(
                ctx => ctx.GetService<IOptions<StaticFileConfig>>().Value);

            services.AddHttpClient<Query.QueryClient>("QueryClient", c =>
            {
                c.BaseAddress = new Uri("https://yagok-api-shtd.kube.severstal.severstalgroup.com");
                var host = c.BaseAddress.ToString().TrimEnd('/').Replace("https://", "");
                c.DefaultRequestHeaders.Add(HeaderNames.Host, host);
            }).ConfigurePrimaryHttpMessageHandler(() =>
            {
                return new HttpClientHandler
                {
                    AllowAutoRedirect = true,
                    UseCookies = false,
                    ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; }
                };
            });
            services.AddHttpClient<Scada.ScadaClient>("ScadaClient", c =>
            {
                c.BaseAddress = new Uri("https://yagok-api-shtd.kube.severstal.severstalgroup.com");
                var host = c.BaseAddress.ToString().TrimEnd('/').Replace("https://", "");
                c.DefaultRequestHeaders.Add(HeaderNames.Host, host);
            }).ConfigurePrimaryHttpMessageHandler(() =>
            {
                return new HttpClientHandler
                {
                    AllowAutoRedirect = true,
                    UseCookies = false,
                    ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; }
                };
            });

            services.AddHttpClient<MainController>(c =>
            {
                var host = configuration["BotConfig:ApiBaseUrl"].TrimEnd('/').Replace("https://", "");
                //c.DefaultRequestHeaders.Add(HeaderNames.UserAgent, "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36");
                c.DefaultRequestHeaders.Add(HeaderNames.Host, host);
            }).ConfigurePrimaryHttpMessageHandler(() =>
            {
                return new HttpClientHandler
                {
                    AllowAutoRedirect = false,
                    UseCookies = false,
                    ServerCertificateCustomValidationCallback = (message, cert, chain, errors) => { return true; }
                };
            });

            services.AddDbContext<PostgresContext>(options => {
                options.UseNpgsql(configuration.GetConnectionString("DefaultConnection"), zop => zop.EnableRetryOnFailure());


            });
            services.AddScoped<MainController>();
            services.AddExpressBot(config: new(botEntries, inChatExceptions: true)).AddBaseCommand("test","Тестовая комманда");

            services.AddSingleton<ReplaceSettings>(provider => new ReplaceSettings(configuration.GetSection("Replaces").Get<ReplaceItem[]>()));
            services.AddSingleton<ApiHelper>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseDefaultFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
           Path.Combine(env.ContentRootPath, "smartapp_files/static")),
                RequestPath = ""
            });

            app.UseExpress();
            app.ApplicationServices.GetService<ApiHelper>();

        }





    public static IEnumerable<BotEntry> MapToBotConfiguration(IEnumerable<BotConfigEntry> botConfiguration)
        {
            List<BotEntry> botEntries = new(capacity: botConfiguration.Count());

            foreach (var configurationEntry in botConfiguration)
            {
                var botEntry = new BotEntry(
                    cts: new Uri(configurationEntry.BOT_CTS),
                    botId: Guid.Parse(configurationEntry.BOT_ID),
                    secret: configurationEntry.BOT_SECRET);

                botEntries.Add(botEntry);
            }

            return botEntries;
        }
    }
}
