import { IMockMouseEvent } from '../types/base-type';

class MockEvent {
  private fromMockEvent(e: IMockMouseEvent) {
    return e.__stopPropagation__;
  }

  start(e: IMockMouseEvent) {
    if (this.fromMockEvent(e)) return true;
    e.stopPropagation();
    e.preventDefault();

    const stop = () => {
      e.__stopPropagation__ = true;
    };

    e.stopPropagation = stop;
    e.preventDefault = stop;
  }

  end(e: IMockMouseEvent) {
    if (e.__stopPropagation__ === true) return;
    const cloneEvent: IMockMouseEvent = new MouseEvent('click', e);
    cloneEvent.__stopPropagation__ = true;
    e.target.dispatchEvent(cloneEvent);
  }
}

export const mockEvent = new MockEvent();
