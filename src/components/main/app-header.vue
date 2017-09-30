/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <header class="header-container">
    <div class="title-content">
      <i class="fa fa-cloud"></i>
      <span class="title">迅传资源管理平台</span>
    </div>
    <div class="nav-container">
      <span class="nav-item">
        资源管理
      </span>
      <span class="nav-item">
        组织机构
      </span>
      <span class="nav-item">
        人员管理
      </span>
    </div>
    <el-dialog
      :modal="false"
      custom-class="dialog-custom"
      title="提示"
      :visible.sync="dialogVisible"
      size="large"
      :before-close="handleClose">
      <person-manage></person-manage>
    </el-dialog>
  </header>
</template>

<script>
  import Organization from '@/components/main/organization/organization'
  import PersonManage from '@/components/main/person/person-management'

  export default {
    data() {
      return {
        dialogVisible: true
      }
    },
    components: {
      Organization,
      PersonManage
    }
  }
</script>
<style lang="scss">
  .dialog-custom {
    width: 60%;
    height: 70%;
    box-shadow: 0px 0px 20px rgba(0,140,255,0.46);
    border: 1px solid #71b9f3;
    .el-dialog__body {
      padding: 0 !important;
    }
  }
</style>
<style lang="scss" scoped>
  .header-container {
    height: 40px;
    line-height: 40px;
    box-sizing: border-box;
    border-bottom: 1px solid #eee;
    .title-content {
      display: inline-block;
      width: 200px;
      padding-left: 20px;
      vertical-align: top;
      text-align: center;
      .fa-cloud {
        font-size: 2.2rem;
        vertical-align: baseline;
        opacity: 0.6;
      }
      .title {
        font-size: 2rem;
        /*vertical-align: middle;*/
      }
    }
    .nav-container {
      display: inline-block;
      vertical-align: top;
      font-size: 1.6rem;
    }
  }
</style>
