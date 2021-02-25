import axios from 'axios'
import FeedbacksService from './feedbacks'

const API_ENVS = {
  production: 'https://backend-treinamento-vue3-ecru.vercel.app/',
  development: 'http://localhost:3000',
  local: 'http://localhost:3000'
}

const httpClient = axios.create({
  baseURL: API_ENVS[process.env.NODE_ENV] || API_ENVS.local
})

httpClient.interceptors.response.use((response) => {
  return response
}, (error) => {
  // Aqui trata o retorno de erro para dar sequência apenas se não for 0 ou 500. Pois nos componentes que usam o axios, já
  // trata os erros 404, 401, etc (ver modallogin.vue por exemplo)
  // Isso previne que não caia no catch de algum try da chamada da API
  const canThrowError = error.request.status === 0 || error.request.status === 500

  if (canThrowError) {
    throw new Error(error.message)
  }

  return error
})

export default {
  feedbacks: FeedbacksService(httpClient)
}
