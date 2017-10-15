// 定义vuex的初始状态
// const state = {
//   key: value
// }
const state = {
  // 记录当前所在path目录中个的索引
  index: -1,
  // 记录点击选择的路径
  path: [],
  // 左侧目录树
  treeData: null,
  // 右键菜单是否显示
  rightMenuShow: false,
  // 右键菜单距离左侧的距离
  left: 0,
  // 右键菜单距离上面的距离
  top: 0,
  // 右键的类型：0-左侧目录树，1-文件右键,2-空白右键
  menuType: 0,
  // 组织机构的树
  orgDatas: null,
  // 用户名
  username: null,
  // 选择的文件，文件名（包含扩展名）的数组
  fileList: [],
  // // 左侧目录树上右键选择的节点
  // leftSelect: null,
  // 是否显示上传框
  showUpload: false,
  // 左侧树选择的节点id
  selectId: 0
}

export default state
