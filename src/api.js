import axios from 'axios'

let storage = window.sessionStorage
let token = storage.getItem('token')
const cloudDev = 'develop-0guqmlrwce7ddc4b'
export const getTotalNum = () => {
  return axios({
    method: 'post',
    url: `/api/tcb/databasecount?access_token=${token}`,
    data: {
      env: cloudDev,
      query: 'db.collection("goods-shelf").count()'
    }
  })
}

export const getTodayNum = () => {
  const fun = 'backTodayNum'
  // this.res = res.data
  return axios({
    method: 'post',
    url: `/api/tcb/invokecloudfunction?access_token=${token}&env=${cloudDev}&name=${fun}`
  })
}

export const getTodayDealNum = () => {
  const fun = 'backTodayDealNum'
  // this.res = res.data
  return axios({
    method: 'post',
    url: `/api/tcb/invokecloudfunction?access_token=${token}&env=${cloudDev}&name=${fun}`
  })
}
