/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="right-panel" @mousedown.stop="panelMouseDown">
    <div class="right-header">
      <div class="header-left">
        <div class="btn-group">
          <button class="btn-default" :class="{'btn-disable':leftDisable}" @click="preClick">
            <i class="font-icon fa fa-angle-left"></i>
          </button>
          <button class="btn-default" :class="{'btn-disable':rightDisable}" @click="nextClick">
            <i class="font-icon fa fa-angle-right"></i>
          </button>
        </div>
      </div>
      <div class="header-address">
        <button class="btn-default btn-home" @click="homeClick">
          <i class="font-icon-home"></i>
        </button>
        <div class="path-container">
          <el-breadcrumb separator=">" v-if="currentPath">
            <el-breadcrumb-item v-for="(item,index) in currentPath.split('/')" @click.native="breadcrumbClick(index)" :key="index">{{item}}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </div>
      <div class="search-container">
        <el-input placeholder="请输入查询条件" size="small" icon="search" v-model="searchVal" :on-icon-click="handleIconClick">
        </el-input>
      </div>
    </div>
    <div class="file-container">
      <empty-block v-show="!foldersAndFiles||foldersAndFiles.length===0"></empty-block>
      <file-block ref="fileBlock" v-for="(item, index) in foldersAndFiles" :fileInfo='item' :key="index" :class="getClass(item)" :checked="!!getClass(item)" @mouseup.native.prevent.stop="fileMouseup(item,$event)" @mousedown.native.prevent.stop="fileMousedown(item,$event)"></file-block>
    </div>
  </div>
</template>

<script>
import FileBlock from './file-block'
import EmptyBlock from './empty-block'
import { mapGetters, mapMutations } from 'vuex'
import { RIGHT_CODE, BLANK_MENU, FILE_MENU, FOLDER_MENU } from '@/assets/js/const-value.js'
import { getFoldersAndFiles } from '@/assets/js/util'

export default {
  data() {
    return {
      selectFiles: [],
      searchVal: null
    }
  },
  computed: {
    foldersAndFiles() {
      let path = this.currentPath
      let root = this.treeData ? this.treeData[0] : null
      return getFoldersAndFiles(path, root)
    },
    /**
     * 判断左侧按钮是否可用
     * @returns {boolean}
     */
    leftDisable() {
      return this.index <= 0
    },
    /**
     * 判断右侧按钮是否可用
     * @returns {boolean}
     */
    rightDisable() {
      return this.path.length === 0 || this.index === this.path.length - 1
    },
    ...mapGetters(['path', 'index', 'currentPath', 'treeData', 'fileList'])
  },
  watch: {
    fileList() {
      this.selectFiles = this.fileList
    },
    selectFiles() {
      this.setSelectFiles(this.selectFiles)
    }
  },
  methods: {
    /**
     * 查询图标点击事件
     */
    handleIconClick() {
      if (!this.searchVal) {
        return
      }
      this.selectFiles = []
      for (let i = 0, len = this.foldersAndFiles.length; i < len; i++) {
        let item = this.foldersAndFiles[i].file ? this.foldersAndFiles[i].name : this.foldersAndFiles[i]
        if (item.toLocaleLowerCase().includes(this.searchVal)) {
          let isFolder = item.file
          this.selectFiles.push({
            isFolder: isFolder,
            name: isFolder ? item.name : item
          })
          // this.selectFiles.push(item)
        }
      }
      if (this.selectFiles.length === 0) {
        this.$message({
          message: '未找到匹配文件！'
        })
      }
    },
    /**
     * home键点击
     */
    homeClick() {
      this.changeIndex(0)
    },
    /**
     * 文件鼠标抬起
     */
    fileMouseup(item, e) {
      if (e.button === RIGHT_CODE) {
        if (item.file) {
          this.menutype = FOLDER_MENU
        } else {
          this.menutype = FILE_MENU
        }
        this._showMenu(e)
      }
    },
    /**
     * 文件鼠标落下
     */
    fileMousedown(item, e) {
      // 设置右键不显示
      this.changeMenuShow({ isShow: false, left: 0, top: 0 })
      let isFolder = item.file
      this.selectFiles = [{
        isFolder: isFolder,
        name: isFolder ? item.name : item
      }]
      // // 如果点击的是勾选钮，这执行添加
      // if (e.target.className === 'fa fa-check') {
      //   // 如果已经包含了，这移除
      //   if (this.selectFiles.includes(item)) {
      //     let i, len
      //     for (i = 0, len = this.selectFiles.length; i < len; i++) {
      //       if (this.selectFiles[i] === item) {
      //         break
      //       }
      //     }
      //     this.selectFiles.splice(i, 1)
      //   } else {
      //     this.selectFiles.push(item)
      //   }
      // } else {
      //   this.selectFiles.includes(item) || (this.selectFiles = [item])
      // }
    },
    /**
     * 获取文件是否被选中的class
     */
    getClass(item) {
      let includes = false
      for (let obj of this.selectFiles) {
        if (item.file && obj.name === item.name) {
          includes = true
        } else {
          if (obj.name === item) {
            includes = true
          }
        }
      }
      return includes ? 'file-select' : ''
    },
    /**
     * 面包屑点击
     * @param index
     */
    breadcrumbClick(index) {
      let newPath = this.currentPath.split('/').slice(0, index + 1).join('/')
      this.pushPath(newPath)
    },
    /**
     * 上一步
     */
    preClick() {
      if (this.index === 0) {
        return
      }
      this.changeIndex(this.index - 1)
    },
    /**
     * 下一步
     */
    nextClick() {
      if (this.index === this.path.length - 1) {
        return
      }
      this.changeIndex(this.index + 1)
    },
    /**
     * 文件面板点击事件
     */
    panelMouseDown(e) {
      this.selectFiles = []
      if (e.button === RIGHT_CODE) {
        this.menutype = BLANK_MENU
        this._showMenu(e)
      } else {
        // 设置右键不显示
        this.changeMenuShow({ isShow: false, left: 0, top: 0 })
      }
    },
    _showMenu(e) {
      let x = e.clientX
      let y = e.clientY
      this.changeMenuShow({ isShow: true, left: x, top: y, menuType: this.menutype })
    },
    ...mapMutations({ pushPath: 'PUSH_PATH', changeIndex: 'CHANGE_INDEX', changeMenuShow: 'CHANGE_RIGHT_MENU_SHOW', setSelectFiles: 'SET_SELECT_FILES' })
  },
  components: {
    FileBlock,
    EmptyBlock
  }
}
</script>

