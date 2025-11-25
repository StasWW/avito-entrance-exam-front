import { getAds, approveById, rejectById, requestChangesById } from "../../src/serverCalls/ads"

describe("getAds (integration)", () => {
  const expectValidResponse = (result: unknown) => {
    expect(result).toBeDefined()
    expect(typeof result).toBe("object")
    expect(Array.isArray(result)).toBe(false)
  }

  it("returns ads with basic params", async () => {
    const result = await getAds({
      page: 1,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "asc",
    })
    expectValidResponse(result)
  })

  it("returns ads filtered by categoryId", async () => {
    const result = await getAds({
      page: 1,
      limit: 5,
      sortBy: "price",
      sortOrder: "desc",
      categoryId: 2,
    })
    expectValidResponse(result)
  })

  it("returns ads filtered by search string", async () => {
    const result = await getAds({
      page: 1,
      limit: 5,
      sortBy: "priority",
      sortOrder: "asc",
      search: "laptop",
    })
    expectValidResponse(result)
  })

  it("returns ads with all params applied", async () => {
    const result = await getAds({
      page: 2,
      limit: 10,
      sortBy: "createdAt",
      sortOrder: "asc",
      status: ["pending"],
      categoryId: 0,
      minPrice: 0,
      maxPrice: 2000000,
      search: "a",
    })
    expectValidResponse(result)
  })
})

describe("ads actions (integration)", () => {
  const expectValidAd = (result: unknown) => {
    expect(result).toBeDefined()
    expect(typeof result).toBe("object")
    expect(Array.isArray(result)).toBe(false)
  }

  it("approves ad by id", async () => {
    const result = await approveById("123")
    expectValidAd(result)
  })

  it("rejects ad by id with reason", async () => {
    const result = await rejectById("123", "Запрещенный товар", "Неверное описание")
    expectValidAd(result)
  })

  it("requests changes for ad by id", async () => {
    const result = await requestChangesById("123", "Неверная категория", "Уточните категорию")
    expectValidAd(result)
  })
})
