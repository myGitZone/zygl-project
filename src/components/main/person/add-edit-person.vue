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
            <el-input v-model="nickName" size="small"></el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col class="text-right" :span="6">
            <label>部门：</label>
          </el-col>
          <el-col :span="18">
            <el-cascader v-model="orgId" size="small"></el-cascader>
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
            <el-input v-model="userName" size="small"></el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col class="text-right" :span="6">
            <label>密码：</label>
          </el-col>
          <el-col :span="18">
            <el-input v-model="passWord" size="small"></el-input>
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
            <el-input v-model="email" size="small"></el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <el-col class="text-right" :span="6">
            <label>电话：</label>
          </el-col>
          <el-col :span="18">
            <el-input v-model="mobilePhone" size="small"></el-input>
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
  export default {
    data() {
      return {
        nickName: '',
        orgId: '',
        userName: '',
        passWord: '',
        email: '',
        mobilePhone: ''
      }
    },
    methods: {
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
        let params = {
          nickName: this.nickName,
          orgId: this.orgId,
          userName: this.userName,
          passWord: this.passWord,
          email: this.email,
          mobilePhone: this.mobilePhone
        }
        debugger
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
