<template>
  <!-- Utiliza o conceito do port, onde se criava a modal em um botão por exemplo, mas quando iria ser
       reinderizada, abria em outro lugar, chamado de teletransportada. No Vue3 isso foi incorporado, podendo chamar então
       o comando teleport. Desta forma o modal não se baseia mais no último elemento relativo, e sim, onde for informado no "to" -->
  <teleport to="body">
    <!-- Classe que faz o overlay, o fundo meio escuro atrás do modal -->
    <div
        v-if="state.isActive"
        class="fixed top-0 lef-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
        @click="handleModalToogle({ status: false })"
    >
        <div
          class="fixed mx-10"
          :class="state.width"
          @click.stop>
            <div class="flex flex-col overflow-hidden bg-white rounded=lg animate__animated animate__fadeInDown animate__faster">
                <div class="flex flex-col px-12 py-10 bg-white">
                    <component :is="state.component" />
                </div>
            </div>
        </div>
    </div>
  </teleport>
</template>

<script>
import { defineAsyncComponent, onBeforeUnmount, onMounted, reactive } from 'vue'
import useModal from '../../hooks/useModal'

// Registrar os modals
const ModalLogin = defineAsyncComponent(() => import('../ModalLogin'))
const ModalCreateAccount = defineAsyncComponent(() => import('../ModalCreateAccount'))

const DEFAULT_WIDTH = 'w-3/4 lg:w-1/3'

export default {
  components: {
    ModalLogin,
    ModalCreateAccount
  },
  setup () {
    const modal = useModal()
    const state = reactive({
      isActive: false,
      component: {},
      props: {},
      width: DEFAULT_WIDTH
    })

    // Quando o componente for criado, será chamado o evento listen do modal, passando a função interna do Home, que irá passar os parâmetros para o modal
    onMounted(() => {
      modal.listen(handleModalToogle)
    })

    // Tem que chamar o off do modal também
    onBeforeUnmount(() => {
      modal.off(handleModalToogle)
    })

    function handleModalToogle (payload) {
      if (payload.status) {
        state.component = payload.component
        state.props = payload.props
        state.width = payload.width ?? DEFAULT_WIDTH // esta largura não é em pixel, e sim em classe do tailwind
      } else {
        state.component = {}
        state.props = {}
        state.width = DEFAULT_WIDTH
      }

      state.isActive = payload.status
    }

    return {
      state,
      handleModalToogle
    }
  }
}
</script>
