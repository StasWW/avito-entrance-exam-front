import { timeToText } from "../../src/pages/actions/adStringsFormatters";

describe("timeToText", () => {
  const fixedNow = new Date("2025-01-01T00:00:00Z").getTime();

  beforeAll(() => {
    jest.spyOn(Date, "now").mockImplementation(() => fixedNow);
  });

  afterAll(() => {
    (Date.now as jest.Mock).mockRestore();
  });

  it("returns 'Только что' for less than 60 seconds", () => {
    const time = new Date(fixedNow - 30 * 1000).toISOString();
    expect(timeToText(time)).toBe("Только что");
  });

  it("returns minutes with correct declension", () => {
    const time = new Date(fixedNow - 2 * 60 * 1000).toISOString();
    expect(timeToText(time)).toBe("2 минуты");

    const time2 = new Date(fixedNow - 5 * 60 * 1000).toISOString();
    expect(timeToText(time2)).toBe("5 минут");

    const time3 = new Date(fixedNow - 1 * 60 * 1000).toISOString();
    expect(timeToText(time3)).toBe("1 минута");
  });

  it("returns hours with correct declension", () => {
    const time = new Date(fixedNow - 1 * 3600 * 1000).toISOString();
    expect(timeToText(time)).toBe("1 час");

    const time2 = new Date(fixedNow - 3 * 3600 * 1000).toISOString();
    expect(timeToText(time2)).toBe("3 часа");

    const time3 = new Date(fixedNow - 5 * 3600 * 1000).toISOString();
    expect(timeToText(time3)).toBe("5 часов");
  });

  it("returns days with correct declension", () => {
    const time = new Date(fixedNow - 1 * 24 * 3600 * 1000).toISOString();
    expect(timeToText(time)).toBe("1 день");

    const time2 = new Date(fixedNow - 2 * 24 * 3600 * 1000).toISOString();
    expect(timeToText(time2)).toBe("2 дня");

    const time3 = new Date(fixedNow - 5 * 24 * 3600 * 1000).toISOString();
    expect(timeToText(time3)).toBe("5 дней");
  });

  it("returns months with correct declension", () => {
    const time = new Date(fixedNow - 1 * 30 * 24 * 3600 * 1000).toISOString();
    expect(timeToText(time)).toBe("1 месяц");

    const time2 = new Date(fixedNow - 2 * 30 * 24 * 3600 * 1000).toISOString();
    expect(timeToText(time2)).toBe("2 месяца");

    const time3 = new Date(fixedNow - 5 * 30 * 24 * 3600 * 1000).toISOString();
    expect(timeToText(time3)).toBe("5 месяцев");
  });

  it("returns years with correct declension", () => {
    const time = new Date(fixedNow - 1 * 365 * 24 * 3600 * 1000).toISOString();
    expect(timeToText(time)).toBe("1 год");

    const time2 = new Date(fixedNow - 2 * 365 * 24 * 3600 * 1000).toISOString();
    expect(timeToText(time2)).toBe("2 года");

    const time3 = new Date(fixedNow - 5 * 365 * 24 * 3600 * 1000).toISOString();
    expect(timeToText(time3)).toBe("5 лет");
  });
});
