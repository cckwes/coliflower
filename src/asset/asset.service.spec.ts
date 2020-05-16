import { Test, TestingModule } from "@nestjs/testing";
import * as nock from "nock";

import { AssetService } from "./asset.service";
import { CacheService } from "../cache/cache.service";

import {
  sampleAssetsResponse,
  sampleAssetSummariesData,
} from "../../test/lib/sample-data";

class CacheServiceMock {
  setCache() {
    return;
  }

  getCache() {
    return;
  }
}

describe("AssetService", () => {
  let service: AssetService;
  let cacheService: CacheService;

  beforeEach(async () => {
    const CacheServiceProvider = {
      provide: CacheService,
      useClass: CacheServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheServiceProvider, AssetService],
    }).compile();

    service = module.get<AssetService>(AssetService);
    cacheService = module.get<CacheService>(CacheService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("#getAllAssets", () => {
    it("should return cache value", async () => {
      jest
        .spyOn(cacheService, "getCache")
        .mockImplementation(() => sampleAssetSummariesData);
      const getAllAssetsFromRemoteSpy = jest
        .spyOn(service, "getAllAssetsFromRemote")
        .mockImplementation(() => Promise.resolve(sampleAssetSummariesData));

      expect(await service.getAllAssets()).toStrictEqual(
        sampleAssetSummariesData,
      );
      expect(getAllAssetsFromRemoteSpy).not.toHaveBeenCalled();
    });

    it("should call remote API if there's no cache and set the cache", async () => {
      jest.spyOn(cacheService, "getCache").mockImplementation(() => undefined);
      const setCacheSpy = jest
        .spyOn(cacheService, "setCache")
        .mockImplementation(() => true);
      const getAllAssetsFromRemoteSpy = jest
        .spyOn(service, "getAllAssetsFromRemote")
        .mockImplementation(() => Promise.resolve(sampleAssetSummariesData));

      expect(await service.getAllAssets()).toStrictEqual(
        sampleAssetSummariesData,
      );
      expect(getAllAssetsFromRemoteSpy).toHaveBeenCalled();
      expect(setCacheSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("#getAllAssetsFromRemote", () => {
    it("should call the remote API and return the correct response", async () => {
      nock("https://api.coincap.io/v2")
        .get("/assets")
        .reply(200, sampleAssetsResponse);

      expect(await service.getAllAssetsFromRemote()).toStrictEqual(
        sampleAssetSummariesData,
      );
    });
  });
});
