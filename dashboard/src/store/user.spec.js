import useStore from '../hooks/useStore'
import {
  resetUserStore,
  setCurrentUser,
  cleanCurrentUser,
  setApiKey
} from './user'

describe('UserStore', () => {
  afterEach(() => {
    resetUserStore()
  })

  it('should set current user', () => {
    // Arrange
    const store = useStore()
    const name = 'Rafael'

    // Action
    setCurrentUser({ name: name })

    // Asset
    expect(store.User.currentUser.name).toBe(name)
  })

  it('should set api_key on current user', () => {
    // Arrange
    const store = useStore()
    const apiKey = '123'

    // Action
    setApiKey(apiKey)

    // Asset
    expect(store.User.currentUser.apiKey).toBe(apiKey)
  })

  it('should clean current user', () => {
    // Arrange
    const store = useStore()
    const name = 'Rafael'

    setCurrentUser({ name: name })
    expect(store.User.currentUser.name).toBe(name)

    cleanCurrentUser()
    // O Clean, transforma o currentUser em um objeto, por isso ao tentar
    // acessar currentUser.name, vai retornar false se não tiver nada lá
    expect(store.User.currentUser.name).toBeFalsy()
  })
})
