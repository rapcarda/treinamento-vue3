<template>
<!-- Passar as props com v-bind como abaixo, faz com que as props não necessáriamente precisem ser declaras onde estiver chamando este componente
     O componente loading precisa de algumas props, assim no ModalLogin/index onde chama este componente icon, passa já as props que precisa no Loading
     que será chamado aqui no ":is" -->
  <component :is="name" v-bind="$props" />
</template>

<script>
import Loading from './Loading.vue'
import Copy from './Copy'
import ChevronDown from './ChevronDown'
import Chat from './Chat'
import Close from './Close'
import ArrowRight from './ArrowRight'
import Atention from './Atention'
import Check from './Check'

export default {
  components: { Loading, Copy, ChevronDown, Chat, Close, ArrowRight, Atention, Check },
  props: {
    name: { type: String, required: true }
  }
}
</script>
