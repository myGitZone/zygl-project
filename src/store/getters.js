// 获取状态值的封装，在使用的是，直接使用getters，即可获取数据，定义方式
// 获取路径信息。
export const path = state => state.path
// 获取索引信息
export const index = state => state.index
// 获取当前路径
export const currentPath = state => state.path[state.index]
// 获取文件夹树信息
export const treeData = state => state.treeData
// 右键菜单是否展示
export const rightMenuShow = state => state.rightMenuShow
// 右键菜单left值
export const left = state => state.left
// 右键菜单top值
export const top = state => state.top
// 组织机构数据
export const orgDatas = state => state.orgDatasz
