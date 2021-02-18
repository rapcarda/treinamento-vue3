import {
  getDiffTimeBetweenCurrentDate
} from './date'

describe('Date utils', () => {
  it('should return null with a null param', () => {
    expect(getDiffTimeBetweenCurrentDate(null)).toBeNull()
  })

  it('should return true with a true param', () => {
    expect(getDiffTimeBetweenCurrentDate(true)).toBe(true)
  })

  it('should return false with a false param', () => {
    expect(getDiffTimeBetweenCurrentDate(false)).toBe(false)
  })

  it('should return undefined with a undefined param', () => {
    expect(getDiffTimeBetweenCurrentDate(undefined)).toBe('')
  })

  it('should return the same invalid date when a invalid date is inputed', () => {
    expect(getDiffTimeBetweenCurrentDate('aaa')).toBe('aaa')
  })
})
