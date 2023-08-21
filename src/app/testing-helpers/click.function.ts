import { DebugElement } from '@angular/core';

/**
 * Button events to pass to `DebugElement.triggerEventHandler`
 * for RouterLink event handler
 * */
export const ButtonClickEvents = {
  left: { button: 0 },
  right: { button: 2 },
};

/** Simulate element click. Defaults to mouse left-button click event. */
    // DebugElement.triggerEventHandler может сгенерить любое связанное
    // с данными событие по имени события.
    // Второй параметр - это объект события, переданный обработчику.

    // userEl.triggerEventHandler('click', null);
    // or
    // userEl.nativeElement.click();
export function click(
  el: DebugElement | HTMLElement,
  eventObj: any = ButtonClickEvents.left
): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}
