import { approveAd, rejectAd, requestChangesAd } from "../../src/pages/actions/changeAdStatus";

describe("Testing of ad functions", () => {
  it("approves ad successfully", async () => {
    const res = await approveAd("2");
    expect(res).toBe(true);
  });

  it("rejects ad successfully", async () => {
    const res = await rejectAd("2", "Запрещенный товар", "Неверное описание");
    expect(res).toBe(true);
  });

  it("requests changes successfully", async () => {
    const res = await requestChangesAd("2", "Неверная категория", "Уточните категорию");
    expect(res).toBe(true);
  });

  it("throws error code on approve edge case", async () => {
    try {
      await approveAd("20000438905783429857348957");
      fail("Expected approveAd to throw");
    } catch (e) {
      expect(typeof e).toBe("string");
      expect(["404", "500"]).toContain(e);
    }
  });

  it("throws error code on reject edge case", async () => {
    try {
      await rejectAd("248972364879264872347826378462378467238", "hehehe");
      fail("Expected rejectAd to throw");
    } catch (e) {
      expect(typeof e).toBe("string");
      expect(["404", "500"]).toContain(e);
    }
  });

  it("throws error code on request-changes edge case", async () => {
    try {
      await requestChangesAd("23485934758963477856348756378465", "hehehe");
      fail("Expected requestChangesAd to throw");
    } catch (e) {
      expect(typeof e).toBe("string");
      expect(["404", "500"]).toContain(e);
    }
  });
});
