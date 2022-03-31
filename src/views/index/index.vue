<template>
  <div class="body">
    <el-container>
      <el-aside width="200px">
        <img
          src="@/assets/logo2.png"
          alt=""
        >
        <el-menu
          :default-active="mode"
          class="el-menu-vertical-demo"
        >
          <el-menu-item
            index="chart"
            @click="handleOpen('chart')"
          >
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据统计</span>
          </el-menu-item>
          <el-menu-item
            index="check"
            @click="handleOpen('check')"
          >
            <i class="el-icon-s-check"></i>
            <span slot="title">审核处理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header height="80px">
          <div>
            <el-button
              type="text"
              icon="el-icon-s-custom"
              size="medium"
            >admin</el-button>
            <el-button
              type="text"
              size="medium"
            >退出登录</el-button>
          </div>
        </el-header>
        <el-main>
          {{test}}
          <mode-chart v-if="mode==='chart'"></mode-chart>
          <mode-check v-else-if="mode==='check'"></mode-check>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import axios from 'axios'
import {maximize} from './renderer'
import modeChart from '@/views/chart/chart'
import modeCheck from '@/views/check/check'

export default {
  name: 'index',
  components: {modeChart, modeCheck
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      res: null,
      mode: 'chart',
      test: 0
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
    },
    handleOpen (mode) {
      this.mode = mode
      this.$router.push({path: `/index/${mode}`})
    }
  },
  async created () {
    console.log('create')
    // 载入时最大化窗口
    maximize()

    // 获取accesstoken,放入sessionStorage中
    const APPID = 'wx1c8e98e985d3373f'
    const secret = '92a76d38448c0d7c49c96a22f6a7dd01'
    let res = await axios({method: 'get', url: `/api/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${secret}`})
    const {access_token} = res.data

    let storage = window.sessionStorage
    storage.setItem('token', access_token)
  },
  mounted () {
    console.log('mount!')
    console.log(this.$store.state)
    let {count} = this.$store.state
    this.test = count
  }
}
</script>

<style lang="scss" scoped>
.body {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      height: 100%;
      overflow: hidden;
      img {
        height: 80px;
        object-fit: contain;
        margin: 0;
      }
      .el-menu {
        margin: 0;
        height: calc(100% - 80px);
        border-right: none;
        .is-active {
          border-left: 5px solid #ffae00;
          background-color: #ffefcc;
        }
      }
    }
    .el-container {
      .el-main {
        margin: 4px 0 0 0;
        background-color: #ffefcc;
      }
    }
    //
    //   .el-header {
    //     display: flex;
    //     justify-content: space-between;
    //     align-items: center;
    //     img {
    //
    //     }
    //     div {
    //       flex: 1;
    //       text-align: right;
    //     }
    //   }
    //   .main {
    //     height: calc(100% - 80px);
    //     .el-menu {
    //       height: 100%;
    //     }
    //   }
  }
}
.el-header {
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #ffefcc;
}
</style>
