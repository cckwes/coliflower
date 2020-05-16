import { Module } from "@nestjs/common";
import { AssetModule } from "./asset/asset.module";
import { CacheModule } from "./cache/cache.module";

@Module({
  imports: [AssetModule, CacheModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
