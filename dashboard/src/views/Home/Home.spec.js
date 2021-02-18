import Home from '.'
import { shallowMount } from '@vue/test-utils'
// Importa as rotas, pois o home usa
import { routes } from '../../router'
// No index do router, utiliza estes imports abaixo
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

describe('<Home />', () => {
  it('should render home correctly', async () => {
    // Só vai testar, quando o vue router estiver pronto
    router.push('/')
    await router.isReady()

    // Se estivesse usando vuex, passaria a store aqui também, pois é uma dependência global
    // Tem uma função que chama "mount" que seria utilizada no lugar do "ShallowMount".
    // A diferença é que usando o mount, é montado tudo, incluindo subcomponentes da Home no caso
    // Já o ShallowMount monta somente a home, e ignora os subcomponentes
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
