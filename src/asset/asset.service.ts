import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";

import { AssetSummary } from "./interfaces/asset.interfaces";
import { CacheService } from "../cache/cache.service";

@Injectable()
export class AssetService {
  private readonly logger = new Logger(AssetService.name);

  constructor(private readonly cacheService: CacheService) {}

  async getAllAssets(): Promise<AssetSummary[]> {
    this.logger.log("calling getAllAssets");

    const cacheKey = "assets-summary";

    const cacheData = this.cacheService.getCache<AssetSummary[]>(cacheKey);
    if (cacheData) {
      return cacheData;
    }

    this.logger.log("no cache found, loading it from remote site");
    const result = await this.getAllAssetsFromRemote();
    this.cacheService.setCache(cacheKey, result, 10);

    return result;
  }

  async getAllAssetsFromRemote(): Promise<AssetSummary[]> {
    const response = await axios.get("https://api.coincap.io/v2/assets");

    const { data } = response;
    return data.data.map(item => {
      return {
        id: item.id,
        symbol: item.symbol,
        name: item.name,
        rank: parseInt(item.rank),
        price: item.priceUsd,
        percentageChange24Hrs: item.changePercent24Hr,
        volume24Hrs: item.volumeUsd24Hr,
      };
    });
  }
}
