<template>
  <div class="page-body">
    <div class="header">
      <img
        src="@/assets/logo.png"
        alt=""
      >
    </div>
    <div>
      <el-card class="login-box">
        <div
          slot="header"
          class="clearfix"
        >
          <span class="title">后台管理系统</span>
        </div>
        <el-form
          :model="form"
          class="form-body"
        >
          <el-form-item class="form-item">
            <el-input v-model="form.id"><i
                slot="prefix"
                class="el-input__icon el-icon-user"
              ></i></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.password"
              type="password"
            ><i
                slot="prefix"
                class="el-input__icon el-icon-key"
              ></i></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          @click="turnToLogin"
        >登录</el-button>
      </el-card>
    </div>
  </div>
</template>

<script>
import {login} from './renderer'
export default {
  name: 'Login',

  data () {
    return {
      form: {
        id: '',
        password: ''
      }
    }
  },

  mounted () {

  },

  methods: {
    turnToLogin () {
      // 改 加个加载状态
      login(this.form).then(res => {
        // 登录成功 打开页面
        this.$router.push({path: 'index/chart'})
      }).catch(err => {
        // 改：加个弹窗
        console.log(err)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.page-body {
  display: block;
  position: fixed;
  height: 100%;
  width: 100%;
  background: url('../../assets/bg.png') fixed no-repeat !important;
  .header {
    height: 200px;
    img {
      height: 100%;
    }
  }
  .login-box {
    background-color: rgba(255, 255, 255, 0.5);
    width: 70%;
    min-width: 200px;
    margin: 0 auto;
    padding: 10px 0;
    .title {
      font-size: 24px;
      font-weight: 600;
      letter-spacing: 2px;
    }
    .form-body {
      margin: 0 10%;
      padding: 20px 0;
      .form-item {
        margin-bottom: 20px;
      }
    }
    .el-button {
      width: 80%;
    }
  }
}
</style>
