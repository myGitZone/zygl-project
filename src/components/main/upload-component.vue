<template>
  <div ref="uploadContent" class="upload-container">
    <div class="header">
      文件上传
      <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click="closeClick">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </button>
    </div>
    <div class="content">
      <el-upload class="upload-content" :data='bodyData' ref="upload" :on-success="success" :on-error="error" :action="action" multiple :auto-upload="false" name="upfile" :headers="headers">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { JWT_TOKEN, UPLOAD_URL } from '@/assets/js/const-value' // BLANK_MENU
import { mapGetters, mapMutations } from 'vuex'
import Draggabilly from 'draggabilly'
export default {
  data() {
    return {
      action: UPLOAD_URL,
      bodyData: null
    }
  },
  computed: {
    headers() {
      return { 'authorization': Cookies.get(JWT_TOKEN) }
    },
    bodyData() {
      return {
        folderPath: this.path
      }
    },
    // bodyData() {
    //   debugger
    //   // let currentPath
    //   // debugger
    //   // if (this.menuType === LEFT_TREE_MENU && this.leftSelect) {
    //   //   // 获取选择的目录
    //   //   let node = this.leftSelect
    //   //   let path = [node.data.name]
    //   //   // 遍历拼接路径
    //   //   while (node.parent && node.parent.data.id !== 1) {
    //   //     path.push(node.parent.data.name)
    //   //     node = node.parent
    //   //   }
    //   //   currentPath = path.reverse().join('/')
    //   // } else {
    //   //   currentPath = this.currentPath
    //   // }
    //   return {
    //     folderPath: this.currentPath
    //   }
    // },
    ...mapGetters(['currentPath', 'menuType', 'fileList'])
  },
  mounted() {
    let menuType = this.menuType
    this.$nextTick(() => {
      /* eslint-disable no-new */
      new Draggabilly(this.$refs.uploadContent, {
        handle: '.header'
      })
      this.path = menuType === 3 ? this.currentPath + '/' + this.fileList[0].name : this.currentPath
      this.bodyData = {
        folderPath: this.path
      }
    })
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    closeClick() {
      this.setUploadState(false)
    },
    success(res, file, files) {
      if (!res.isOverwrite) {
        this.updateTree({
          path: this.path,
          files: [file.name]
        })
      }
    },
    error(res, file, files) {
      this.$message({
        message: `${file.name} 上传失败，确定文件是否已存在，请刷新后再试！`
      })
    },
    ...mapMutations({ updateTree: 'UPDATE_TREE', setUploadState: 'SET_UPLOAD_STATE' })
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
.upload-container {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -250px;
  margin-top: -150px;
  height: 300px;
  width: 500px;
  box-shadow: 0px 0px 20px rgba(0, 140, 255, 0.46);
  border: 1px solid #71b9f3;
  background: #fff;
  border-radius: 2px;
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
    .el-checkbox {
      margin-left: 140px;
    }
    .file-content {
      height: 200px;
    }
    .btn-content {
      height: 60px;
      line-height: 60px;
      text-align: right;
      margin-right: 10px;
    }
  }
}
</style>