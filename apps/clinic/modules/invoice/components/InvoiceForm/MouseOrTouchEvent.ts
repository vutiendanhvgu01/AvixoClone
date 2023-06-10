import { MouseEvent, TouchEvent } from 'react';

/**
 * Type that combines MouseEvent and TouchEvent
 */
export type MouseOrTouchEvent<T> = MouseEvent<T> | TouchEvent<T>;

export default MouseOrTouchEvent;
