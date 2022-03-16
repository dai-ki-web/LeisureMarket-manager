<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <button @click="defaulGet">get</button>
    <button @click="getCloud">getCloud</button>
    <div>{{res}}</div>

  </div>
</template>

<script>
import axios from 'axios'
import {maximize} from './renderer'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      res: null

    }
  },
  methods: {
    async defaulGet () {
      const params = { id: 1 }
      const res = await this.Request(params)
      this.res = res.data
    },
    Request (params) {
      return axios({ url: '/users', baseURL: 'http://jsonplaceholder.typicode.com', method: 'get', params })
    },
    async getCloud () {
      const APPID = 'wx1c8e98e985d3373f'
      const secret = '92a76d38448c0d7c49c96a22f6a7dd01'
      let test = await axios({method: 'get', url: `/api/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${secret}`})
      const {access_token} = test.data
      console.log(access_token)

      const cloudDev = 'develop-0guqmlrwce7ddc4b'
      const fun = 'httpTest'
      // this.res = res.data
      const res = await axios({method: 'post', url: `/api/tcb/invokecloudfunction?access_token=${access_token}&env=${cloudDev}&name=${fun}`})
      console.log(res.data)
      let {resp_data} = res.data
      let buf = resp_data.slice(1, -1)
      console.log(buf)
    }
  },
  created () {
    maximize()
  }
}
</script>

<style scoped>
</style>
