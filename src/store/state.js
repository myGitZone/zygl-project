// 定义vuex的初始状态
// const state = {
//   key: value
// }
import { SORT_TYPE } from '@/assets/js/const-value'
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
  userinfo: null,
  // 选择的文件，文件名（包含扩展名）的数组
  fileList: [],
  // // 左侧目录树上右键选择的节点
  // leftSelect: null,
  // 是否显示上传框
  showUpload: false,
  // 左侧树选择的节点id
  selectId: 0,
  // 记录右键获取的属性值
  attrbutes: [],
  // 授权界面是否显示
  showAuth: false,
  // 展示文件的大小
  fileBlockSize: 'normal',
  // 目录树默认展开的节点
  expandedKeys: [1],
  // 排序方式
  sortType: SORT_TYPE.name_order,
  // 是否展示查询窗口
  showSearch: false
}

export default state
