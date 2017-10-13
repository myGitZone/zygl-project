// 定义mutations
import * as types from './mutation-types'
import { getFolderInfo } from '@/assets/js/util'
const mutations = {
  [types.PUSH_PATH](state, path) {
    if (state.path[state.path.length - 1] === path) {
      state.index = state.path.length - 1
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
  [types.CHANGE_RIGHT_MENU_SHOW](state, { isShow, left, top, menuType }) {
    state.left = left
    state.top = top
    state.rightMenuShow = isShow
    state.menuType = menuType
  },
  [types.SET_TREE_DATA](state, data) {
    state.treeData = data
    let name = data[0].folder.length > 0 ? data[0].folder[0].name : ''
    state.path.push(name)
    state.index = 0
  },
  [types.SET_ORG_DATAS](state, data) {
    state.orgDatas = data
  },
  [types.UPDATE_TREE](state, files) {
    let currentPath = state.path[state.index]
    let folderInfo = getFolderInfo(currentPath, state.treeData[0])
    folderInfo.file.push(...files)
  },
  [types.SET_USERNAME](state, username) {
    state.username = username
  },
  [types.SET_SELECT_FILES](state, files) {
    state.fileList = files
  }
}
export default mutations
