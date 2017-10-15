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
    if (menuType) {
      state.menuType = menuType
    }
  },
  [types.SET_TREE_DATA](state, data) {
    state.treeData = data
    let name = data[0].folder.length > 0 ? data[0].folder[0].name : ''
    let id = data[0].folder.length > 0 ? data[0].folder[0].id : 0
    state.selectId = id
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
  },
  // [types.SET_LEFT_SELECT](state, selectData) {
  //   state.leftSelect = selectData
  // },
  [types.DELETE_TREE_NODE](state, { rootFolder, deleteFolder }) {
    let folderInfo = getFolderInfo(rootFolder, state.treeData[0])
    let i
    let len = len = folderInfo && folderInfo.folder ? folderInfo.folder.length : 0
    for (i = 0; i < len; i++) {
      let item = folderInfo.folder[i]
      if (item.name === deleteFolder) {
        folderInfo.folder.splice(i, 1)
        break
      }
    }
  },
  [types.DELETE_FILE](state, deleteFiles) {
    let currentPath = state.path[state.index]
    let folderInfo = getFolderInfo(currentPath, state.treeData[0])
    debugger
    // let len = len = folderInfo && folderInfo.file ? folderInfo.file.length : 0
    let files = folderInfo.file.filter((item) => {
      return deleteFiles.indexOf(item) < 0
    })
    folderInfo.file = files
  },
  [types.SET_UPLOAD_STATE](state, isShow) {
    state.showUpload = isShow
  },
  [types.SET_SELECT_ID](state, id) {
    state.selectId = id
  }
}
export default mutations
