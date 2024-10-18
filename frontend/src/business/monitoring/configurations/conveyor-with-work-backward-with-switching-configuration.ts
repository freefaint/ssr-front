import {ElementConfigurationBase} from './element-configuration-base';
import {ElementTypes} from './elements/element-types/element-types';
import {ConfigurationValueSetTrendModel} from './models/configuration-value-set-trend-model';

/**
 * Представляет конфигурацию для элемента "Конвейер" с состояниями "Работа назад" и "Переключение".
 */
export class ConveyorWithWorkBackwardWithSwitchingConfiguration extends ElementConfigurationBase {
    /**
     * Возвращает последнюю (актуальную) версию модели.
     */
    static readonly lastVersion = 1;

    /**
     * @param elementId Идентификатор элемента.
     * @param displayName Отображаемое имя элемента.
     * @param workTrend Тренд показателя работы.
     * @param inWorkForward Значение "В работе вперед".
     * @param inWorkBackward Значение "В работе назад".
     * @param inDowntime Значение "В простое".
     * @param inNotDefined Значение "Не определен".
     * @param inSwitching Значение "Переключение".
     */
    constructor(
        elementId: string,
        displayName: string,
        readonly workTrend?: ConfigurationValueSetTrendModel,
        readonly inWorkForward?: number,
        readonly inWorkBackward?: number,
        readonly inDowntime?: number,
        readonly inNotDefined?: number,
        readonly inSwitching?: number,
    ) {
        super(
            ConveyorWithWorkBackwardWithSwitchingConfiguration.lastVersion,
            elementId,
            ElementTypes.ConveyorWithWorkBackwardWithSwitching,
            displayName,
        );
    }
}
