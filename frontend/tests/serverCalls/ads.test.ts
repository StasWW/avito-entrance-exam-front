// mock matchMedia до импорта
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// mock fetch глобально
global.fetch = jest.fn(async (url, options) => {
  // можно вернуть разные ответы в зависимости от url
  if (url.toString().includes("/approve")) {
    return {
      ok: true,
      json: async () => ({ message: "approved", ad: { id: 123 } }),
    }
  }
  if (url.toString().includes("/reject")) {
    return {
      ok: true,
      json: async () => ({ message: "rejected", ad: { id: 123 } }),
    }
  }
  if (url.toString().includes("/request-changes")) {
    return {
      ok: true,
      json: async () => ({ message: "changes requested", ad: { id: 123 } }),
    }
  }
  if (url.toString().includes("/ads?")) {
    return {
      ok: true,
      json: async () => ({ ads: [], pagination: { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10 } }),
    }
  }
  return { ok: false, status: 404 }
}) as any

import { getAds, getAdById, approveById, rejectById, requestChangesById } from "../../src/serverCalls/ads"

describe("ads calls with mocked fetch", () => {
  it("getAds returns mocked ads response", async () => {
    const result = await getAds({ page: 1, limit: 10, sortBy: "createdAt", sortOrder: "asc" })
    expect(result).toHaveProperty("ads")
    expect(result).toHaveProperty("pagination")
  })

  it("approveById returns mocked approve response", async () => {
    const result = await approveById("123")
    expect(result.message).toBe("approved")
  })

  it("rejectById returns mocked reject response", async () => {
    const result = await rejectById("123", "Запрещенный товар")
    expect(result.message).toBe("rejected")
  })

  it("requestChangesById returns mocked changes response", async () => {
    const result = await requestChangesById("123", "Неверная категория")
    expect(result.message).toBe("changes requested")
  })
})
