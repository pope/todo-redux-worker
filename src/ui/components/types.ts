/** An EventHandler that can be set declaratively in lit-html. */
export type EventHandlerWithOptions = EventListenerOrEventListenerObject &
    Partial<AddEventListenerOptions>;
