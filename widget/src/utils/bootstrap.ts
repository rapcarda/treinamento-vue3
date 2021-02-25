// Para definir tipos no typescript, usa o type, mas quando precisa definir funções, utiliza interface
// type SetUpPayload = {
// }

interface SetUpPayload {
  onProduction: () => void;
  onDevelopment: () => void;
}

export function setup ({ onProduction, onDevelopment }: SetUpPayload): void {
  if (process.env.NOD_ENV !== 'production') {
    onDevelopment()
    return
  }

  onProduction()
}
