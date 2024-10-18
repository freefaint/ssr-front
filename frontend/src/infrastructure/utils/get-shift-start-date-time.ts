import {DateTime} from 'luxon';

/**
 * Возвращает дату и время начала текущей смены.
 */
export function getShiftStartDateTime(): DateTime {
    const currentTime = DateTime.now();
    // Если текущее время с 8 до 20 часов, то начало смены - 8:00 текущего дня.
    if (currentTime.hour >= 8 && currentTime.hour < 20) {
        return currentTime.startOf('day').plus({hours: 8});
    }
    // Если текущий час меньше 8, то смена началась в 20:00 прошлого дня.
    if (currentTime.hour < 8) {
        return currentTime.minus({days: 1}).startOf('day').plus({hours: 20});
    }
    // Если текущий час больше либо равен 20, то смена началась в 20:00 текущего дня.
    return currentTime.startOf('day').plus({hours: 20});
}

/**
 * Возвращает дату и время конца текущей смены.
 */
export function getShiftEndDateTime(): DateTime {
    // Длительность смены.
    const shiftDuration = {hours: 12};

    return getShiftStartDateTime().plus(shiftDuration);
}

/**
 * Возвращает дату и время начала текущей суточной смены.
 */
export function getShiftDayStartDateTime(): DateTime {
    const currentTime = DateTime.now();
    const currentDayShitStartHour = currentTime.startOf('day').plus({hour: 20});
    // Если текущее время с 20:00 до 23:59:59, то начало суточной смены - 20:00 текущего дня.
    if (currentTime.hour >= 20 && currentTime.hour <= 23) {
        return currentDayShitStartHour;
    }
    // Если текущий час больше 0 и меньше 20, то суточная смена началась в 20:00 прошлого дня.
    return currentDayShitStartHour.minus({days: 1});
}
