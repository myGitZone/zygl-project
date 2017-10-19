<template>
  <div class="auth-panel">
    <div class="right-header">
      <div class="header-left">
        <span>文件夹：</span>
        <span>{{currentPath}}</span>
      </div>
      <div class="search-container">
        <el-input placeholder="请输入查询条件" size="small" icon="search" v-model="searchVal" :on-icon-click="handleIconClick">
        </el-input>
      </div>
      <div class="header-btn-content">
        <el-button size="small" type="primary" @click="addClick">添 加</el-button>
        <el-button size="small" type="primary" @click="closeClick">关 闭</el-button>
      </div>
    </div>
    <div class="auth-container">
      <auth-block v-for="(item, index) in personInfos" :checked="selectPersonInfo===item" :authInfo="item" :key="index" @itemClick="itemClick" @deleteClick="deleteClick">
      </auth-block>
    </div>
    <div class="auth-content">
      <div class="folder-auth bottom-auth">
        <span class="auth-slect">文件夹权限：</span>
        <span class="auth-slect">
          <el-checkbox-group v-model="folderList" @change="folderCheckChange">
            <el-checkbox label="folderupload">上传</el-checkbox>
            <el-checkbox label="folderdownload">下载</el-checkbox>
            <el-checkbox label="folderdelete">删除</el-checkbox>
            <el-checkbox label="folderrename">重命名</el-checkbox>
            <el-checkbox label="foldercreate">新建文件夹</el-checkbox>
          </el-checkbox-group>
        </span>
        <span class="edit-btn-container">
          <el-button size="small" type="primary" @click="saveClick('folder')" :disabled="!folderEnable">保 存</el-button>
        </span>
      </div>
      <div class="file-auth bottom-auth">
        <span class="auth-slect" style="padding-left:20px">文件权限：</span>
        <span class="auth-slect">
          <el-checkbox-group v-model="fileList" @change="fileCheckChange">
            <el-checkbox label="filedownload">下载</el-checkbox>
            <el-checkbox label="filedelete">删除</el-checkbox>
            <el-checkbox label="filerename">重命名</el-checkbox>
          </el-checkbox-group>
        </span>
        <span class="edit-btn-container">
          <el-button size="small" type="primary" @click="saveClick('file')" :disabled="!fileEnable">保 存</el-button>
        </span>
      </div>
    </div>
    <auth-dialog :currentPersnInfos='personInfos' ref="authDialog" @authSuccess="authSuccess"></auth-dialog>
  </div>
</template>

