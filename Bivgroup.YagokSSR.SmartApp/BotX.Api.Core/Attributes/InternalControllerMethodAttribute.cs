using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BotX.Api.Attributes
{
    /// <summary>
	/// Атрибут метода-обработчика запроса от SmartApp
	/// </summary>
	[AttributeUsage(AttributeTargets.Method, AllowMultiple = true)]
    public class InternalControllerMethodAttribute : Attribute
    {
        public string Method { get; set; }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="method">Значение поля "method" из запроса SmartApp</param>
        public InternalControllerMethodAttribute(string method)
        {
            Method = method;
        }

        private InternalControllerMethodAttribute() { }
    }
}
