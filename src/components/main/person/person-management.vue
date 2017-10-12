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
        <el-input placeholder="请输入姓名" v-model="usernickname" size="small"></el-input>
      </el-col>
      <el-col class="query-label" :span="2">
        <label>部 门：</label>
      </el-col>
      <el-col :span="4">
        <el-cascader change-on-select v-model="selected" style="line-height: 40px" :props="defaultProps" :options="elCascaderOptions" size="small"></el-cascader>
      </el-col>
      <el-col class="query-label" :span="4">
        <el-button size="small" type="primary" @click="queryClick">查 询</el-button>
        <el-button size="small" type="primary" @click="resetClick">重 置</el-button>
      </el-col>
    </el-row>
    <el-row ref="table" class="table-content">
      <el-table :data="showTableData" border :height="tableHeight" highlight-current-row style="width: 100%" @current-change="currentSelectRowChange">
        <el-table-column prop="nickname" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="orgid" label="部门">
          <template scope="scope">
            {{getOrgNameByCode(scope.row.orgid)}}
          </template>
        </el-table-column>
        <el-table-column prop="username" label="帐号">
        </el-table-column>
        <el-table-column prop="password" label="密码">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobilephone" label="电话">
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="sizes, prev, pager, next, total" :total="total">
      </el-pagination>
    </el-row>
    <div class="btn-content">
      <el-button size="small" type="primary" @click="addClick">添 加</el-button>
      <el-button size="small" type="primary" @click="editClick">编 辑</el-button>
      <el-button size="small" type="primary" @click="deleteClick">删 除</el-button>
    </div>
    <el-dialog :modal="false" custom-class="dialog-custom-add-edit" title="提示" :visible.sync="showDialog" size="small">
      <add-editPerson @cancelClick="cancelClick" @saveClick="saveClick" :userInfo="userInfo" v-if="showDialog"></add-editPerson>
    </el-dialog>
  </div>
</template>

<script>
import AddEditPerson from './add-edit-person'
import { SIGUP_URL, GET_USER_BY_OPTS, UPDATE_USER, DELETE_USER } from '@/assets/js/const-value'
import { mapGetters } from 'vuex'
const TYPE_EDIT = 'EDIT'
const TYPE_ADD = 'ADD'
export default {
  data() {
    return {
      tableHeight: 0,  // 表格的高度
      showDialog: false, // 是否展示添加编辑的弹框
      tableData: [], // 表格展示的数据
      currentPage: 0, // 分页组件当前页
      selected: [], // 组织机构的选择
      defaultProps: {
        children: 'children',
        label: 'orgname',
        value: 'id'
      },
      elCascaderOptions: [], // 组织机构级联选择的
      pageSize: 10, // 分页组件的控制每页展示的数据个数
      total: 0,  // 数据总数
      usernickname: '', // 用户的别名
      userInfo: null  // 用户点击编辑的时候，给该属性赋值，值为表中选中的值。如果是添加，则部赋值
    }
  },
  computed: {
    showTableData() {
      let startIndex = (this.currentPage - 1) * this.pageSize
      return this.tableData ? this.tableData.slice(startIndex, startIndex + this.pageSize) : []
    },
    ...mapGetters(['orgDatas'])
  },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = this.$refs.table.$el.clientHeight
      this.elCascaderOptions = this.orgDatas.rootNode.children
      this.getUserInfo()
    })
  },
  methods: {
    /**
     * 表格选择变化
     */
    currentSelectRowChange(row) {
      this.currentSelectRow = row
    },
    /**
     * 重置按钮点击
     */
    resetClick() {
      this.usernickname = ''
      this.selected = []
      this.getUserInfo()
    },
    /**
     * 查询按钮点击事件
     */
    queryClick() {
      this.getUserInfo()
    },
    /**
      获取用户信息
     */
    getUserInfo() {
      let orgid = this.selected.length > 0 ? this.selected[this.selected.length - 1] : ''
      let params = {
        nickname: this.usernickname,
        orgid: orgid
      }
      this.$axios.get(GET_USER_BY_OPTS, {
        params
      }).then((res) => {
        if (res.data.status) {
          this.tableData = res.data.data
          this.total = this.tableData.length
        }
      })
    },
    /**
     * 添加按钮点击事件
     */
    addClick() {
      this.type = TYPE_ADD
      this.userInfo = null
      this.showDialog = true
    },
    /**
     * 编辑按钮点击
     */
    editClick() {
      this.type = TYPE_EDIT
      if (this.currentSelectRow) {
        this.userInfo = this.currentSelectRow
        this.$nextTick(() => {
          this.showDialog = true
        })
      } else {
        this.$message({
          message: '请选择要编辑的人员！'
        })
      }
    },
    /**
     * 删除用户
     */
    deleteClick() {
      if (this.currentSelectRow) {
        this.$alert('确定要执行删除操作吗？', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            if (action === 'confirm') {
              let params = new URLSearchParams()
              params.append('id', this.currentSelectRow.id)
              this.$axios.post(DELETE_USER, params).then((res) => {
                if (res.data.status) {
                  this.getUserInfo()
                } else {
                  this.$message({
                    message: '删除失败'
                  })
                }
              })
            }
          }
        })
      } else {
        this.$message({
          message: '请选择要编辑的人员！'
        })
      }
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
      params.set('nickName', obj.nickName)
      params.set('orgId', obj.orgId.length > 0 ? obj.orgId[obj.orgId.length - 1] : '')
      params.set('userName', obj.userName)
      params.set('passWord', obj.passWord)
      params.set('email', obj.email)
      params.set('mobilePhone', obj.mobilePhone)
      if (this.type === TYPE_ADD) {
        this.$axios.post(SIGUP_URL, params).then((res) => {
          if (res.data.status) {
            this.getUserInfo()
          } else {
            this.$message({
              message: '保存失败！'
            })
          }
        })
      } else {
        params.append('id', this.currentSelectRow.id)
        this.$axios.post(UPDATE_USER, params).then((res) => {
          if (res.data.status) {
            this.getUserInfo()
          } else {
            this.$message({
              message: '更新失败！'
            })
          }
        })
      }
      this.showDialog = false
    },
    /**
     * 根据code获取组织机构的名称
     */
    getOrgNameByCode(code) {
      return this.orgDatas[code] ? this.orgDatas[code].orgname : ''
    },
    /**
      *@argument val 当前页的展示个数
      */
    handleSizeChange(val) {

    },
    /**
     * 当前页数
     */
    handleCurrentChange(val) { }
  },
  components: {
    AddEditPerson
  }
}
</script>
<style lang="scss">
.el-cascader__label {
  line-height: 40px !important;
}

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
