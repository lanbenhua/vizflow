import { uniqueId } from './utils';

class GlobalState {
  private state: Record<string, string> = {};

  start(shopeeVId: string) {
    const renderId = uniqueId();
    this.state[shopeeVId] = renderId;
    return renderId;
  }

  isIllegalId(shopeeVId: string, renderId: string) {
    return this.state[shopeeVId] !== renderId;
  }

  private clear(shopeeVId: string) {
    delete this.state[shopeeVId];
  }

  isBusy(shopeeVId: string) {
    return !!this.state[shopeeVId];
  }

  idCheck(shopeeVId: string, id: string, clear = false) {
    if (!this.isIllegalId(shopeeVId, id)) {
      if (clear) this.clear(shopeeVId);
      return;
    }
    throw new Error('The previous asynchronous layout was canceled');
  }
}

export const globalState = new GlobalState();
