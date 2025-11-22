// tests/serverCalls/ads.integration.test.ts
import { getAds } from "../../src/serverCalls/ads"

describe("getAds (integration)", () => {
  // Increase timeout since real server calls can take longer
  jest.setTimeout(10000)

  it("fetches ads with basic params", async () => {
    const result = await getAds({
      params: {
        page: 1,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "asc",
      },
    })

    expect(typeof result === 'object' && !Array.isArray(result)).toBe(true)
  })

  it("fetches ads with categoryId", async () => {
    const result = await getAds({
      params: {
        page: 1,
        limit: 5,
        sortBy: "price",
        sortOrder: "desc",
        categoryId: 2,
      },
    })

    expect(typeof result === 'object' && !Array.isArray(result)).toBe(true)
  })

  it("fetches ads with search string", async () => {
    const result = await getAds({
      params: {
        page: 1,
        limit: 5,
        sortBy: "priority",
        sortOrder: "asc",
        search: "laptop",
      },
    })

    expect(typeof result === 'object' && !Array.isArray(result)).toBe(true)
  })

  it("use all params", async () => {
    const result = await getAds({
      params: {
        page: 2,
        limit: 10,
        sortBy: "createdAt",
        sortOrder: "asc",
        status: ['pending'],
        categoryId: 0,
        minPrice: 0,
        maxPrice: 2000000,
        search: 'a',
      }
    })

    expect(typeof result === 'object' && !Array.isArray(result)).toBe(true)
  })
})
