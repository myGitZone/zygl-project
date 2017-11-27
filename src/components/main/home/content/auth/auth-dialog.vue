<template>
  <el-dialog :close-on-click-modal="false" :modal="false" title="授权" custom-class="dialog-custom-auth dialog-custom-shadow" :visible.sync="dialogVisible" size="small">
    <div class="dialog-content">
      <el-transfer filterable :titles="titles" :filter-method="filterMethod" filter-placeholder="请输入姓名" v-model="selectPersons" :data="transferData">
      </el-transfer>
      <div class="folder-title title-common">
        文件夹权限
      </div>
      <div class="folder-auth">
        <el-checkbox-group v-model="folderList">
          <el-checkbox label="folderupload">上传</el-checkbox>
          <el-checkbox label="folderdownload">下载</el-checkbox>
          <el-checkbox label="folderdelete">删除</el-checkbox>
          <el-checkbox label="folderrename">重命名</el-checkbox>
          <el-checkbox label="foldercreate">新建文件夹</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="file-title title-common">
        文件权限
      </div>
      <div class="file-auth">
        <el-checkbox-group v-model="fileList">
          <el-checkbox label="filedownload">下载</el-checkbox>
          <el-checkbox label="filedelete">删除</el-checkbox>
          <el-checkbox label="filerename">重命名</el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="inherit-content">
        <el-checkbox v-model="inheritCheck">子目录继承该权限</el-checkbox>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false" size="small">取 消</el-button>
      <el-button type="primary" @click="saveClick" size="small">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { GET_USER_BY_OPTS, ADD_AUTH_PERSON } from '@/assets/js/const-value'
import { mapGetters } from 'vuex'
export default {
  props: {
    currentPersnInfos: {
      type: Array
    }
  },
  data() {
    return {
      dialogVisible: false,
      selectPersons: [],
      transferData: [],
      folderList: [],
      fileList: [],
      titles: ['所有人员', '授权人员'],
      inheritCheck: true
    }
  },
  computed: {
    ...mapGetters(['orgDatas', 'currentPath'])
  },
  methods: {
    /**
     * 控制弹框的显示
     */
    show() {
      this.selectPersons = []
      this.transferData = []
      this.folderList = []
      this.fileList = []
      this.nheritCheck = true
      this.getPersonInfo()
      this.dialogVisible = true
    },
    /**
     * 保存
     */
    saveClick() {
      this.selectPersons.forEach((item) => {
        let params = this._getParams(item)
        this.$axios.post(ADD_AUTH_PERSON, params).then((res) => {
          if (res.data.status) {
            this.$message({
              message: '授权完成！'
            })
            this.$emit('authSuccess')
            this.dialogVisible = false
          } else {
            this.$message({
              message: '授权失败！'
            })
          }
        })
      })
    },
    /**
     * 获取所有人员的基本信息
     */
    getPersonInfo() {
      this.$axios.get(GET_USER_BY_OPTS).then((res) => {
        res.data.data.forEach((item) => {
          let nickname = item.nickname
          let orgid = item.orgid
          let label = nickname
          if (orgid) {
            let org = this.orgDatas[orgid]
            if (org) {
              label = `${label}(${org.orgname})`
            }
          }
          if (this._canPush(item)) {
            this.transferData.push({
              key: item.userid,
              label: label,
              info: item
            })
          }
        })
      })
    },
    /**
     * 获取更新的参数
    */
    _getParams(personInfo) {
      let params = new URLSearchParams()
      params.append('userId', personInfo)
      params.append('folder', '/' + this.currentPath)
      params.append('subinherit', this.inheritCheck ? '1' : '0')
      this.folderList.map((item) => {
        params.append(item, 1)
      })
      this.fileList.map((item) => {
        params.append(item, 1)
      })
      return params
    },
    /**
     * 初始化的时候，是否可以展示
     */
    _canPush(personInfo) {
      let result = true
      for (let i = 0, len = this.currentPersnInfos.length; i < len; i++) {
        let item = this.currentPersnInfos[i]
        if (item.userid === personInfo.userid) {
          result = false
          break
        }
      }
      return result
    },
    /**
     * 过滤选择
     */
    filterMethod(query, item) {
      return item.label.indexOf(query.toLocaleLowerCase()) > -1
    }
  }
}
</script>
<style lang="scss">
.dialog-custom-auth {
  position: fixed !important;
  top: 5% !important;
  width: 500px !important;
  .el-transfer-panel__body {
    height: 180px !important;
  }
  .el-transfer-panel__list.is-filterable {
    height: 145px !important;
  }
}
</style>

<style lang="scss" scoped>
.dialog-content {
  padding: 30px 20px;
}
.title-common {
  margin: 10px 0;
  font-size: 16px;
  font-weight: 700;
}

.inherit-content {
  position: absolute;
  bottom: 20px;
}
</style>