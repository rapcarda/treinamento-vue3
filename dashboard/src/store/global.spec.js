import useStore from '../hooks/useStore'
import { resertGlobalStore, setGlobalLoading } from './global'

describe('GlobalStore', () => {
  afterEach(() => {
    resertGlobalStore()
  })

  it('should set isLoading on Global store', () => {
    // Asset
    const store = useStore()
    const status = true

    // Action
    setGlobalLoading(status)

    // Assert
    expect(store.Global.isLoading).toBe(status)
  })
})
