using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using BotX.Api.BotUI;
using BotX.Api.JsonModel.Api.Request;
using BotX.Api.JsonModel.Api.Response;
using BotX.Api.JsonModel.Request;
using BotX.Api.JsonModel.Response;
using File = BotX.Api.JsonModel.Response.File;

namespace BotX.Api.Abstract
{
    /// <summary>
    /// Клиент, реализующий отправку сообщений, используя BotX Api
    /// </summary>
    public interface IBotMessageSender
    {
        /// <summary>
        /// Отправляет текстовое сообщение в ответ пользователю
        /// </summary>
        /// <param name="requestMessage">Сообщение от пользователя</param>
        /// <param name="messageText">Текст ответа</param>
        /// <returns>Идентификатор сообщения(необходим для его редактирования)</returns>
        Task<Guid> ReplyTextMessageAsync(UserMessage requestMessage, string messageText);

        /// <summary>
        /// Отправляет текстовое сообщение в ответ пользователю
        /// </summary>
        /// <param name="requestMessage">Сообщение от пользователя</param>
        /// <param name="messageText">Текст ответа</param>
        /// <param name="mentionHuid">Идентификатор пользователя, которого нужно упомянуть</param>
        /// <returns>Идентификатор сообщения(необходим для его редактирования)</returns>
        Task<Guid> ReplyTextMessageAsync(UserMessage requestMessage, string messageText, Guid mentionHuid);

        /// <summary>
        /// Отправка текстового сообщения с кнопками (действиями) в ответ пользователю
        /// </summary>
        /// <param name="requestMessage">Сообщение пользователя</param>
        /// <param name="messageText">Текст сообщения</param>
        /// <param name="buttons">Кнопки с действиями в сообщении</param>
        /// <returns>Идентификатор сообщения(необходим для его редактирования)</returns>
        Task<Guid> ReplyTextMessageAsync(UserMessage requestMessage, string messageText, MessageButtonsGrid buttons);

        /// <summary>
        /// Отправляет файл в ответ на пользовательское сообщение
        /// </summary>
        /// <param name="requestMessage">Сообщение от пользователя</param>
        /// <param name="fileName">Имя файла</param>
        /// <param name="data">Данные файла</param>
        /// <returns></returns>	
        Task SendFileAsync(UserMessage requestMessage, string fileName, byte[] data);

        /// <summary>
        /// Отправляет текстовое сообщение (нотификацию) пользователю
        /// </summary>
        /// <param name="botId"></param>
        /// <param name="chatId">Идентификатор чата, куда будет отправлено сообщение</param>
        /// <param name="huid">Идентификатор получателя (пользователя) сообщения</param>
        /// <param name="messageText">Текст сообщения</param>
        /// <returns></returns>
        Task SendTextMessageAsync(Guid botId, Guid chatId, Guid huid, string messageText);

        /// <summary>
        /// Отправляет текстовое сообщение (нотификацию) с кнопками пользователю
        /// </summary>
        /// <param name="botId"></param>
        /// <param name="chatId">Идентификатор чата, куда будет отправлено сообщение</param>
        /// <param name="huid">Идентификатор получателя (пользователя) сообщения</param>
        /// <param name="messageText">Текст сообщения</param>
        /// <param name="buttons">Кнопки с действиями в сообщении</param>
        /// <returns></returns>
        Task SendTextMessageAsync(Guid botId, Guid chatId, Guid huid, string messageText, MessageButtonsGrid buttons);

        /// <summary>
        /// Отправляет текстовое сообщение (нотификацию) пользователю
        /// </summary>
        /// <param name="botId"></param>
        /// <param name="chatId">Идентификатор чата, куда будет отправлено сообщение</param>
        /// <param name="huid">Идентификатор получателя (пользователя) сообщения</param>
        /// <param name="messageSyncId">Идентификатор сообщения в Express (по которому его можно редактировать)</param>
        /// <param name="messageText">Текст сообщения</param>
        /// <returns></returns>
        Task SendTextMessageAsync(Guid botId, Guid chatId, Guid huid, Guid messageSyncId, string messageText);

