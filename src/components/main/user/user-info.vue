<template>
  <el-dialog :close-on-click-modal="false" :modal="false" custom-class="dialog-custom-shadow" title="个人中心" :visible.sync="showUserInfo" size="tiny">
    <el-tabs v-model="activeName">
      <el-tab-pane label="个人信息" name="first">
        <el-form ref="form" :rules="rules" :model="cloneUserInfo" label-width="120px">
          <el-form-item label="姓名：">
            <div>{{cloneUserInfo.nickname}}</div>
          </el-form-item>
          <el-form-item label="部门：">
            <div>{{getOrgNameByCode(cloneUserInfo.orgid)}}</div>
          </el-form-item>
          <el-form-item label="用户名：">
            <div>{{cloneUserInfo.username}}</div>
          </el-form-item>
          <el-form-item label="电话：">
            <div class="input-content">
              <el-input v-model="cloneUserInfo.mobilephone" size="small"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="邮箱：">
            <div class="input-content">
              <el-input v-model="cloneUserInfo.email" size="small"></el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="second">
        <el-form v-if="activeName==='second'" ref="form" :rules="rules" :model="cloneUserInfo" label-width="120px">
          <el-form-item prop="password" label="当前密码：">
            <div class="input-content">
              <el-input type="password" v-model="cloneUserInfo.password" size="small"></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="newpassword" label="新密码：">
            <div class="input-content">
              <el-input type="password" v-model="cloneUserInfo.newpassword" size="small"></el-input>
            </div>
          </el-form-item>
          <el-form-item prop="newpasswordEx" label="确认新密码：">
            <div class="input-content">
              <el-input type="password" v-model="cloneUserInfo.newpasswordEx" size="small"></el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="okClick" size="small">保 存</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { UPDATE_USER, GET_CURRENT_USERINFO } from '@/assets/js/const-value'
export default {
  data() {
    /**
  * 检查当前密码是否输入正确
  */
    var checkCurrentPasswod = (rule, value, callback) => {
      if (value !== this.userinfo.password) {
        callback(new Error('密码不正确，请重新输入'))
      } else {
        callback()
      }
    }
    /**
    * 检查两次密码是否输入相同
    */
    var checkNewPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.cloneUserInfo.newpassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      showUserInfo: false,
      activeName: 'first',
      editPassword: false,
      rules: {
        password: [
          { required: true, message: '请输当前入密码', trigger: 'blur' },
          { validator: checkCurrentPasswod, trigger: 'blur' }
        ],
        newpassword: [
          { required: true, message: '请输新入密码', trigger: 'blur' }
        ],
        newpasswordEx: [
          { required: true, message: '请输新入密码', trigger: 'blur' },
          { validator: checkNewPassword, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    cloneUserInfo() {
      let user = this.showUserInfo && this.userinfo ? JSON.parse(JSON.stringify(this.userinfo)) : {
        nickname: '',
        orgid: '',
        username: '',
        mobilephone: '',
        email: ''
      }
      user.password = ''
      user.newpassword = ''
      user.newpasswordEx = ''
      return user
    },
    ...mapGetters(['userinfo', 'orgDatas'])
  },
  methods: {
    show() {
      this.showUserInfo = true
      this.activeName = 'first'
    },
    editPasswordClick() {
      this.editPassword = true
    },
    /**
   * 根据code获取组织机构的名称
   */
    getOrgNameByCode(code) {
      return code && this.orgDatas[code] ? this.orgDatas[code].orgname : ''
    },
    /**
     * 确定按钮点击事件
     */
    okClick() {
      this.$refs.form.validate((valid) => {
        let isUpdate = this._checkUpdate()
        if (valid && isUpdate) {
          let params = new URLSearchParams()
          if (this.activeName === 'second') {
            params.append('passWord', this.cloneUserInfo.newpassword)
          } else {
            params.append('passWord', this.userinfo.password)
          }
          params.append('mobilePhone', this.cloneUserInfo.mobilephone)
          params.append('email', this.cloneUserInfo.email)
          params.append('nickName', this.cloneUserInfo.nickname)
          params.append('orgId', this.cloneUserInfo.orgid)
          params.append('userName', this.cloneUserInfo.username)
          this.$axios.post(UPDATE_USER, params).then((res) => {
            if (res.data.status) {
              this.$axios.get(GET_CURRENT_USERINFO).then((res) => {
                this.setUserInfo(res.data.data)
              })
              this.$message({
                message: '修改完成！'
              })
            } else {
              this.$message({
                message: '更新失败，请刷新后重试'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    _checkUpdate() {
      if (this.cloneUserInfo.mobilephone !== this.userinfo.mobilephone) {
        return true
      } else if (this.cloneUserInfo.email !== this.userinfo.email) {
        return true
      } else if (this.cloneUserInfo.newpassword) {
        return true
      } else {
        return false
      }
    },
    ...mapMutations({ setUserInfo: 'SET_USERINFO' })
  }
}
</script>

<style lang="scss" scoped>
.input-content {
  width: 50%;
}
</style>