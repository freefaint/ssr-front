//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.

//builder.Services.AddControllers();
//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//var app = builder.Build();

//// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//	app.UseSwagger();
//	app.UseSwaggerUI();
//}

//app.UseAuthorization();

//app.MapControllers();

//app.Run();


using Microsoft.AspNetCore;
using Serilog;

namespace Bivgroup.YagokSSR.SmartApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).UseWebRoot("smartapp_files/static").Build();

            var services = host.Services;

            var log = services.GetService<ILogger<Program>>();

            log?.LogInformation("Start");
            try
            {
                host.Run();
            }
            catch (Exception ex)
            {
                log.LogError(ex.ToString());
            }


        }

        [Obsolete]
        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .ConfigureAppConfiguration((context, builder) =>
                {  
                    builder.AddEnvironmentVariables();
                    if (context.HostingEnvironment.IsDevelopment())
                        builder.AddUserSecrets<Program>(true);
                })
                .UseStartup<Startup>()
                .UseSerilog((ctx, cfg) => cfg.ReadFrom.Configuration(ctx.Configuration));
    }
}