        /// <summary>
        /// Отправляет текстовое сообщение (нотификацию) с кнопками пользователю
        /// </summary>
        /// <param name="botId"></param>
        /// <param name="chatId">Идентификатор чата, куда будет отправлено сообщение</param>
        /// <param name="huid">Идентификатор получателя (пользователя) сообщения</param>
        /// <param name="messageSyncId">Идентификатор сообщения в Express (по которому его можно редактировать)</param>
        /// <param name="messageText">Текст сообщения</param>
        /// <param name="buttons">Кнопки с действиями в сообщении</param>
        /// <returns></returns>
        Task SendTextMessageAsync(Guid botId, Guid chatId, Guid huid, Guid messageSyncId, string messageText, MessageButtonsGrid buttons);

        /// <summary>
        /// Отправляет текстовое сообщение (нотификацию) пользователю
        /// </summary>
        /// <param name="chatId"></param>
        /// <param name="recipients">Идентификаторы получателей (пользователей) сообщения</param>
        /// <param name="messageText">Текст сообщения</param>
        /// <param name="botId"></param>
        /// <returns></returns>	
        Task SendTextMessageAsync(Guid botId, Guid chatId, Guid[] recipients, string messageText);

        /// <summary>
        /// Отправляет текстовое сообщение (нотификацию) с кнопками пользователю
        /// </summary>
        /// <param name="botId"></param>
        /// <param name="chatId">Идентификаторы чатов, куда будет отправлено сообщение</param>
        /// <param name="recipients">Идентификаторы получателей (пользователей) сообщения</param>
        /// <param name="messageSyncId">Идентификатор сообщения в Express (по которому его можно редактировать)</param>
        /// <param name="messageText">Текст сообщения</param>
        /// <param name="buttons">Кнопки с действиями в сообщении</param>
        /// <returns></returns>
        Task SendTextMessageAsync(Guid botId, Guid chatId, Guid[] recipients, Guid? messageSyncId, string messageText, MessageButtonsGrid buttons);

        /// <summary>
        /// Редактирует сообщение ранее отправленное пользователю
        /// </summary>
        /// <param name="botId">Идентификатор бота</param>
        /// <param name="syncId">Идентификатор сообщения</param>
        /// <param name="messageText">Новый текст сообщения</param>
        /// <param name="mentionHuid">Идентификатор пользователя, которого нужно упомянуть</param>
        /// <returns></returns>
        Task EditMessageAsync(Guid botId, Guid syncId, string messageText, Guid mentionHuid);

        /// <summary>
        /// Редактирует сообщение ранее отправленное пользователю
        /// </summary>
        /// <param name="requestMessage">Входящее сообщение от пользователя</param>
        /// <param name="syncId">Идентификатор редактируемого сообщения</param>
        /// <param name="messageText">Новый текст сообщения</param>
        /// <returns></returns>
        Task EditMessageAsync(UserMessage requestMessage, Guid syncId, string messageText);

        /// <summary>
        /// Редактирует сообщение ранее отправленное пользователю
        /// </summary>
        /// <param name="requestMessage">Входящее сообщение от пользователя</param>
        /// <param name="syncId">Идентификатор редактируемого сообщения</param>
        /// <param name="messageText">Новый текст сообщения</param>
        /// <param name="buttons">Новые кнопки в сообщении</param>
        /// <returns></returns>
        Task EditMessageAsync(UserMessage requestMessage, Guid syncId, string messageText, MessageButtonsGrid buttons);

        /// <summary>
        /// Отправляет файл в указанный чат
        /// </summary>
        /// <param name="botId"></param>
        /// <param name="chatId"></param>
        /// <param name="huid"></param>
        /// <param name="fileName"></param>
        /// <param name="data"></param>
        /// <returns></returns>
        Task SendFileAsync(Guid botId, Guid chatId, Guid huid, string fileName, byte[] data);

