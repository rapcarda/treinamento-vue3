import { reactive } from 'vue'

const globalInitialState = {
  isLoading: false
}

let state = reactive(globalInitialState)

export default state

export function resertGlobalStore () {
  state = reactive(globalInitialState)
}

export function setGlobalLoading (status) {
  state.isLoading = status
}
