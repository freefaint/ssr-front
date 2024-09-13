using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace BotX.Api.JsonModel
{
    public interface ISmartAppResponse
    {
        public string Type { get; set; }
    }

    public class SmartAppResponse : ISmartAppResponse
    {
        [JsonIgnore]
        public bool HasError { get; set; } = false;

        [JsonProperty("status")]
        public string Status => HasError ? "error" : "success";

        [JsonProperty("type")] public string Type { get; set; } = "response";

        [JsonProperty("data")]
        public object Data { get; set; }

        public SmartAppResponse(object data, bool hasError = false)
        {
            Data = data;
            HasError = hasError;
        }
    }
}
