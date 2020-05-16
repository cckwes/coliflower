import { Test, TestingModule } from "@nestjs/testing";

import { AssetController } from "./asset.controller";
import { AssetService } from "./asset.service";
import { AssetSummary } from "./interfaces/asset.interfaces";

import { sampleAssetSummariesData } from "../../test/lib/sample-data";

class AssetServiceMock {
  async getAllAssets(): Promise<AssetSummary[]> {
    return sampleAssetSummariesData;
  }
}

describe("Asset Controller", () => {
  let controller: AssetController;

  beforeEach(async () => {
    const AssetServiceProvider = {
      provide: AssetService,
      useClass: AssetServiceMock,
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssetController],
      providers: [AssetServiceProvider],
    }).compile();

    controller = module.get<AssetController>(AssetController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return all assets data", async () => {
    expect(await controller.getAllAssets()).toStrictEqual(
      sampleAssetSummariesData,
    );
  });
});
