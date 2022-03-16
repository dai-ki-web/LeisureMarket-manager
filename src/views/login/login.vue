<template>
  <div class="content">
    <label for="">用户名：<input
        type="text"
        v-model="form.id"
      ></label>
    <label for="">密码：<input
        type="password"
        v-model="form.password"
      ></label>
    <div>
      <button @click="turnToLogin">登录</button>
    </div>
    <hr />
    {{form}}
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
        this.$router.push({name: 'index'})
      }).catch(err => {
        // 改：加个弹窗
        console.log(err)
      })
    }
  }
}
</script>
<style lang="css" scoped>
.content label {
  display: block;
}
</style>
