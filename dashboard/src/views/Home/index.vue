<template>

    <custom-header
      @create-account="handleAccountCreate"
      @login="handleLogin"
    />

    <contact />

    <div class="felx justify-center py-10 bg-brand-gray">
        <p class="font-medium text-center text-gray-800">feedbacker c 2021</p>
    </div>

</template>

<script>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CustomHeader from './CustomHeader.vue'
import Contact from './Contact.vue'
import useModal from '../../hooks/useModal'

export default {
  components: { CustomHeader, Contact },
  setup () {
    const router = useRouter()
    const modal = useModal()

    onMounted(() => {
      const token = window.localStorage.getItem('token')
      if (token) {
        // No vue 2 para acessar as rotas utilizava o this.$router, mas no vue3 não tem mais o this. Por isso é importado o useRouter e criado uma const de useRouter
        router.push({ name: 'Feedbacks' })
      }
    })

    function handleLogin () {
      modal.open({
        component: 'ModalLogin'
      })
    }

    function handleAccountCreate () {
      modal.open({
        component: 'ModalCreateAccount'
      })
    }

    return {
      handleLogin,
      handleAccountCreate
    }
  }
}
</script>
