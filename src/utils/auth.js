import { TOKEN_TIME, TOKEN_TIME_VALUE } from './constant'

//  登录时间设置
export const setTokenTime = () => {
  localStorage.setItem(TOKEN_TIME, Date.now())
}