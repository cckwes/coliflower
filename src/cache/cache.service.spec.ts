import { Test, TestingModule } from "@nestjs/testing";
import { CacheService } from "./cache.service";

describe("CacheService", () => {
  let service: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CacheService],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be able to set and get cache", () => {
    expect(service.setCache("a", "b")).toBeTruthy();

    expect(service.getCache<string>("a")).toBe("b");
  });
});
