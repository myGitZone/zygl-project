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
        <el-cascader change-on-select v-model="selected" style="line-height: 40px" :options="elCascaderOptions" size="small"></el-cascader>
      </el-col>
      <el-col class="query-label" :span="2">
        <el-button size="small" type="primary">查 询</el-button>
      </el-col>
    </el-row>
    <el-row ref="table" class="table-content">
      <el-table :data="tableData" border :height="tableHeight" highlight-current-row style="width: 100%">
        <el-table-column prop="nickname" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="orgid" label="部门">
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
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="sizes, prev, pager, next" :total="1000">
      </el-pagination>
    </el-row>
    <div class="btn-content">
      <el-button size="small" type="primary" @click="addClick">添 加</el-button>
      <el-button size="small" type="primary">编 辑</el-button>
      <el-button size="small" type="primary">删 除</el-button>
    </div>
    <el-dialog :modal="false" custom-class="dialog-custom-add-edit" title="提示" :visible.sync="showDialog" size="small">
      <add-editPerson @cancelClick="cancelClick" @saveClick="saveClick"></add-editPerson>
    </el-dialog>
  </div>
</template>

<script>
import AddEditPerson from './add-edit-person'
import { SIGUP_URL } from '@/assets/js/const-value'

export default {
  data() {
    return {
      tableHeight: 0,
      showDialog: false,
      tableData: [],
      currentPage: 0,
      selected: [],
      elCascaderOptions: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }]
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
