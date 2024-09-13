using BotX.Api.BotUI;
using BotX.Api.JsonModel.Request;
using BotX.Api.JsonModel.Response;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using BotX.Api.JsonModel;
using BotX.Api.JsonModel.Api.Response;
using BotX.Api.Abstract;
using Newtonsoft.Json.Linq;
using File = BotX.Api.JsonModel.Response.File;

namespace BotX.Api
{
    internal partial class BotMessageSender : IBotMessageSender
    {
        public async Task SendSmartAppResponseAsync(
            Guid smartAppId,
            Guid chatId,
            Guid? syncId,
            object data,
            object opts = null,
            int smartAppApiVersion = 1,
            IEnumerable<File> files = null,
            IEnumerable<FileMetadata> asyncFiles = null,
            bool hasError = false)
        {
            var eventMessage = new SmartAppEventMessage()
            {
                Ref = syncId,
                SmartAppId = smartAppId,
                GroupChatId = chatId,
                Data = new SmartAppResponse(data, hasError),
                Opts = opts ?? new object(),
                SmartAppApiVersion = smartAppApiVersion,
                Files = files ?? new List<File>(),
                AsyncFiles = asyncFiles ?? new List<FileMetadata>(),
            };
            await httpClient.SendSmartAppEventAsync(smartAppId, eventMessage);
        }

        public async Task SendSmartAppResponseAsync(
            UserMessage message,
            object data,
            object opts = null,
            int smartAppApiVersion = 1,
            IEnumerable<File> files = null,
            IEnumerable<FileMetadata> asyncFiles = null,
            bool hasError = false)
        {
            await SendSmartAppResponseAsync(message.Command.Data.SmartAppId.Value,
                message.From.ChatId,
                message.Command.Data.Ref,
                data,
                opts,
                message.Command.Data.SmartAppApiVersion ?? 1,
                files,
                asyncFiles,
                hasError
            );
        }

        public async Task SendSmartAppResponseAsync(
            UserMessage message,
            Exception exception)
        {
            await SendSmartAppResponseAsync(message.Command.Data.SmartAppId.Value,
                message.From.ChatId,
                message.Command.Data.Ref,
                new { message = exception.Message, stackTrace = exception.StackTrace },
                hasError: true
            );
        }
    }
}
