import SvgIcon from '@/components/SvgIcon'

/**
 *  require.context
 *    directory {String} -读取文件的路径 
 *    useSubdirectories {Boolean} -是否遍历文件的子目录
 *    regExp {RegExp} -匹配文件的正则
 */
const svgRequired = require.context('./svg', false, /\.svg$/)
svgRequired.keys().forEach((item) => svgRequired(item))

export default (app) => {
  app.component('svg-icon', SvgIcon)
}