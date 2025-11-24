import {approveAd, rejectAd, requestChangesAd} from "../../src/pages/actions/changeAdStatus";

describe('Testing of ad functions', () => {
  it('test approve', async () => {
    const res = await approveAd('2');

    expect(res).toBe(true)
  })
  it('test reject', async () => {
    const res = await rejectAd('2');

    expect(res).toBe(true)
  })
  it('test request-changes', async () => {
    const res = await requestChangesAd('2');

    expect(res).toBe(true)
  })
  it('test approve edge cases', async () => {
    const res = await approveAd('20000438905783429857348957');

    expect(res).toBe(false)
  })
  it('test reject edge cases', async () => {
    const res = await rejectAd('248972364879264872347826378462378467238');

    expect(res).toBe(false)
  })
  it('test request-changes edge cases', async () => {
    const res = await requestChangesAd('23485934758963477856348756378465');

    expect(res).toBe(false)
  })
})