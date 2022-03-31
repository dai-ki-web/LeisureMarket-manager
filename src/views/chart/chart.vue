<template>
  <div class="chart">
    <div class="constant-data">
      <el-card shadow="never">
        商品总数:{{goodsNum}}
      </el-card>
      <el-card shadow="never">
        今日发布:{{todayNum}}
      </el-card>
      <el-card shadow="never">
        今日交易量:{{todayDealNum}}
      </el-card>
      <el-card shadow="never">
        今日交易额:{{todayDealAmount}}
      </el-card>
    </div>
  </div>
</template>

<script>
import {getTotalNum, getTodayNum, getTodayDealNum} from '@/api'
export default {
  name: 'modeChart',

  data () {
    return {
      goodsNum: null,
      todayNum: null,
      todayDealNum: null,
      todayDealAmount: null
    }
  },

  mounted () {
    let tasks = [getTotalNum(), getTodayNum(), getTodayDealNum()]
    Promise.all(tasks).then(res => {
      // 商品总数
      this.goodsNum = res[0].data.count
      // 今日发布数
      this.todayNum = res[1].data.resp_data
      // 今日交易量
      this.todayDealNum = res[2].data.resp_data
    })
  },

  methods: {

  }
}
</script>

<style lang="less" scoped>
.chart {
  margin: 0 20px;
  .constant-data {
    display: flex;
    justify-content: space-between;
    .el-card {
      width: 20%;
      border: none;
    }
  }
}
</style>
