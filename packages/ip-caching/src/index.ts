import NodeCache from 'node-cache';

const cache = new NodeCache();

export class CachingHandler {
  private cache;
  private lastCachingTime: number;
  private readonly millisecondsToLive: number;

  constructor(minutesToLive = 5) {
    this.cache = new NodeCache();
    this.lastCachingTime = 0;
    this.millisecondsToLive = minutesToLive * 60 * 1000;
  }

  isCacheExpired() {
    return this.lastCachingTime + this.millisecondsToLive < new Date().getTime();
  }

  getData(key: string) {
    if (this.isCacheExpired()) {
      this.deleteData(key);
      return undefined;
    }
    return cache.get(key);
  }

  setData(key: string, data: unknown) {
    this.lastCachingTime = new Date().getTime();
    return cache.set(key, data);
  }

  deleteData(key: string) {
    return cache.del(key);
  }

  resetCache() {
    this.lastCachingTime = 0;
  }
}
