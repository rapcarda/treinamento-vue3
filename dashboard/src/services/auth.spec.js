import mockAxios from 'axios'
import AuthService from './auth'

jest.mock('axios')

describe('AuthService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return a token when user login', async () => {
    const token = '12121212'
    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: { token } })
    })

    const response = await AuthService(mockAxios).login({ email: 'aa@aa.com', password: '1234' })
    expect(response.data).toHaveProperty('token')
    // O toMatchSnapshot faz com que o jest pegue o retorno do teste e salve
    // em um arquivo local. Sempre que o teste for refeito, ele irá comparar
    // os resultados com o arquivo local, se tiver alguma coisa diferente
    // o jest irá avisar. Para serviço não é tão proveitoso usar, já que
    // estamos mockando o axios, mas para componentes é muito usado
    expect(response).toMatchSnapshot()
  })

  it('should return an user where user register', async () => {
    const user = {
      name: 'Usuário Teste',
      email: 'teste@teste.com',
      password: '1234'
    }

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ data: user })
    })

    const response = await AuthService(mockAxios).register({ user })
    expect(response.data).toHaveProperty('name')
    expect(response.data).toHaveProperty('email')
    expect(response.data).toHaveProperty('password')
  })

  it('should throw an error when not found', async () => {
    // Assert
    const errors = {
      status: '404',
      statusText: 'Not Found'
    }

    mockAxios.post.mockImplementationOnce(() => {
      return Promise.resolve({ request: errors })
    })

    // Action
    const response = await AuthService(mockAxios).login({ email: 'aa@aa.com', password: '1234' })

    // Assert
    expect(response.errors).toHaveProperty('status')
    expect(response.errors).toHaveProperty('statusText')
  })
})
