// 定义mutations
import * as types from './mutation-types'
import { getFolderInfo } from '@/assets/js/util'
// 给左侧树绑定id
let id
function setIdToTreeData(folders) {
  debugger
  for (let i = 0, len = folders.length; i < len; i++) {
    let folder = folders[i]
    id = id + 1
    folder.id = id
    if (folder.folder) {
      setIdToTreeData(folder.folder)
    } else {
      folder.folder = []
    }
    if (!folder.file) {
      folder.file = []
    }
  }
}

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
    if (menuType !== null) {
      state.menuType = menuType
    }
    state.rightMenuShow = isShow
  },
  [types.SET_TREE_DATA](state, data) {
    id = 1
    data[0].id = id
    setIdToTreeData(data[0].folder)
    let name = data[0].folder.length > 0 ? data[0].folder[0].name : ''
    let currentId = data[0].folder.length > 0 ? data[0].folder[0].id : 0
    state.selectId = currentId
    state.path.push(name)
    state.index = 0
    state.treeData = data
  },
  [types.SET_ORG_DATAS](state, data) {
    state.orgDatas = data
  },
  [types.UPDATE_TREE](state, { path, files }) {
    let currentPath
    if (path) {
      currentPath = path
    } else {
      currentPath = state.path[state.index]
    }
    let folderInfo = getFolderInfo(currentPath, state.treeData[0])
    folderInfo.file.push(...files)
  },
  [types.SET_USERINFO](state, userinfo) {
    state.userinfo = userinfo
  },
  [types.SET_SELECT_FILES](state, files) {
    state.fileList = files
  },
  // [types.SET_LEFT_SELECT](state, selectData) {
  //   state.leftSelect = selectData
  // },
  [types.DELETE_TREE_NODE](state, { rootFolder, deleteFolder }) {
    let folderInfo = getFolderInfo(rootFolder, state.treeData[0])
    let len = len = folderInfo && folderInfo.folder ? folderInfo.folder.length : 0
    for (let i = 0; i < len; i++) {
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
  },
  [types.ADD_FOLDER_NODE](state, newFolder) {
    debugger
    let currentPath = state.path[state.index]
    let folderInfo = getFolderInfo(currentPath, state.treeData[0])
    let newFolderInfo = {
      id: ++id,
      name: newFolder,
      folder: [],
      file: []
    }
    if (folderInfo.folder) {
      folderInfo.folder.push(newFolderInfo)
    } else {
      folderInfo = Object.assign({}, folderInfo, { folder: [newFolderInfo] })
    }
  },
  [types.UPDATE_FOLDER_NAME](state, { rootFolder, oldName, newName }) {
    debugger
    let folderInfo = getFolderInfo(rootFolder, state.treeData[0])
    let len = len = folderInfo && folderInfo.folder ? folderInfo.folder.length : 0
    for (let i = 0; i < len; i++) {
      let item = folderInfo.folder[i]
      if (item.name === oldName) {
        item.name = newName
        break
      }
    }
    // // 更新path里面记录的路径
    let pathArr = state.path
    for (let i = 0, len = pathArr.length; i < len; i++) {
      let pathItem = pathArr[i]
      let oldPath = rootFolder ? `${rootFolder}/${oldName}` : oldName
      let newPath = rootFolder ? `${rootFolder}/${newName}` : newName
      if (pathItem.startsWith(oldPath)) {
        pathArr.splice(i, 1, pathItem.replace(oldPath, newPath))
      }
    }
  }
}
export default mutations
