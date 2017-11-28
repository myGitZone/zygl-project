<template>
  <div ref="searchContent" class="search-container">
    <div class="header">
      搜索
      <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="closeClick">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </button>
    </div>
    <div class="content">
      <el-row>
        <el-col :span=14 style="padding:0 10px 0 0">
          <el-input size="small" placeholder="请输入路径" v-model="pathValue">
            <template slot="prepend">路径：</template>
          </el-input>
        </el-col>
         <el-col :span=10 style="padding:0 0 0 10px">
          <el-input size="small" placeholder="请输入搜索关键字" v-model="searchValue">
            <el-button slot="append" icon="search" @click="searchClick"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <div class="list-content">
        <div class="list-header">{{result}}</div>
        <ul class="list-result">
          <li class="list-item" v-for="item in resultList" :key="item.id">
            <list-item :fileInfo="item"></list-item>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ListItem from './list-item'
import Draggabilly from 'draggabilly'
import { mapGetters, mapMutations } from 'vuex'
import { generateUUID } from '@/assets/js/util'
export default {
  data() {
    return {
      // 路径
      pathValue: null,
      // 查找关键字
      searchValue: null,
      // 结果的提示 ，如：未查到结果，  1个文件，2个文件夹等
      result: '',
      // 查到的文件夹
      folders: [],
      // 查到的文件
      files: []
    }
  },
  computed: {
    resultList() {
      return [...this.folders, ...this.files]
    },
    ...mapGetters(['treeData', 'currentPath'])
  },
  mounted() {
    this.pathValue = this.currentPath
    this.$nextTick(() => {
      /* eslint-disable no-new */
      new Draggabilly(this.$refs.searchContent, {
        handle: '.header'
      })
    })
  },
  methods: {
    /**
      * 点击事件
      */
    closeClick() {
      this.changeShow(false)
    },
    searchClick() {
      this.files = []
      this.folders = []
      let paths = []
      if (this.pathValue) {
        paths.push(...this.pathValue.split('/'))
      }
      let rootPath = this.treeData[0]
      let searchPath = rootPath
      for (let i = 0, len = paths.length; i < len; i++) {
        let path = paths[i]
        let tempInfo = this._getFolderInfoByName(searchPath, path)
        if (tempInfo) {
          searchPath = tempInfo
        } else {
          break
        }
      }
      this._getSearchInfo(searchPath, this.searchValue, this.pathValue)
    },
    _getFolderInfoByName(rootPath, name) {
      if (rootPath.name === name) {
        return rootPath
      }
      let folderInfo = null
      for (let i = 0, len = rootPath.folder.length; i < len; i++) {
        let item = rootPath.folder[i]
        if (item.name === name) {
          folderInfo = item
          break
        }
      }
      return folderInfo
    },
    _getSearchInfo(path, name, currentFolderPath) {
      if (path.file) {
        for (let i = 0, len = path.file.length; i < len; i++) {
          let file = path.file[i]
          if (file.includes(name) || file.includes(name.toLocaleLowerCase()) || file.includes(name.toLocaleUpperCase())) {
            this.files.push({ id: generateUUID(), folder: path, value: file, path: currentFolderPath })
          }
        }
      }
      if (path.folder) {
        for (let i = 0, len = path.folder.length; i < len; i++) {
          let folder = path.folder[i]
          if (folder.name.includes(name) || folder.name.includes(name.toLocaleLowerCase()) || folder.name.includes(name.toLocaleUpperCase())) {
            this.folders.push({ id: generateUUID(), folder: path, value: folder, path: currentFolderPath })
          }
          if (folder.folder) {
            let folderPath = currentFolderPath + '/' + folder.name
            this._getSearchInfo(folder, name, folderPath)
          }
        }
      }
    },
    ...mapMutations({
      changeShow: 'CHANGE_SEARCH_DIALOG_SHOW'
    })
  },
  components: {
    ListItem
  }
}
</script>
<style lang="scss">
.upload-content .el-upload-list {
  overflow: auto;
  height: 210px;
}
</style>

<style lang="scss" scoped>
.search-container {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  margin-top: -300px;
  height: 600px;
  width: 500px;
  box-shadow: 0px 0px 20px rgba(0, 140, 255, 0.46);
  border: 1px solid #71b9f3;
  background: #fff;
  border-radius: 2px;
  font-size: 13px;
  z-index: 101;
  .header {
    position: absolute;
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 700;
    color: #1f2d3d;
  }
  .content {
    position: absolute;
    top: 40px;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    .list-content {
      margin-top: 10px;
      height: 490px;
      border-radius: 3px;
      border: 1px solid #bfcbd9;
      .list-header {
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 13px;
        color: #3196e6;
        background-image: -webkit-linear-gradient(top, #fff, #def);
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }
      .list-result {
        height: 460px;
        margin: 0px;
        padding: 0;
        overflow: auto;
        list-style: none;
        .list-item {
          position: relative;
          height: 30px;
          line-height: 30px;
          margin: 5px 10px;
        }
      }
    }
  }
}
</style>