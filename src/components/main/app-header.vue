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
    <div class="nav-container" v-if="userinfo&&(userinfo.admin === '1'||userinfo.admin === 1)">
      <span class="nav-item" @click="itemClick(1)">
        组织机构
      </span>
      <span class="nav-item" @click="itemClick(2)">
        人员管理
      </span>
    </div>
    <div class="nav-container right-nav" v-if="userinfo">
      <el-menu class="el-menu-user" mode="horizontal" @select="handleSelect">
        <el-submenu index="1">
          <template slot="title">{{userinfo.nickname}}</template>
          <el-menu-item index="1-1">个人中心</el-menu-item>
          <el-menu-item index="1-2">退出</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <el-dialog :close-on-click-modal="false" :modal="false" custom-class="dialog-custom dialog-custom-shadow" :title="title" :visible.sync="dialogVisible" size="large">
      <organization v-if="showDialogIndex===1"></organization>
      <person-manage v-if="showDialogIndex===2" @close="closeClick"></person-manage>
    </el-dialog>
    <user-info ref='userinfo'></user-info>
  </header>
</template>

<script>
import Organization from '@/components/main/organization/organization'
import PersonManage from '@/components/main/person/person-management'
import { mapGetters } from 'vuex'
import UserInfo from './user/user-info'
export default {
  data() {
    return {
      dialogVisible: false,
      showDialogIndex: 0
    }
  },
  computed: {
    title() {
      return this.showDialogIndex === 1 ? '组织机构' : '人员管理'
    },
    ...mapGetters(['userinfo'])
  },
  methods: {
    /**
      切换点击事件
     **/
    itemClick(type) {
      if (type === 0) {
        this.dialogVisible = false
      } else {
        this.dialogVisible = true
      }
      this.showDialogIndex = type
    },
    /**
      dialog关闭事件
    */
    handleClose() {
      alert(12345)
      this.showDialogIndex = 0
    },
    /**
     * 上传弹框关闭
     */
    closeClick() {
      this.setUploadState(false)
    },
    /**
     * 菜单选择
     */
    handleSelect(index) {
      if (index === '1-1') {
        this.$refs.userinfo.show()
      } else {
        this.$router.push('/login')
      }
    }
  },
  components: {
    Organization,
    PersonManage,
    UserInfo
  }
}
</script>
<style lang="scss">
.dialog-custom {
  width: 60%;
  height: 70%;
  .el-dialog__body {
    padding: 0 !important;
  }
}

.dialog-custom-shadow {
  box-shadow: 0px 0px 20px rgba(0, 140, 255, 0.46);
  border: 1px solid #71b9f3;
}

.right-nav {
  position: absolute;
  right: 20px;
  .el-menu {
    background-color: inherit;
    .el-submenu {
      .el-submenu__title {
        height: 40px;
        line-height: 40px;
        border-bottom: 5px solid transparent !important;
      }
      ul {
        top: 42px !important;
      }
    }
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
    margin-left: 40px;
    .nav-item {
      display: inline-block;
      padding: 0 5px;
      background: rgba(255, 255, 255, 0.3);
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
