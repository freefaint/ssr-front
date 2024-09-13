using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using BotX.Api.Abstract;
using BotX.Api.Attributes;
using BotX.Api.Delegates;
using BotX.Api.JsonModel.Request;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace BotX.Api.Middleware;

public class SmartAppMiddleware
{
    private const string SmartAppCommand = "system:smartapp_event";

    private readonly BotMiddlewareHandler next;
    private readonly ILogger<SmartAppMiddleware> _logger;
    private static Dictionary<string, MethodInfo> SmartAppMethods;

    static SmartAppMiddleware()
    {
        SmartAppMethods = new();

        var applicationAssembly = Assembly.GetEntryAssembly();
        var typesWithAttribute = applicationAssembly.GetExportedTypes()
            .Where(x => x.GetCustomAttribute(typeof(SmartAppControllerAttribute)) != null);

        foreach (var type in typesWithAttribute)
        {
            var methods = type.GetMethods()
                .Where(e => e.GetCustomAttributes(typeof(SmartAppControllerMethodAttribute))?.Any() == true).ToList();

            foreach (var method in methods)
            {
                var attrs = method.GetCustomAttributes<SmartAppControllerMethodAttribute>();
                foreach (var attr in attrs)
                {
                    SmartAppMethods[attr.Method] = method;
                }
            }
        }
    }

    public SmartAppMiddleware(BotMiddlewareHandler next, ILogger<SmartAppMiddleware> logger)
    {
        this.next = next;
        this._logger = logger;
    }

    public async Task InvokeAsync(UserMessage message, IBotMessageSender sender, IServiceProvider serviceProvider)
    {
        if (message.Command.Body == SmartAppCommand &&
            !string.IsNullOrWhiteSpace(message.Command?.Data?.SmartAppData?.Method) &&
            SmartAppMethods.Keys.Any(e => Regex.IsMatch(message.Command.Data.SmartAppData.Method, e)))
        {
            var key = SmartAppMethods.Keys.First(e => Regex.IsMatch(message.Command.Data.SmartAppData.Method, e));
            var method = SmartAppMethods[key];
            var instance = serviceProvider.GetService(method.ReflectedType);
            _logger.LogDebug($"SmartAppMiddleware InvokeAsync key - {key}; method - {method}");
            await (Task)method.Invoke(instance, new object[] { message, sender });
        }
        else
        {
            if (message.Command.Body == SmartAppCommand)
            {
                Console.WriteLine($"Received unregistered SmartAppCommand: \r\n {JsonConvert.SerializeObject(message.Command.Data.SmartAppData)}");
            }
            await next(message);

        }
    }
}