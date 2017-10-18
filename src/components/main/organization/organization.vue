/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="org-content">
    <div class="left-panel-orgtree">
      <el-tree :data="orgData" highlight-current :props="defaultProps" @node-click="handleNodeClick" :render-content="renderContent"></el-tree>
    </div>
    <div class="right-panel-editorg">
      <div class="org-title-content">
        <div class="btn-content">
          <el-button type="primary" size="small" :disabled="!currentData" @click="addNode(2)">编 辑</el-button>
          <el-button type="primary" size="small" :disabled="editCanUse" @click="addNode(0)">添加同级机构</el-button>
          <el-button type="primary" size="small" :disabled="!currentData" @click="addNode(1)">添加下级机构</el-button>
        </div>
        <div class="edit-content">
          <el-row>
            <el-col :span="6">
              <label class="middle-label">机构名称：</label>
            </el-col>
            <el-col :span="18">
              <el-input v-model="orgname" :disabled="!edit"></el-input>
            </el-col>
          </el-row>
          <!-- <el-row>
                                                                  <el-col :span="6">
                                                                    <label class="middle-label">机构编码：</label>
                                                                  </el-col>
                                                                  <el-col :span="18">
                                                                    <el-input disabled></el-input>
                                                                  </el-col>
                                                                </el-row> -->
          <el-row>
            <el-col :span="6">
              <label class="middle-label">机构描述：</label>
            </el-col>
            <el-col :span="18">
              <el-input v-model="description" :rows="4" resize="none" :disabled="!edit" type="textarea"></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <label class="middle-label">&nbsp</label>
            </el-col>
            <el-col :span="18">
              <el-button type="primary" size="small" @click="saveData" :disabled="!edit">保 存</el-button>
              <!-- <el-button type="primary" size="small" >取 消</el-button> -->
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PanelSplit from '@/base/panel-split'
import TreeItem from './org-tree-item'
import { ADD_ORG, EDIT_ORG } from '@/assets/js/const-value'
import { mapGetters, mapMutations } from 'vuex'
const ADD_SAME_LEVEL = 0
const ADD_NEXT_LEVEL = 1
const EDIT = 2
export default {
  data() {
    return {
      // 是否可编辑
      edit: false,
      // 组织机构名称
      orgname: '',
      // 组织机构描述
      description: '',
      defaultProps: {
        children: 'children',
        label: 'orgname'
      },
      currentData: null
    }
  },
  computed: {
    editCanUse() {
      return !this.currentData || this.currentData.level === 0
    },
    orgData() {
      return [this.orgDatas.rootNode]
    },
    ...mapGetters(['orgDatas'])
  },
  mounted() {
  },
  methods: {
    /**
     * 组织机构的节点点击事件
     * @param data
     */
    handleNodeClick(data) {
      this.edit = false
      this.currentData = data
      this.orgname = data.orgname
      // 组织机构描述
      this.description = data.description
    },
    /**
     * 自定义树组件的节点
     */
    renderContent(h, { node, data, store }) {
      return h(TreeItem, {
        props: {
          label: node.data.orgname,
          level: node.data.level
        }
      })
    },
    /**
     * 添加节点
     * @argument type 0-添加同级节点，1-添加下级节点, 2-编辑节点
     * */
    addNode(type) {
      if (!this.currentData) {
        return
      }
      this.edit = true
      this.type = type
      this._resetInput()
      if (type === EDIT) {
        this.orgname = this.currentData.orgname
        // 组织机构描述
        this.description = this.currentData.description
      }
    },
    /**
     * 数据保存
     * @argument
     */
    saveData() {
      let params = new URLSearchParams()
      if (this.type === ADD_SAME_LEVEL || this.type === ADD_NEXT_LEVEL) {
        params.append('orgname', this.orgname)
        params.append('description', this.description)
        if (this.type === ADD_SAME_LEVEL) {   // 同级节点
          params.append('level', this.currentData.level)
          params.append('orgpid', this.currentData.orgpid)
        } else if (this.type === ADD_NEXT_LEVEL) { // 下级节点
          params.append('level', this.currentData.level + 1)
          params.append('orgpid', this.currentData.id)
        }
        this.$axios.post(ADD_ORG, params).then((res) => {
          if (res.data.status) {
            this.setOrgDatas(res.data.data)
            this.edit = false
            this._resetInput()
          }
        })
      } else {
        params.append('id', this.currentData.id)
        params.append('orgname', this.orgname)
        params.append('description', this.description)
        this.$axios.post(EDIT_ORG, params).then((res) => {
          if (res.data.status) {
            this.setOrgDatas(res.data.data)
            this.edit = false
            this._resetInput()
          }
        })
      }
    },
    /**
     * 重置输入框
     */
    _resetInput() {
      this.orgname = null
      this.description = ''
    },
    ...mapMutations({ setOrgDatas: 'SET_ORG_DATAS' })
  },
  components: {
    PanelSplit,
    TreeItem
  }
}
</script>

<style lang="scss" scoped>
.org-content {
  position: absolute;
  top: 60px;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #eee;
  font-size: 0;
  .left-panel-orgtree {
    display: inline-block;
    width: 20%;
    height: 100%;
    padding-left: 20px;
    padding-top: 10px;
    box-sizing: border-box;
    border-right: 1px solid #eee;
    vertical-align: top;
    overflow: auto;
    .el-tree {
      border: none;
      overflow: hidden;
    }
  }

  .right-panel-editorg {
    position: relative;
    display: inline-block;
    height: 100%;
    width: 80%;
    font-size: 2rem;
    vertical-align: top;
    &:after {
      content: '';
      display: table;
      clear: both;
    }
    .btn-content {
      float: right;
      padding: 5px 0;
      margin-right: 30px;
    }
    .edit-content {
      position: absolute;
      top: 30%;
      right: 0;
      left: 0;
      width: 400px;
      margin: auto;
      .el-row {
        margin: 10px 0;
        text-align: center;
        .middle-label {
          vertical-align: middle;
          font-size: 1.6rem;
        }
      }
    }
  }
}
</style>
