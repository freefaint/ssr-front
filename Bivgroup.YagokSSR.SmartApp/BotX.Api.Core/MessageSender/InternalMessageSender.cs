using BotX.Api.Abstract;
using BotX.Api.JsonModel.Request;
using System;
using System.Threading.Tasks;

namespace BotX.Api
{
    internal partial class BotMessageSender : IBotMessageSender
    {

        public async Task SendSmartAppInternalResponseAsync(
            Guid smartAppId,
            string[] recipients,
            Guid chatId,
            object data,
            Guid? refId = null,
            string status = "ok",
            object opts = null
            )
        {
            var eventMessage = new SmartAppInternalNotificationPayload()
            {
                GroupChatId = chatId,
                Data = new SmartAppInternalNotificationData()
                {
                    Result = data,
                    Ref = refId,
                    Status = status
                },
                Opts = opts ?? new object(),
                Recipients = recipients,
            };
            await httpClient.SendSmartAppInternalAsync(smartAppId, eventMessage);
        }

        public async Task SendSmartAppInternalResponseAsync(
            UserMessage message,
            object data,
            string status = "ok",
            object opts = null
            )
        {
            await SendSmartAppInternalResponseAsync(
                message.BotId,
                new[] { message.From.Huid.ToString() },
                message.From.ChatId,
                data,
                message.Command?.Data?.SmartAppData?.Ref,
                status,
                opts
            );
        }

    }
}
