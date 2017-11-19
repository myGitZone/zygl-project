/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="add-edit-content">
    <!--姓名-部门-->
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col class="text-right" :span="6">
            <label>姓名：</label>
          </el-col>
          <el-col :span="18">
            <el-input placeholder="请输入姓名" v-model="nickName" size="small"></el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col class="text-right" :span="6">
            <label>部门：</label>
          </el-col>
          <el-col :span="18">
            <el-cascader change-on-select :props="defaultProps" :options="elCascaderOptions" v-model="orgId" size="small"></el-cascader>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--帐号-密码-->
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col class="text-right" :span="6">
            <label>帐号：</label>
          </el-col>
          <el-col :span="18">
            <el-input placeholder="请输入帐号" v-model="userName" size="small"></el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col class="text-right" :span="6">
            <label>密码：</label>
          </el-col>
          <el-col :span="18">
            <el-input placeholder="请输入请输入密码" v-model="passWord" size="small"></el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!--邮箱-电话-->
    <el-row>
      <el-col :span="12">
        <el-row>
          <el-col class="text-right" :span="6">
            <label>邮箱：</label>
          </el-col>
          <el-col :span="18">
            <el-input placeholder="请输入邮箱" v-model="email" size="small"></el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col class="text-right" :span="6">
            <label>电话：</label>
          </el-col>
          <el-col :span="18">
            <el-input placeholder="请输入电话" v-model="mobilePhone" size="small"></el-input>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <div class="dialog-footer">
      <el-button size="small" @click="cancelClick">取 消</el-button>
      <el-button size="small" type="primary" @click="saveClick">保 存</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    userInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      nickName: '',
      orgId: [],
      userName: '',
      passWord: '',
      email: '',
      mobilePhone: '',
      defaultProps: {
        children: 'children',
        label: 'orgname',
        value: 'id'
      },
      elCascaderOptions: []
    }
  },
  computed: {
    ...mapGetters(['orgDatas'])
  },
  mounted() {
    this.$nextTick(() => {
      this.elCascaderOptions = this.orgDatas.rootNode.children
      this.initData()
    })
  },
  methods: {
    /**
     * 初始化数据
     */
    initData() {
      if (this.userInfo) {
        // 姓名
        this.nickName = this.userInfo.nickname ? this.userInfo.nickname : ''
        let orgId = this.userInfo.orgid
        // 组织机构
        if (orgId) {
          this.orgId.push(+orgId)
          let org = this.orgDatas[orgId]
          while (org && org.orgpid) {
            this.orgId.push(+org.orgpid)
            org = this.orgDatas[org.orgid]
          }
        }
        this.orgId.reverse()
        // 用户名
        this.userName = this.userInfo.username ? this.userInfo.username : ''
        // 密码
        this.passWord = this.userInfo.password ? this.userInfo.password : ''
        // 邮箱
        this.email = this.userInfo.email ? this.userInfo.email : ''
        // 手机
        this.mobilePhone = this.userInfo.mobilephone ? this.userInfo.mobilephone : ''
      }
    },
    /**
     * 取消按钮点击
     */
    cancelClick() {
      this.$emit('cancelClick')
    },
    /**
     * 保存按钮点击事件
     */
    saveClick() {
      debugger
      let params = {
        nickName: this.nickName,
        orgId: this.orgId,
        userName: this.userName,
        passWord: this.passWord,
        email: this.email,
        mobilePhone: this.mobilePhone
      }
      this.$emit('saveClick', params)
    }
  }
}
</script>

<style lang="scss" scoped>
.add-edit-content {
  .el-row {
    padding: 0 10px;
  }
  .text-right {
    text-align: right;
  }
  .el-cascader {
    width: 100%;
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>
