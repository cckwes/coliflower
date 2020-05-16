import { Module } from "@nestjs/common";
import { AssetController } from "./asset.controller";
import { AssetService } from "./asset.service";
import { CacheModule } from "../cache/cache.module";

@Module({
  imports: [CacheModule],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}
