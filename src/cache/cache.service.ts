import { Injectable, Logger } from "@nestjs/common";
import * as NodeCache from "node-cache";

@Injectable()
export class CacheService {
  private readonly logger = new Logger(CacheService.name);
  private cache = new NodeCache({
    checkperiod: 2,
  });

  setCache(key: string, value: any, ttl = 10) {
    this.logger.log(`setting cache for key: ${key}`);
    return this.cache.set(key, value, ttl);
  }

  getCache<T>(key: string): T {
    this.logger.log(`getting cache for key: ${key}`);
    return this.cache.get(key);
  }
}
