<template>
  <modal-factory />
  <router-view/>
</template>

<script>
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// Por boa prática o componente do modal factory é registrado no App. Não tem problema ser chamado aqui, pois o componente será transportado para o boddy. Ver o font
import ModalFactory from './components/ModalFactory'
import services from './services'
import { setCurrentUser } from './store/user'

export default {
  components: {
    ModalFactory
  },
  setup () {
    const router = useRouter()
    const route = useRoute()

    // watch fica escutando algo, o primeiro parâmetro é que que ficar ouvindo, no caso, o path da rota, o segundo parâmetro, é o que será executado
    // quando o primeiro parâmetro for alterado
    watch(() => route.path, async () => {
      if (route.meta.hasAuth) {
        const token = window.localStorage.getItem('token')

        if (!token) {
          router.push({ name: 'Home' })
          return
        }

        const { data } = await services.users.getMe()
        setCurrentUser(data)
      }
    })
  }
}
</script>
