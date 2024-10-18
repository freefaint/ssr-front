import {TelegramParameterModel} from '../../../../components/configuration-panel/telegrams/select-telegram-dialog/models/telegram-parameter-model';

/**
 * Представляет модель телеграммы для конфигурации.
 */
export class ConfigurationTelegramModel {
    /**
     * @param telegramId Идентификатор телеграммы.
     * @param telegramName Имя телеграммы.
     * @param parameters Набор параметров телеграммы.
     */
    constructor(readonly telegramId: string, readonly telegramName: string, readonly parameters: readonly TelegramParameterModel[]) {}
}
