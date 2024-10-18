import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {CageDoorConfigurationBlock} from './models/cage-door-configuration-block';
import {CageModeConfigurationBlock} from './models/cage-mode-configuration-block';
import {ConfigurationTelegramModel} from './models/configuration-telegram-model';
import {MovementConfigurationBlock} from './models/movement-configuration-block';
import {ProductivityConfigurationBlock} from './models/productivity-configuration-block';
import {SkipModeConfigurationBlock} from './models/skip-mode-configuration-block';

/**
 * Представляет конфигурацию для блока "ВЭСП".
 */
export class VespConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 5;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param skipTelegram Телеграмма для скипов.
     * @param cageTelegram Телеграмма для клети.
     * @param productivitySettings Настройки производительности.
     * @param skipMovementSettings Настройки перемещения для скипов.
     * @param cageMovementSettings Настройки перемещения для клети.
     * @param skipModeSettings Настройки для режимов скипов.
     * @param cageModeSettings Настройки для режимов клети.
     * @param cageDoorSettings Настройки для статуса дверей клети.
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly skipTelegram?: ConfigurationTelegramModel,
        readonly cageTelegram?: ConfigurationTelegramModel,
        readonly productivitySettings?: ProductivityConfigurationBlock,
        readonly skipMovementSettings?: MovementConfigurationBlock,
        readonly cageMovementSettings?: MovementConfigurationBlock,
        readonly skipModeSettings?: SkipModeConfigurationBlock,
        readonly cageModeSettings?: CageModeConfigurationBlock,
        readonly cageDoorSettings?: CageDoorConfigurationBlock,
    ) {
        super(VespConfiguration.lastVersion, elementId, ElementTypes.Vesp, displayName);
    }
}
