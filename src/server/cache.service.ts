import NodeCache, { Key } from 'node-cache';

class CacheService {
    private cache: NodeCache;

    /**
     * https://medium.com/@danielsternlicht/caching-like-a-boss-in-nodejs-9bccbbc71b9b s
     * @param ttlSeconds time to live seconds
     */
    constructor(ttlSeconds: number) {
        this.cache = new NodeCache({ stdTTL: ttlSeconds, checkperiod: ttlSeconds * 0.2, useClones: false });
    }

    get<T>(key: Key): T {
        return this.cache.get(key) as T;
    }

    set(key: Key, value: any) {
        this.cache.set(key, value);
    }

    del(keys: Key | Key[]) {
        this.cache.del(keys);
    }

    delStartWith(startStr = '') {
        if (!startStr) {
        return;
        }

        const keys = this.cache.keys();
        for (const key of keys) {
        if (key.indexOf(startStr) === 0) {
            this.del(key);
        }
        }
    }

    flush() {
        this.cache.flushAll();
    }
}

 
export default CacheService;