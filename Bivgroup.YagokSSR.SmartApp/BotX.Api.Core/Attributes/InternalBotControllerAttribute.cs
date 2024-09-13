using System;

namespace BotX.Api.Attributes;

/// <summary>
/// Атрибут класса, содержащего обработчики запросов от system:internal_bot_notification
/// </summary>
[AttributeUsage(AttributeTargets.Class)]
public class InternalBotControllerAttribute : Attribute
{
}
