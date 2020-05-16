import { AssetSummary } from "../../src/asset/interfaces/asset.interfaces";

export const sampleAssetSummariesData: AssetSummary[] = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    rank: 1,
    price: "8800.0003",
    percentageChange24Hrs: "-0.1514",
    volume24Hrs: "242342.312",
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    rank: 2,
    price: "193.65",
    percentageChange24Hrs: "-0.13",
    volume24Hrs: "62435320.4314",
  },
];

export const sampleAssetsResponse = {
  data: [
    {
      id: "bitcoin",
      symbol: "BTC",
      name: "Bitcoin",
      rank: "1",
      priceUsd: "8800.0003",
      changePercent24Hr: "-0.1514",
      volumeUsd24Hr: "242342.312",
    },
    {
      id: "ethereum",
      symbol: "ETH",
      name: "Ethereum",
      rank: "2",
      priceUsd: "193.65",
      changePercent24Hr: "-0.13",
      volumeUsd24Hr: "62435320.4314",
    },
  ],
};
