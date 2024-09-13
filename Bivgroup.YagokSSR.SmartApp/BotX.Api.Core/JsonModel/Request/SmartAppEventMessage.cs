using System;
using System.Collections.Generic;
using BotX.Api.JsonModel.Api.Response;
using BotX.Api.JsonModel.Response;
using Newtonsoft.Json;
using File = BotX.Api.JsonModel.Response.File;

namespace BotX.Api.JsonModel.Request;

public class SmartAppEventMessage
{
    [JsonProperty(PropertyName = "ref")]
    public Guid? Ref { get; set; }

    [JsonProperty(PropertyName = "smartapp_id")]
    public Guid SmartAppId { get; set; }

    [JsonProperty(PropertyName = "group_chat_id")]
    public Guid GroupChatId { get; set; }

    [JsonProperty(PropertyName = "data")]
    public Object Data { get; set; }

    [JsonProperty(PropertyName = "opts")]
    public Object Opts { get; set; }

    [JsonProperty(PropertyName = "smartapp_api_version")]
    public int SmartAppApiVersion { get; set; }

    [JsonProperty("files")]
    public IEnumerable<File> Files { get; set; }

    [JsonProperty("async_files")]
    public IEnumerable<FileMetadata> AsyncFiles { get; set; }
}

public class SmartAppInternalNotificationPayload
{
    //[JsonProperty(PropertyName = "ref")]
    //public Guid? Ref { get; set; }

    //[JsonProperty(PropertyName = "smartapp_id")]
    //public Guid SmartAppId { get; set; }

    [JsonProperty(PropertyName = "group_chat_id")]
    public Guid GroupChatId { get; set; }

    [JsonProperty(PropertyName = "data")]
    public SmartAppInternalNotificationData Data { get; set; }

    [JsonProperty(PropertyName = "opts")]
    public Object Opts { get; set; }

    [JsonProperty(PropertyName = "recipients")]
    public string[] Recipients { get; set; }

    //[JsonProperty(PropertyName = "smartapp_api_version")]
    //public int SmartAppApiVersion { get; set; }

    //[JsonProperty("files")]
    //public IEnumerable<File> Files { get; set; }

    //[JsonProperty("async_files")]
    //public IEnumerable<FileMetadata> AsyncFiles { get; set; }
}

public class SmartAppInternalNotificationData
{
    [JsonProperty(PropertyName = "ref")]
    public Guid? Ref { get; set; } = Guid.Empty;

    [JsonProperty(PropertyName = "status")]
    public string Status { get; set; } = "ok";

    //[JsonProperty(PropertyName = "group_chat_id")]
    //public Guid GroupChatId { get; set; }

    //[JsonProperty(PropertyName = "data")]
    //public Object Data { get; set; }

    //[JsonProperty(PropertyName = "opts")]
    //public Object Opts { get; set; }

    [JsonProperty(PropertyName = "result")]
    public object Result { get; set; }

    [JsonProperty(PropertyName = "type")]
    public string Type { get; set; } = "bot_rpc";

    //[JsonProperty(PropertyName = "smartapp_api_version")]
    //public int SmartAppApiVersion { get; set; }

    //[JsonProperty("files")]
    //public IEnumerable<File> Files { get; set; }

    //[JsonProperty("async_files")]
    //public IEnumerable<FileMetadata> AsyncFiles { get; set; }
}