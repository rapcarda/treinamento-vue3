import useStore from './store'
import { setCurrentComponent, setFeedbackType } from '../store'

export interface Navegation {
  next(): void;
  back(): void;
  setSuccessState(): void;
  setErrorState(): void;
}

export default function useNavegation (): Navegation {
  const store = useStore()

  function setErrorState (): void {
    setCurrentComponent('Error')
  }

  function setSuccessState (): void {
    setCurrentComponent('Success')
  }
  function next (): void {
    if (store.currentComponent === 'SelectFeedbackType') {
      setCurrentComponent('WriteAFeedback')
    }
  }

  function back (): void {
    if (store.currentComponent === 'WriteAFeedback') {
      setCurrentComponent('SelectFeedbackType')
      setFeedbackType('')
    }
  }

  return {
    next,
    back,
    setSuccessState,
    setErrorState
  }
}
