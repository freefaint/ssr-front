using BotX.Api.Configuration;
using BotX.Api.Extensions;
using Bivgroup.YagokSSR.SmartApp.Controllers;
using Bivgroup.YagokSSR.SmartApp.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using Microsoft.Extensions.FileProviders;

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

            //if (!Uri.TryCreate(configuration["BotConfig:BOT_CTS"], UriKind.Absolute, out var cts))
            //    throw new Exception("The cts url could not be found. Please set the BOT_CTS variable in your 'User Secret' or Environment variables");

            //if (!Guid.TryParse(configuration["BotConfig:BOT_ID"], out var botId))
            //    throw new Exception("The bot id could not be found. Please set the BOT_ID variable in your 'User Secret' or Environment variables");

            //var secret = configuration["BotConfig:BOT_SECRET"];

            //if (string.IsNullOrWhiteSpace(secret))
            //    throw new Exception("The bot secret could not be found. Please set the BOT_SECRET variable in your 'User Secret' or Environment variables");

            var botEntries = MapToBotConfiguration(botConfiguration);

            services.AddOptions();

            services.Configure<BotConfig>(options => configuration.Bind("BotConfig", options));
            services.AddSingleton<BotConfig>(
                ctx => ctx.GetService<IOptions<BotConfig>>().Value);


            services.Configure<StaticFileConfig>(options => configuration.Bind("StaticFileConfig", options));
            services.AddSingleton<StaticFileConfig>(
                ctx => ctx.GetService<IOptions<StaticFileConfig>>().Value);

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


            services.AddScoped<MainController>();

            services.AddExpressBot(config: new(botEntries, inChatExceptions: true));

            services.AddSingleton<ReplaceSettings>(provider => new ReplaceSettings(configuration.GetSection("Replaces").Get<ReplaceItem[]>()));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseExpress();
            var options = new DefaultFilesOptions();
            options.DefaultFileNames.Clear();
            options.DefaultFileNames.Add("index.html");
            app.UseDefaultFiles(options);
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
           Path.Combine(env.ContentRootPath, "smartapp_files")),
                RequestPath = ""
            });
        
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
