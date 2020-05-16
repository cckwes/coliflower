import { Controller, Get } from "@nestjs/common";
import { AssetService } from "./asset.service";
import { AssetSummary } from "./interfaces/asset.interfaces";

@Controller("assets")
export class AssetController {
  constructor(private readonly assetService: AssetService) {}

  @Get()
  async getAllAssets(): Promise<AssetSummary[]> {
    return this.assetService.getAllAssets();
  }
}
