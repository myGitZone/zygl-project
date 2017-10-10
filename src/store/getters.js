// 获取状态值的封装，在使用的是，直接使用getters，即可获取数据，定义方式

export const path = state => state.path
export const index = state => state.index
export const currentPath = state => state.path[state.index]
export const treeData = state => state.treeData
export const rightMenuShow = state => state.rightMenuShow
export const left = state => state.left
export const top = state => state.top
export const orgDatas = state => state.orgDatas
