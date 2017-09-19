// 定义vuex的初始状态
// const state = {
//   key: value
// }
const state = {
  // 记录当前所在path目录中个的索引
  index: 0,
  // 记录点击选择的路径
  path: [],
  // 左侧目录树
  treeData: null,
  // 右键菜单是否显示
  rightMenuShow: false,
  // 右键菜单距离左侧的距离
  left: 0,
  // 右键菜单距离上面的距离
  top: 0
}

export default state
