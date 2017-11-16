/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="right-menu" :style="style" @mousedown.stop="menuMouseDown" v-show="show">
    <ul class="menu-list" @click="menuClick">
      <li class="menu-list-item" @mouseup.stop="downloadClick" v-if="showInfo.download">
        <i class="icon-item download-icon vertical"></i>
        <span class="vertical">下载</span>
      </li>
      <li class="menu-list-item" @mouseup.stop="uploadClick" v-if="showInfo.upload&&menuType !== 1">
        <i class="icon-item upload-icon vertical"></i>
        <span class="vertical">上传</span>
      </li>
      <div class="border-line"></div>
      <li class="menu-list-item" @mouseup.stop="newFolderClick" v-if="showInfo.create&&menuType !== 1">
        <i class="icon-item new-icon vertical"></i>
        <span class="vertical">新建文件夹</span>
      </li>
      <li class="menu-list-item" @mouseup.stop="refreshClick" v-if="showInfo.refresh&&(menuType === 0||menuType === 2)">
        <i class="icon-item refresh-icon vertical"></i>
        <span class="vertical">{{menuType === 0?'刷新目录树':'刷新'}}</span>
      </li>
      <li class="menu-list-item" @mouseup.stop="renameClick" v-if="showInfo.rename"
          v-show="fileList.length===1||menuType === 0">
        <i class="icon-item rename-icon vertical"></i>
        <span class="vertical">重命名</span>
      </li>
      <li class="menu-list-item" @mouseup.stop="deleteClick" v-if="showInfo.delete">
        <i class="icon-item delete-icon vertical"></i>
        <span class="vertical">删除</span>
      </li>
      <div class="border-line"></div>
      <li class="menu-list-item" @mouseup.stop="searchClick"
          v-show="menuType === 0">
        <i class="icon-item search-icon vertical"></i>
        <span class="vertical">在文件夹中搜索</span>
      </li>
      <li class="menu-list-item" @mouseup.stop="authClick" v-show="menuType === 0"
          v-if="userinfo&&(userinfo.admin === '1'||userinfo.admin === 1)">
        <i class="icon-item auth-icon vertical"></i>
        <span class="vertical">授权</span>
      </li>
      <li class="menu-list-item" @mouseup.stop="labelClick" v-show="menuType === 2">
        <i class="icon-item label-icon vertical"></i>
        <span class="vertical">查看</span>
        <i class="fa fa-angle-right" aria-hidden="true" style="margin-left: 85px;"></i>
        <ul class="item-menu" :style="subPosition">
          <li class="menu-list-item" @click="labelSizeChange('large')">大图标</li>
          <li class="menu-list-item" @click="labelSizeChange('normal')">中图标</li>
          <li class="menu-list-item" @click="labelSizeChange('small')">小图标</li>
        </ul>
      </li>
      <li class="menu-list-item"v-show="menuType === 2">
        <i class="icon-item sort-icon vertical"></i>
        <span class="vertical">排序方式</span>
        <i class="fa fa-angle-right" aria-hidden="true" style="margin-left: 55px;"></i>
        <ul class="item-menu" :style="subPosition">
          <li class="menu-list-item" @click="sortClick('name')">名称</li>
          <li class="menu-list-item" @click="sortClick('size')">大小</li>
          <li class="menu-list-item" @click="sortClick('type')">类型</li>
          <li class="menu-list-item" @click="sortClick('time')">修改时间</li>
        </ul>
      </li>
      <li class="menu-list-item" @mouseup.stop="attributeClick" v-if="showInfo.attribute"
          v-show="fileList.length===1||menuType === 0||menuType === 2">
        <i class="attribute-icon fa fa-info vertical"></i>
        <span class="vertical">属性</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import {
  DOWNLOAD_URL,
  JWT_TOKEN,
  DOWNLOAD_FOLDER_URL,
  LEFT_TREE_MENU,
  FILE_MENU,
  BLANK_MENU,
  DELETE_FILE_URL,
  DELETE_FOLDER_URL,
  CREATE_FOLDER_URL,
  RENAME_FOLDER,
  RENAME_FILE,
  FILE_ATTRIBUTE,
  FOLDER_ATTRIBUTE,
  FOLDER_TREE,
  SORT_TYPE,
  FOLDER_MENU
} from '@/assets/js/const-value'
import { downloadFiles, getFolderInfo } from '@/assets/js/util'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      show: false
    }
  },
  computed: {
    showInfo() {
      let showInfo = {
        refresh: true,
        attribute: true,
        labelsize: true
      }
      if (this.userinfo && (this.userinfo.admin === '1' || this.userinfo.admin === 1)) {
        showInfo = {
          download: true,
          upload: true,
          delete: true,
          create: true,
          rename: true,
          refresh: true,
          attribute: true
        }
      } else {
        let folderInfo = getFolderInfo(this.currentPath, this.treeData[0])
        if (folderInfo && folderInfo.auth) {
          showInfo = this.getShowInfo(folderInfo)
        } else {
          let pathArr = this.currentPath.split('/')
          if (pathArr.length > 0) {
            let prePathArr = pathArr.slice(0, pathArr.length - 1)
            folderInfo = this.getAuthFolderInfo(prePathArr.join('/'))
            if (folderInfo && folderInfo.auth && folderInfo.auth.subinherit === '1') {
              showInfo = this.getShowInfo(folderInfo)
            }
          }
        }
      }
      return showInfo
    },
    style() {
      let x = this.left
      let y = this.top
      let count = 0
      for (let item in this.showInfo) {
        if (this.showInfo[item]) {
          count++
        }
      }
      if (count === 0) {
        this.show = false
        return
      } else {
        this.show = true
      }
      let maxHeight = count * 25
      if (window.innerWidth - x < 200) {
        x = x - 200
        this.subPosition = { marginLeft: '-144px' }
      } else {
        this.subPosition = { marginLeft: '182px' }
      }
      if (window.innerHeight - y < maxHeight) {
        y = y - maxHeight
      }
      return { left: x + 'px', top: y + 'px' }
    },
    ...mapGetters(['left', 'top', 'menuType', 'fileList', 'currentPath', 'treeData', 'userinfo', 'sortType'])
  },
  methods: {
    searchClick() { },
    /**
     * 排序
     */
    sortClick(type) {
      let sortType = this.sortType
      switch (type) {
        case 'name':
          if (this.sortType === SORT_TYPE.name_order) {
            sortType = SORT_TYPE.name_reverseOrder
          } else {
            sortType = SORT_TYPE.name_order
          }
          break
        case 'size':
          if (this.sortType === SORT_TYPE.size_order) {
            sortType = SORT_TYPE.size_reverseOrder
          } else {
            sortType = SORT_TYPE.size_order
          }
          break
        case 'type':
          if (this.sortType === SORT_TYPE.type_order) {
            sortType = SORT_TYPE.type_reverseOrder
          } else {
            sortType = SORT_TYPE.type_order
          }
          break
        case 'time':
          if (this.sortType === SORT_TYPE.time_order) {
            sortType = SORT_TYPE.time_reverseOrder
          } else {
            sortType = SORT_TYPE.time_order
          }
          break
      }
      this.$axios.get(FOLDER_TREE, {
        params: {
          sortType: sortType
        }
      }).then((res) => {
        if (res.data.status) {
          let dataTree = res.data.data
          let folderInfo = getFolderInfo(this.currentPath, dataTree)
          this.updateTree(folderInfo)
          this.changeSortType(sortType)
        }
      })
    },
    getShowInfo(folderInfo) {
      let showInfo
      let auth = folderInfo.auth
      if (this.menuType === LEFT_TREE_MENU) {
        showInfo = {
          download: auth.folderdownload === '1',
          upload: auth.folderupload === '1',
          delete: auth.folderdelete === '1',
          create: auth.foldercreate === '1',
          rename: auth.folderrename === '1',
          refresh: true,
          attribute: true
        }
      } else if (this.menuType === FILE_MENU) {
        showInfo = {
          download: auth.filedownload === '1',
          upload: false,
          delete: auth.filedelete === '1',
          create: false,
          rename: auth.filerename === '1',
          attribute: true
        }
      } else if (this.menuType === BLANK_MENU) {
        showInfo = {
          download: auth.folderdownload === '1',
          upload: auth.folderupload === '1',
          delete: auth.folderdelete === '1',
          create: auth.foldercreate === '1',
          rename: auth.folderrename === '1',
          refresh: true,
          attribute: true
        }
      }
      return showInfo
    },
    getAuthFolderInfo(path) {
      let folderInfo = getFolderInfo(path, this.treeData[0])
      while ((!folderInfo.auth && path !== '') && folderInfo) {
        let pathArr = path.split('/')
        let prePathArr = pathArr.slice(0, pathArr.length - 1)
        path = prePathArr.join('/')
        folderInfo = getFolderInfo(path, this.treeData[0])
      }
      return folderInfo
    },
    menuMouseDown() {
    },
    /**
     * 右键菜单被点击
     */
    menuClick() {
      this.changeMenuShow({ isShow: false, left: 0, top: 0 })
    },
    /**
     * 下载点击事件
     */
    downloadClick() {
      let urls
      if (this.menuType === LEFT_TREE_MENU || this.menuType === BLANK_MENU) {
        let url = `${DOWNLOAD_FOLDER_URL}?folder=${this.currentPath}&authorization=${Cookies.get(JWT_TOKEN)}`
        urls = [url]
      } else if (this.menuType === FILE_MENU || this.menuType === FOLDER_MENU) {
        urls = this.fileList.map((item) => {
          if (item.isFolder) {
            let path = this.currentPath + '/' + item.name
            return `${DOWNLOAD_FOLDER_URL}?folder=${path}&authorization=${Cookies.get(JWT_TOKEN)}`
          } else {
            return `${DOWNLOAD_URL}?filePath=${this.currentPath}/${item.name}&authorization=${Cookies.get(JWT_TOKEN)}`
          }
        })
      }
      downloadFiles(urls)
    },
    /**
     * 上传点击事件
     */
    uploadClick() {
      this.setUploadState(true)
    },
    /**
     * 删除点击事件
     */
    deleteClick() {
      let menuType = this.menuType
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams()
        // 如果点击的是左侧目录是，是文件夹的话，则删除文件夹
        if (menuType === LEFT_TREE_MENU || menuType === FOLDER_MENU) {
          let path = menuType === FOLDER_MENU ? this.currentPath + '/' + this.fileList[0].name : this.currentPath
          let pathArr = path.split('/')
          let deleteFolder = pathArr[pathArr.length - 1]
          let rootFolder = pathArr.slice(0, pathArr.length - 1).join('/')
          params.append('delFolder', deleteFolder)
          params.append('baseFolder', rootFolder)
          this.$axios.post(DELETE_FOLDER_URL, params).then((res) => {
            if (res.data.status) {
              this.deleteNode({ rootFolder, deleteFolder })
            } else {
              this.$message({
                message: '刪除失败！'
              })
            }
          })
        } else if (menuType === FILE_MENU) {
          // 删除文件所在文件夹
          let path = this.currentPath
          let deleteFiles = this.fileList
          params.append('baseFolder', path)
          params.append('delFileNames', deleteFiles.join('*'))
          this.$axios.post(DELETE_FILE_URL, params).then((res) => {
            if (res.data.status) {
              this.deleteFile(deleteFiles)
            } else {
              this.$message({
                message: '刪除失败！'
              })
            }
          })
        }
      }).catch(() => {
      })
    },
    /**
     * 授权按钮点击
     */
    authClick() {
      this.changeAuthShow(true)
    },
    /**
     * 新建文件夹
     * atime，mtime，ctime就分别代表了访问时间，修改时间以及创建时间
     */
    newFolderClick() {
      let params = new URLSearchParams()
      let path = this.menuType === FOLDER_MENU ? this.currentPath + '/' + this.fileList[0].name : this.currentPath
      this.$prompt('请输入文件名称', '新建文件夹', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: '新建文件夹'
      }).then(({ value }) => {
        params.append('baseFolder', path)
        params.append('newFolder', value)
        this.$axios.post(CREATE_FOLDER_URL, params).then((res) => {
          if (res.data.status) {
            this.addNewFolder({ newFolder: res.data.newName, currentPath: path })
            let folderInfo = getFolderInfo(path, this.treeData[0])
            this.pushExpandKey(folderInfo.id)
          } else {
            this.$message({
              message: res.data.message
            })
          }
        })
      }).catch(() => {

      })
    },
    /**
     * 重命名
     */
    renameClick() {
      let params = new URLSearchParams()
      let url
      let path = this.currentPath
      let oldName
      let menuType = this.menuType
      if (this.menuType === LEFT_TREE_MENU) {
        oldName = path.split('/')
        let pathArr = path.split('/')
        oldName = pathArr[pathArr.length - 1]
        path = pathArr.slice(0, pathArr.length - 1).join('/')
        url = RENAME_FOLDER
      } else if (this.menuType === FILE_MENU) {
        // let name = this.fileList[0]
        oldName = this.fileList[0].name // name.substring(0, name.lastIndexOf('.'))
        if (this.fileList[0].isFolder) {
          url = RENAME_FOLDER
        } else {
          url = RENAME_FILE
        }
      } else if (this.menuType === FOLDER_MENU) {
        oldName = this.fileList[0].name
        path = this.currentPath
        url = RENAME_FOLDER
      }
      this.$prompt('请输入文件名称', '重命名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: oldName
      }).then(({ value }) => {
        params.append('oldName', oldName)
        params.append('baseFolder', path)
        params.append('newName', value)
        this.$axios.post(url, params).then((res) => {
          if (res.data.status) {
            if (menuType === LEFT_TREE_MENU || menuType === FOLDER_MENU) {
              let obj = { rootFolder: path, oldName: oldName, newName: value, type: 'folder' }
              this.updateFolder(obj)
            } else {
              let obj = { rootFolder: path, oldName: oldName, newName: value, type: 'file' }
              this.updateFolder(obj)
            }
          } else {
            this.$message({
              message: '重命名失败，请刷新后重试'
            })
          }
        })
      }).catch(() => {

      })
    },
    /**
     * 属性查询
     */
    attributeClick() {
      let params = new URLSearchParams()
      let path = this.currentPath
      let file = this.fileList[0]
      if (this.menuType === LEFT_TREE_MENU || this.menuType === BLANK_MENU || this.menuType === FOLDER_MENU) {
        if (this.menuType === FOLDER_MENU) {
          path = path + '/' + file.name
        }
        params.append('folderPath', path)
        let pathArr = path.split('/')
        let folderName = pathArr[pathArr.length - 1]
        this.$axios.post(FOLDER_ATTRIBUTE, params).then((res) => {
          if (res.data.status) {
            res.data.data.name = folderName
            res.data.data.isFolder = true
            this.pushAttribute(res.data.data)
          }
        })
      } else { //  if (this.menuType === FILE_MENU)
        params.append('filePath', path + '/' + file.name)
        this.$axios.post(FILE_ATTRIBUTE, params).then((res) => {
          if (res.data.status) {
            res.data.data.name = file.name
            this.pushAttribute(res.data.data)
          }
        })
      }
    },
    /**
     * 刷新点击事件
     */
    refreshClick() {
      let menuType = this.menuType
      this.$axios.get(FOLDER_TREE).then((res) => {
        if (res.data.status) {
          if (menuType === LEFT_TREE_MENU) {
            let dataTree = res.data.data
            let data = [dataTree]
            this.setTreeData(data)
          } else {
            let dataTree = res.data.data
            let folderInfo = getFolderInfo(this.currentPath, dataTree)
            this.updateTree(folderInfo)
          }
        }
      })
    },
    /**
     * 图标大小改变
     */
    labelSizeChange(size) {
      this.changeLabelSize(size)
    },
    ...mapMutations({
      updateTree: 'REFRESH_TREE_DATA',
      changeAuthShow: 'CHANGE_AUTH_SHOW',
      pushAttribute: 'PUSH_ATTRIBUTE',
      updateFolder: 'UPDATE_FOLDER_NAME',
      changeMenuShow: 'CHANGE_RIGHT_MENU_SHOW',
      deleteNode: 'DELETE_TREE_NODE',
      deleteFile: 'DELETE_FILE',
      setTreeData: 'SET_TREE_DATA',
      setUploadState: 'SET_UPLOAD_STATE',
      addNewFolder: 'ADD_FOLDER_NODE',
      changeLabelSize: 'CHANGE_LABEL_SIZE',
      pushExpandKey: 'PUSH_EXPAND_KEY',
      changeSortType: 'CHANGE_SORT_TYPE'
    })
  }
}
</script>

