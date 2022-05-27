import { IQueueSchedulerParams } from '../types/base-type';

class QueueScheduler<S> {
  private maxParallelNumber = 1;
  private exeNumber = 0;
  private waitQueue: IQueueSchedulerParams<S>[] = [];

  private pushQueue(handler: IQueueSchedulerParams<S>['handler']): Promise<S> {
    return new Promise((resolve, reject) => {
      this.waitQueue.push({ handler, resolve, reject });
    });
  }

  isBusy() {
    return this.exeNumber > 0;
  }

  private popQueue() {
    if (this.exeNumber >= this.maxParallelNumber) return;
    const queue = this.waitQueue.shift();
    if (!queue) return;
    const { handler, resolve, reject } = queue;
    this.run(handler).then(resolve, reject);
  }

  run = (handler: IQueueSchedulerParams<S>['handler']) => {
    if (this.exeNumber >= this.maxParallelNumber) return this.pushQueue(handler);
    this.exeNumber++;
    return handler().finally(() => {
      this.exeNumber--;
      this.popQueue();
    });
  };
}

export const queueScheduler = new QueueScheduler<void>();
