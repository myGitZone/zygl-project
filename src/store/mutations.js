// 定义mutations
import * as types from './mutation-types'

const mutations = {
  [types.PUSH_PATH](state, path) {
    if (state.path[state.path.length - 1] === path) {
      return
    }
    state.path.push(path)
    state.index = state.path.length - 1
  },
  [types.CHANGE_INDEX](state, index) {
    state.index = index
  },
  [types.SET_NEW_PATH](state, path) {
    state.path = [path]
    state.index = 0
  },
  [types.CHANGE_RIGHT_MENU_SHOW](state, {isShow, left, top}) {
    state.left = left
    state.top = top
    state.rightMenuShow = isShow
  },
  [types.SET_TREE_DATA](state, data) {
    state.treeData = data
    let name = data[0].folder.length > 0 ? data[0].folder[0].name : ''
    state.path.push(name)
  },
  [types.SET_ORG_DATAS](state, data) {
    state.orgDatas = data
  }
}
export default mutations