<style lang="scss" scoped>
.right-menu {
  position: absolute;
  width: 200px;
  z-index: 9999;
  box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-clip: padding-box;
  background: #fff;
  margin: 0;
  margin-left: 4px;
  font-size: 1.5rem;
  padding: 8px 0px;
  animation-duration: 0.25s;
  .menu-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    .border-line {
      border-bottom: 1px solid #ddd;
      margin: 0 10px;
    }
    .menu-list-item {
      position: relative;
      line-height: 25px;
      height: 25px;
      padding: 0 15px 0 20px;
      cursor: pointer;
      &:hover {
        background: #e1e1e1;
        .item-menu {
          display: block;
        }
      }
      .vertical {
        vertical-align: middle;
      }
      .icon-item {
        display: inline-block;
        width: 16px !important;
        background-size: auto;
        background-repeat: no-repeat;
        height: 16px;
        margin-right: 15px;
      }
      .download-icon {
        background-position: -16px -48px;
        background-image: url(../../assets/image/menu_icon.png);
      }
      .upload-icon {
        background-position: 0px -48px;
        background-image: url(../../assets/image/menu_icon.png);
      }
      .delete-icon {
        background-position: 0 -80px;
        background-image: url(../../assets/image/menu_icon.png);
      }
      .new-icon {
        background-position: 0 -15px;
        background-image: url(../../assets/image/menu_icon.png);
      }
      .rename-icon {
        background-position: 0 -64px;
        background-image: url(../../assets/image/menu_icon.png);
      }
      .label-icon {
        background-position: 0 -529px;
        background-image: url(../../assets/image/menu_icon.png);
      }
      .sort-icon {
        background-position: 0px -561px;
        background-image: url(../../assets/image/menu_icon.png);
      }
      .refresh-icon {
        background-position: -17px -513px;
        background-image: url(../../assets/image/menu_icon.png);
      }
      .auth-icon {
        background-image: url(../../assets/image/auth.png);
        background-position: center;
        background-size: 150% !important;
      }
      .search-icon {
        background-position: 0px -735px;
        background-image: url(../../assets/image/menu_icon.png);
      }
      .attribute-icon {
        color: #fff !important;
        background: #c4e5ff;
        text-align: center;
        width: 15px;
        border-radius: 50%;
        height: 15px;
        line-height: 15px;
        margin-right: 15px;
        box-shadow: 0 0 0 1px #6db9f5;
      }
      .fa-info::before {
        color: #249dff;
        background-image: -webkit-linear-gradient(2deg, #249dff, #08558a);
        background-clip: text;
        text-fill-color: transparent;
        -webkit-text-fill-color: transparent;
        -webkit-background-clip: text;
      }
      .item-menu {
        position: absolute;
        display: none;
        width: 120px;
        top: -8px;
        list-style-type: none;
        padding: 8px 0px;
        z-index: 9999;
        box-shadow: 4px 5px 10px rgba(0, 0, 0, 0.2);
        border-radius: 0;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background-clip: padding-box;
        background: #fff;
      }
    }
  }
}
</style>
