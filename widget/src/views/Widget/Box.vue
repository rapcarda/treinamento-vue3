<template>
  <div
    class="box animate__animated animate__fadeInUp animate__faste"
  >
    <div
        :class="{
            'justify-between': canShowAdditionalControlAndInfo,
            'justify-end': !canShowAdditionalControlAndInfo
        }"
        class="relative w-full flex">
        <button
            v-if="canShowAdditionalControlAndInfo"
            @click="back"
            :disabled="canGoBack"
            :class="{
                'invisible': canGoBack
            }"
            class="text-xl text-gray-800 focus:outline-none">
            <icon name="arrow-right" :color="colors.gray['800']" />
        </button>
        <p
            v-if="canShowAdditionalControlAndInfo"
            class="text-xl font-black text-center text-brand-main"
        >
            {{ label }}
        </p>

        <button
            @click="() => emit('close-box')"
            class="text-xl text-gray-800 focus:outline-none"
        >
            <icon name="close" size="14" :color="colors.gray['800']" />
        </button>
    </div>

    <wizard />

    <div class="text-gray-800 text-sm flex" v-if="canShowAdditionalControlAndInfo">
        <icon name="chat" class="mr-1" :color="brandColors.graydark" />
        widget by
        <span class="ml-1 font-bold">feedbacker</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, ComputedRef, SetupContext } from 'vue'
import { brand } from '../../../palette'
import colors from 'tailwindcss/colors'
import useStore from '../../hooks/store'
import useNavegation, { Navegation } from '../../hooks/navegation'
import Icon from '../../components/Icon/index.vue'
import Wizard from '../../components/Wizard/index.vue'

interface SetuReturn {
  emit: SetupContext['emit'];
  canGoBack: ComputedRef<boolean>;
  canShowAdditionalControlAndInfo: ComputedRef<boolean>;
  label: ComputedRef<string>;
  brandColors: Record<string, string>;
  colors: Record<string, string>;
  back: Navegation['back'];
}

export default defineComponent({
  components: { Icon, Wizard },
  emits: ['close-box'],
  setup (_, { emit }: SetupContext): SetuReturn {
    const store = useStore()
    const { back } = useNavegation()

    const label = computed<string>(() => {
      if (store.feedbackType === 'ISSUE') {
        return 'Reporte um problema'
      }

      if (store.feedbackType === 'IDEA') {
        return 'Nos fale sua ideia'
      }

      if (store.feedbackType === 'OTHER') {
        return 'Abra sua mente'
      }

      return 'O que você tem em mete?'
    })

    const canGoBack = computed<boolean>(() => {
      return store.currentComponent === 'SelectFeedbackType'
    })

    const canShowAdditionalControlAndInfo = computed<boolean>(() => {
      return store.currentComponent !== 'Success' && store.currentComponent !== 'Error'
    })

    return {
      emit,
      canGoBack,
      canShowAdditionalControlAndInfo,
      label,
      colors,
      brandColors: brand,
      back
    }
  }
})
</script>

<style lang="postcss" scoped>
.box {
  @apply fixed z-50 bottom-0 right-0 mb-5 mr-5 bg-white rounded-xl py-5 px-5
    flex flex-col items-center shadow-xl select-none;
  width: 400px
}
</style>
