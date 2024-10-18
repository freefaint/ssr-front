import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationTelegramModel} from './models/configuration-telegram-model';

/**
 * Представляет конфигурацию для элемента "Бункер", показывающего состояние заполненности по телеграмме.
 */
export class OverloadBunkerConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 1;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param stateTelegram Телеграмма для состояний бункера.
     * @param emptyParameterId Идентификатор параметра для состояния "Пуст".
     * @param emptyParameterValue Значение параметра для состояния "Пуст".
     * @param fullParameterId Идентификатор параметра для состояния "Заполнен".
     * @param fullParameterValue Значение параметра для состояния "Заполнен".
     * @param overloadParameterId Идентификатор параметра для состояния "Переполнен".
     * @param overloadParameterValue Значение параметра для состояния "Переполнен".
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly stateTelegram?: ConfigurationTelegramModel,
        readonly emptyParameterId?: string,
        readonly emptyParameterValue?: string,
        readonly fullParameterId?: string,
        readonly fullParameterValue?: string,
        readonly overloadParameterId?: string,
        readonly overloadParameterValue?: string,
    ) {
        super(OverloadBunkerConfiguration.lastVersion, elementId, ElementTypes.OverloadBunker, displayName);
    }
}