<style lang="scss" scoped>
.right-panel {
  width: auto;
  height: 100%;
  .right-header {
    position: relative;
    height: 49px;
    width: 100%;
    min-width: 600px;
    background: #f8f8f8;
    background: #f8f8f8 url('../../../../../assets/image/bg.gif') 0px -2px repeat-x;
    border-bottom: 1px solid #ddd;
    .header-left {
      display: inline-block;
      width: 80px;
      height: 100%;
      padding-left: 10px;
      vertical-align: top;
      &:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
      .btn-group {
        display: inline-block;
        font-size: 0;
        vertical-align: middle;
      }
    }
    .header-address {
      display: inline-block;
      width: 70%;
      height: 100%;
      vertical-align: top;
      &:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
      .btn-home {
        height: 28px;
        margin-right: 2px;
        vertical-align: middle;
        cursor: pointer;
        .font-icon-home {
          display: inline-block;
          background-image: url('../../../../../assets/image/menu_icon.png');
          width: 16px !important;
          background-position: -16px -496px;
          background-size: auto !important;
          background-repeat: no-repeat;
          height: 16px;
          margin-right: 0px;
        }
      }
      .path-container {
        display: inline-block;
        width: 80%;
        height: 28px;
        overflow: hidden;
        border: 1px solid #ddd;
        margin-top: 1px;
        margin-left: -1px;
        box-sizing: border-box;
        box-shadow: #e6e6e6 0px 0px 20px inset;
        background: #f8f8f8;
        background: #f8f8f8 url('../../../../../assets/image/bg.gif') 0px -2px repeat-x;
        vertical-align: middle;
        .el-breadcrumb {
          line-height: 2;
        }
      }
    }
    .search-container {
      position: absolute;
      display: inline-block;
      right: 20px;
      width: 20%;
      height: 100%;
      vertical-align: top;
      &:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
      .el-input {
        vertical-align: middle;
      }
    }
  }
  .file-container {
    position: absolute;
    top: 50px;
    bottom: 0;
    width: 100%;
    overflow: auto;
  }
}

.btn-default {
  display: inline-block;
  padding: 3px 7px;
  border-color: #ddd;
  background: url('../../../../../assets/image/buttons_40.png') 0 0px repeat-x;
  border-radius: 0px;
  font-size: 12px;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-color: #ddd;
  text-shadow: 0 1px 0 #fff;
  .font-icon {
    padding: 0 5px;
    font-size: 2rem;
    color: #bbb;
    line-height: 20px;
    vertical-align: baseline;
    font-family: FontAwesome;
    font-style: normal;
  }
}

.btn-disable {
  box-shadow: inset 0 3px 6px rgba(0, 0, 0, 0.1);
  opacity: 0.5;
  .font-icon {
    opacity: 0.4;
  }
}

.file-select {
  transition: transform 0.2s;
  background: #cce8ff !important;
  border-color: #99d1ff !important;
}
</style>