<script>
import AuthBlock from './auth-block'
import AuthDialog from './auth-dialog'
import { GET_FOLDER_AUTH_INFO, UPDATE_AUTH, DELETE_AUTH_PERSON } from '@/assets/js/const-value'
import { mapGetters, mapMutations } from 'vuex'
const folderAuth = ['folderupload', 'folderdownload', 'folderdelete', 'folderrename', 'foldercreate']
const fileAuth = ['filedownload', 'filedelete', 'filerename']
export default {
  data() {
    return {
      // 条件选择的时候，查询值
      searchVal: null,
      // 文件夹权限的勾选列表
      folderList: [],
      // 文件权限的勾选列表
      fileList: [],
      // 当前文件夹，所有有权限的人员信息
      personInfos: [],
      // 当前选中的人员
      selectPersonInfo: null,
      // 文件夹权限保存按钮是否可用
      folderEnable: false,
      // 文件权限保存按钮是否可用
      fileEnable: false
    }
  },
  computed: {
    ...mapGetters(['currentPath'])
  },
  watch: {
    currentPath() {
      this.init()
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    /**
     * 文件夹权限按钮是否勾选
     */
    folderCheckChange() {
      this.folderEnable = true
    },
    /**
     * 文件权限勾选按钮是否勾选
     */
    fileCheckChange() {
      this.fileEnable = true
    },
    /**
     * 人员选中
     */
    itemClick(item) {
      this.selectPersonInfo = item
      this.changeAuth(item)
      this.fileEnable = false
      this.folderEnable = false
    },
    /**
     * 添加授权成功
     */
    authSuccess() {
      this.init()
    },
    /**
     * 初始化
     */
    init() {
      let params = {
        folder: '/' + this.currentPath
      }
      this.$axios.get(GET_FOLDER_AUTH_INFO, {
        params
      }).then((res) => {
        if (res.data.status) {
          // 这里暂时这么做，以后后台添加了name属性后去掉
          this.personInfos = res.data.data.map((item) => {
            item.name = item.userid
            return item
          })
          this.selectPersonInfo = this.personInfos.length > 0 ? this.personInfos[0] : null
          this.changeAuth(this.selectPersonInfo)
        }
      })
    },
    /**
     * 文件夹权限更新
     */
    saveClick(type) {
      let params = this._getParams()
      this.$axios.post(UPDATE_AUTH, params).then((res) => {
        if (res.data.status) {
          this.$message({
            message: '保存成功！'
          })
          if (type === 'folder') {
            this.folderEnable = false
          } else {
            this.fileEnable = false
          }
          this._updatePersonInfo()
        } else {
          this.$message({
            message: '保存失败！'
          })
        }
      })
    },
    /**
     * 删除用户
     */
    deleteClick(person) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = new URLSearchParams()
        params.append('userId', person.userid)
        params.append('folder', '/' + this.currentPath)
        this.$axios.post(DELETE_AUTH_PERSON, params).then((res) => {
          debugger
          if (res.data.status) {
            for (let i = 0, len = this.personInfos.length; i < len; i++) {
              let item = this.personInfos[i]
              if (item.userid === person.userid) {
                this.personInfos.splice(i, 1)
                break
              }
            }
            this.$message({
              message: '删除完成！'
            })
          } else {
            this.$message({
              message: '删除失败，请刷新后重试！'
            })
          }
        })
      }).catch(() => {
      })
    },
    /**
     * 保存成功之后，更新人员信息
     */
    _updatePersonInfo() {
      for (let item in this.selectPersonInfo) {
        if (folderAuth.includes(item) || fileAuth.includes(item)) {
          if (this.folderList.includes(item) || this.fileList.includes(item)) {
            this.selectPersonInfo[item] = '1'
          } else {
            this.selectPersonInfo[item] = '0'
          }
        }
      }
    },
    /**
     * 获取更新的参数
    */
    _getParams() {
      let params = new URLSearchParams()
      params.append('userId', this.selectPersonInfo.userid)
      params.append('folder', '/' + this.currentPath)
      this.folderList.map((item) => {
        params.append(item, 1)
      })
      this.fileList.map((item) => {
        params.append(item, 1)
      })
      return params
    },
    /**
     * 改变选择的权限
     */
    changeAuth(person) {
      this.folderList = []
      this.fileList = []
      folderAuth.forEach((item) => {
        if (person[item] === '1') {
          this.folderList.push(item)
        }
      })
      fileAuth.forEach((item) => {
        if (person[item] === '1') {
          this.fileList.push(item)
        }
      })
    },
    handleIconClick() { },
    /**
     * 关闭按钮点击事件
     */
    closeClick() {
      this.changeAuthShow(false)
    },
    /**
     * 添加按钮点击事件
     */
    addClick() {
      this.$refs.authDialog.show()
    },
    ...mapMutations({ changeAuthShow: 'CHANGE_AUTH_SHOW' })
  },
  components: {
    AuthBlock,
    AuthDialog
  }
}
</script>

<style lang="scss"  scoped>
.auth-panel {
  width: auto;
  height: 100%;
  .right-header {
    position: relative;
    height: 49px;
    width: 100%;
    min-width: 600px;
    background: #f8f8f8;
    background: #f8f8f8 url("../../../../../assets/image/bg.gif") 0px -2px repeat-x;
    border-bottom: 1px solid #ddd;
    .header-left {
      display: inline-block;
      height: 100%;
      padding-left: 10px;
      font-size: 16px;
      color: #736f6f;
      vertical-align: top;
      &:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
    }
    .search-container {
      position: absolute;
      display: inline-block;
      right: 200px;
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
    .header-btn-content {
      position: absolute;
      display: inline-block;
      right: 30px;
      height: 100%;
      vertical-align: top;
      &:before {
        content: '';
        display: inline-block;
        height: 100%;
        vertical-align: middle;
      }
      .el-button {
        vertical-align: middle;
      }
    }
  }
  .auth-container {
    position: absolute;
    top: 50px;
    bottom: 122px;
    width: 100%;
    overflow: auto;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
  }
  .auth-content {
    position: absolute;
    height: 122px;
    bottom: 0;
    width: 100%;
    overflow: auto;
    box-sizing: border-box;
    .bottom-auth {
      position: relative;
      height: 60px;
      font-size: 16px;
      line-height: 60px;
      border-bottom: 1px solid #eee;
      .auth-slect {
        padding-left: 20px;
        display: inline-block
      }
      .edit-btn-container {
        position: absolute;
        right: 30px
      }
    }
    .btn-content {
      height: 58x;
      font-size: 16px;
      line-height: 58px;
      text-align: right;
      padding-right: 30px;
    }
  }
}
</style>