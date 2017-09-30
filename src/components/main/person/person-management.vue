/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="person-content">
    <el-row>
      <el-col class="query-label" :span="2">
        <label>姓 名：</label>
      </el-col>
      <el-col :span="4">
        <el-input size="small"></el-input>
      </el-col>
      <el-col class="query-label" :span="2">
        <label>部 门：</label>
      </el-col>
      <el-col :span="4">
        <el-cascader size="small"></el-cascader>
      </el-col>
      <el-col class="query-label" :span="2">
        <el-button size="small" type="primary">查 询</el-button>
      </el-col>
    </el-row>
    <el-row ref="table" class="table-content">
      <el-table
        :data="tableData"
        border
        :height="tableHeight"
        highlight-current-row
        style="width: 100%">
        <el-table-column
          prop="nickname"
          label="姓名"
          width="100">
        </el-table-column>
        <el-table-column
          prop="orgid"
          label="部门">
        </el-table-column>
        <el-table-column
          prop="username"
          label="帐号">
        </el-table-column>
        <el-table-column
          prop="password"
          label="密码">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          prop="mobilephone"
          label="电话">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage2"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="sizes, prev, pager, next"
        :total="1000">
      </el-pagination>
    </el-row>
    <div class="btn-content">
      <el-button size="small" type="primary" @click="addClick">添 加</el-button>
      <el-button size="small" type="primary">编 辑</el-button>
      <el-button size="small" type="primary">删 除</el-button>
    </div>
    <el-dialog
      :modal="false"
      custom-class="dialog-custom-add-edit"
      title="提示"
      :visible.sync="showDialog"
      size="small"
      :before-close="handleClose">
      <add-editPerson @cancelClick="cancelClick" @saveClick="saveClick"></add-editPerson>
    </el-dialog>
  </div>
</template>

<script>
  import AddEditPerson from './add-edit-person'
  import {SIGUP_URL} from '@/assets/js/const-value'

  export default {
    data() {
      return {
        tableHeight: 0,
        showDialog: false,
        tableData: []
      }
    },
    mounted() {
      this.$nextTick(() => {
        debugger
        this.tableHeight = this.$refs.table.$el.clientHeight
      })
    },
    methods: {
      /**
       * 添加按钮点击事件
       */
      addClick() {
        this.showDialog = true
      },
      /**
       * 取消按钮点击事件
       */
      cancelClick() {
        this.showDialog = false
      },
      /**
       * 保存按钮点击事件
       */
      saveClick(obj) {
        let params = new URLSearchParams()
        debugger
        params.set('nickName', obj.nickName)
        params.set('orgId', obj.orgId)
        params.set('userName', obj.userName)
        params.set('passWord', obj.passWord)
        params.set('email', obj.email)
        params.set('mobilePhone', obj.mobilePhone)
        this.$axios.post(SIGUP_URL, params).then((res) => {
          if (res.data.status) {
          } else {
          }
        })
        this.showDialog = false
      }
    },
    components: {
      AddEditPerson
    }
  }
</script>
<style lang="scss">
  .dialog-custom-add-edit {
    box-shadow: 0px 0px 20px rgba(0, 140, 255, 0.46);
    border: 1px solid #71b9f3;
    .el-dialog__body {
      padding: 0 !important;
    }
  }
</style>
<style lang="scss" scoped>
  .person-content {
    .query-label {
      text-align: right;
    }
    .table-content {
      position: absolute;
      top: 100px;
      bottom: 60px;
      padding: 10px;
      width: 100%;
      box-sizing: border-box;
      .el-pagination {
        padding: 10px 0 0 0;
      }
    }
    .btn-content {
      position: absolute;
      right: 10px;
      bottom: 5px;
    }
  }
</style>