        /// <summary>
        /// Отправляет файл в указанный чат с указанным заголовком
        /// </summary>
        /// <param name="botId">Идентификатор бота</param>
        /// <param name="chatId">Идентификатор чата</param>
        /// <param name="huid">Идентификатор пользователя (получателя)</param>
        /// <param name="caption">Заголовок</param>
        /// <param name="fileName">Имя файла с расширением</param>
        /// <param name="data">Данные файла</param>
        /// <returns></returns>
        Task SendFileAsync(Guid botId, Guid chatId, Guid huid, string caption, string fileName, byte[] data);

        /// <summary>
        /// Загружает файл в указанный чат с указанной метаинфой
        /// </summary>
        /// <param name="requestMessage">Сообщение пользователя</param>
        /// <param name="fileName">Имя файла с расширением</param>
        /// <param name="data">Данные файла</param>
        /// <param name="meta">Метаданные файла</param>
        /// <returns>Информация о сохраненном файле</returns>
        Task<FileMetadataResult> UploadFileAsync(UserMessage requestMessage, string fileName, byte[] data, FileMetaInfo meta = null);

        /// <summary>
        /// Отправка события в SmartApp
        /// </summary>
        /// <param name="smartAppId">идентификатор SmartApp</param>
        /// <param name="chatId">идентификатор чата</param>
        /// <param name="syncId">ref id</param>
        /// <param name="data">пользовательские данные</param>
        /// <param name="opts">опции запроса</param>
        /// <param name="smartAppApiVersion">версия протокола smartApp-bot</param>
        /// <param name="files">массив файлов</param>
        /// <param name="asyncFiles">метаданные файлов для асинхронной обработки</param>
        /// <param name="hasError">наличие ошибки в результате</param>
        /// <returns></returns>
        Task SendSmartAppResponseAsync(Guid smartAppId,
            Guid chatId,
            Guid? syncId,
            object data,
            object opts = null,
            int smartAppApiVersion = 1,
            IEnumerable<File> files = null,
            IEnumerable<FileMetadata> asyncFiles = null,
            bool hasError = false);

        /// <summary>
        /// Отправка события в SmartApp
        /// </summary>
        /// <param name="message">запрос от SmartApp</param>
        /// <param name="data">пользовательские данные</param>
        /// <param name="opts">опции запроса</param>
        /// <param name="smartAppApiVersion">версия протокола smartApp-bot</param>
        /// <param name="files">массив файлов</param>
        /// <param name="asyncFiles">метаданные файлов для асинхронной обработки</param>
        /// <param name="hasError">наличие ошибки в результате</param>
        /// <returns></returns>
        Task SendSmartAppResponseAsync(
            UserMessage message,
            object data,
            object opts = null,
            int smartAppApiVersion = 1,
            IEnumerable<File> files = null,
            IEnumerable<FileMetadata> asyncFiles = null,
            bool hasError = false);

        /// <summary>
        /// Отправка события в SmartApp
        /// </summary>
        /// <param name="message">запрос от SmartApp</param>
        /// <param name="exception">полученное исключение</param>
        /// <returns></returns>
        Task SendSmartAppResponseAsync(
            UserMessage message,
            Exception exception);

        /// <summary>
        /// Отправка резултата межсервисного взаимодействия 
        /// </summary>
        /// <param name="smartAppId">Ключ сервиса получателя</param>
        /// <param name="Recipients"> значение из конфиг файла</param>
        /// <param name="chatId">group_chat_id из  message</param>
        /// <param name="data"> передаваемые данные</param>
        /// <param name="refId"></param>
        /// <param name="status">статус ответа</param>
        /// <param name="opts">опции запроса</param>
        /// <returns></returns>
        Task SendSmartAppInternalResponseAsync(
            Guid smartAppId,
            string[] Recipients,
            Guid chatId,
            object data,
            Guid? refId = null,
            string status = "ok",
            object opts = null
            );


        Task SendSmartAppInternalResponseAsync(
           UserMessage message,
           object data,
           string status = "ok",
           object opts = null
           );
    }
}
