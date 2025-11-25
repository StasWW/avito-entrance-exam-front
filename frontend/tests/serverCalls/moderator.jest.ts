// tests/moderator.integration.test.ts
import { getModeratorsMe } from "../../src/serverCalls/moderator"

describe("getModeratorsMe (integration)", () => {
  const expectValidModerator = (result: unknown) => {
    expect(result).toBeDefined()
    expect(typeof result).toBe("object")
    expect(Array.isArray(result)).toBe(false)
    // базовые поля
    const mod = result as any
    expect(mod).toHaveProperty("id")
    expect(mod).toHaveProperty("name")
    expect(mod).toHaveProperty("email")
    expect(mod).toHaveProperty("role")
    expect(mod).toHaveProperty("statistics")
    expect(mod).toHaveProperty("permissions")
  }

  it("returns current moderator info", async () => {
    const result = await getModeratorsMe()
    expectValidModerator(result)
  })

  it("throws error if endpoint is unavailable", async () => {
    // если сервер не поднят или возвращает ошибку
    await expect(getModeratorsMe()).rejects.toBeDefined()
  })
})
