using System;

namespace BotX.Api.Attributes
{
    /// <summary>
    /// Атрибут метода-обработчика запроса от SmartApp
    /// </summary>
    [AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public class SmartAppControllerMethodAttribute : Attribute
    {
        public string Method { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="method">Значение поля "method" из запроса SmartApp</param>
        public SmartAppControllerMethodAttribute(string method)
        {
            Method = method;
        }

        private SmartAppControllerMethodAttribute() { }
    }
}
