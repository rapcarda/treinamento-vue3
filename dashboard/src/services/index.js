import axios from 'axios'
import router from '../router'
import AuthService from './auth'
import UsersService from './users'
import FeedbacksService from './feedbacks'
import { setGlobalLoading } from '../store/global'

const API_ENVS = {
  production: 'https://backend-treinamento-vue3-ecru.vercel.app/',
  development: 'http://localhost:3000',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] ?? API_ENVS.local
})

httpClient.interceptors.request.use(config => {
  console.log(process.env.NODE_ENV)
  setGlobalLoading(true)
  const token = window.localStorage.getItem('token')

  if (token) {
    config.headers.common.Authorization = `Bearer ${token}`
  }

  return config
})

httpClient.interceptors.response.use((response) => {
  setGlobalLoading(false)
  return response
}, (error) => {
  // Aqui trata o retorno de erro para dar sequência apenas se não for 0 ou 500. Pois nos componentes que usam o axios, já
  // trata os erros 404, 401, etc (ver modallogin.vue por exemplo)
  // Isso previne que não caia no catch de algum try da chamada da API
  const canThrowError = error.request.status === 0 || error.request.status === 500

  if (canThrowError) {
    setGlobalLoading(false)
    throw new Error(error.message)
  }

  // Erro 401 é retornado se o token for inválido
  if (error.response.status === 401) {
    router.push({ name: 'Home' })
  }

  setGlobalLoading(false)
  return error
})

export default {
  // Desta forma é melhor, pois o AuthService não precisa saber qual o client sendo usado, se axios, etc, ele apenas recebe um httpClient
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
  feedbacks: FeedbacksService(httpClient)
}
