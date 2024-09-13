using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace BotX.Api.JsonModel.Response
{
#pragma warning disable CS1591
    public class Data
    {
        [JsonProperty("eventtype")]
        public string EventType { get; set; }

        [JsonProperty("payload")]
        public string Payload { get; set; }

        [JsonProperty("data")]
        public SmartAppData SmartAppData { get; set; }

        [JsonProperty("opts")]
        public object Opts { get; set; }

        [JsonProperty("ref")]
        public Guid? Ref { get; set; }

        [JsonProperty("smartapp_api_version")]
        public int? SmartAppApiVersion { get; set; }

        [JsonProperty("smartapp_id")]
        public Guid? SmartAppId { get; set; }
    }

    public class SmartAppData
    {
        [JsonProperty("method")]
        public string Method { get; set; }

        [JsonProperty("params")]
        public SmartAppParams SmartAppParams { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("ref")]
        public Guid? Ref { get; set; }
    }

    public class SmartAppParams
    {
        [JsonProperty("body")]
        public string Body { get; set; }

        [JsonProperty("token")]
        public string Token { get; set; }
    }
}
