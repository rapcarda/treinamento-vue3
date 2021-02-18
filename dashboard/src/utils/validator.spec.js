import {
  validateEmptyAndLength3,
  validateEmptyAndEmail
} from './validators'

describe('Validators utils', () => {
  it('should give an error with empty payload', () => {
    expect(validateEmptyAndLength3()).toBe('Este campo é obrigatório')
  })

  it('should give an error with less than 3 chacacter payload', () => {
    expect(validateEmptyAndLength3('12')).toBe('Este campo precisa no mínimo 3 caracteres')
  })

  it('should returns true when input pass a correct param', () => {
    expect(validateEmptyAndLength3('123')).toBe(true)
  })

  it('should give an error with empty payload', () => {
    expect(validateEmptyAndEmail()).toBe('Este campo é obrigatório')
  })

  it('shoul give an error whit invalid email', () => {
    expect(validateEmptyAndEmail('aaa@aaa')).toBe('Este campo precisa ser um e-mail')
  })

  it('should returns true when input pass a correct email', () => {
    expect(validateEmptyAndEmail('aaa@aaa.com')).toBe(true)
  })
})
