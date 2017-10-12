<template>
  <div class="upload-container">
    <div class="header">
      文件上传
      <button type="button" aria-label="Close" class="el-dialog__headerbtn">
        <i class="el-dialog__close el-icon el-icon-close"></i>
      </button>
    </div>
    <div class="content">
      <!-- <div class="file-content"></div>
                              <div class="btn-content">
                                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                              </div> -->
      <el-upload class="upload-content" ref="upload" :action="action" :on-preview="handlePreview" :on-remove="handleRemove" multiple :file-list="fileList" :auto-upload="true" 
      name="upfile" :headers="headers">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-upload>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import { JWT_TOKEN } from '@/assets/js/const-value'
export default {
  data() {
    return {
      fileList: []
    }
  },
  computed: {
    action() {
      return `/api/cloud/uploadFile`
    },
    headers() {
      return {'authorization': Cookies.get(JWT_TOKEN)}
    }
  }
}
</script>
<style lang="scss">
.upload-content .el-upload-list {
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