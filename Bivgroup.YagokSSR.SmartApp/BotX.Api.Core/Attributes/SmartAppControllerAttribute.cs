using System;

namespace BotX.Api.Attributes;

/// <summary>
/// Атрибут класса, содержащего обработчики запросов от SmartApp
/// </summary>
[AttributeUsage(AttributeTargets.Class)]
public class SmartAppControllerAttribute : Attribute
{

}
