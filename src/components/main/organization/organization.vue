/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="org-content">
    <panel-split :leftWidth="400"
                 :left-max-width="600">
      <div slot="left" class="left-panel-orgtree">
        <el-tree :data="data" :props="defaultProps"
                 @node-click="handleNodeClick" :render-content="renderContent"></el-tree>
      </div>
      <div class="right-panel-editorg" slot="right">
        <div class="org-title-content">
          <div class="btn-content">
            <el-button type="primary" size="small">编  辑</el-button>
            <el-button type="primary" size="small">添加同级机构</el-button>
            <el-button type="primary" size="small">添加下级机构</el-button>
          </div>
          <div class="edit-content">
            <el-row>
              <el-col :span="6">
                <label class="middle-label">机构名称：</label>
              </el-col>
              <el-col :span="18">
                <el-input :disabled="!edit"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <label class="middle-label">机构编码：</label>
              </el-col>
              <el-col :span="18">
                <el-input disabled></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <label class="middle-label">机构描述：</label>
              </el-col>
              <el-col :span="18">
                <el-input :disabled="!edit" type="textarea"></el-input>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="6">
                <label class="middle-label">&nbsp</label>
              </el-col>
              <el-col :span="18">
                <el-button type="primary" size="small">保 存</el-button>
                <el-button type="primary" size="small">取 消</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </panel-split>
  </div>
</template>

<script>
  import PanelSplit from '@/base/panel-split'
  import TreeItem from './org-tree-item'

  export default {
    data() {
      return {
        edit: true,
        data: [{
          label: '一级 1',
          id: 1,
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      /**
       * 组织机构的节点点击事件
       * @param data
       */
      handleNodeClick(data) {
        console.log(data)
      },
      /**
       * 自定义树组件的节点
       */
      renderContent(h, {node, data, store}) {
        return h(TreeItem, {
          props: {
            label: node.data.label,
            id: node.data.id
          }
        })
      }
    },
    components: {
      PanelSplit,
      TreeItem
    }
  }
</script>

<style lang="scss" scoped>
  .left-panel-orgtree {
    padding-left: 20px;
    padding-top: 10px;
    box-sizing: border-box;
    .el-tree {
      border: none;
    }
  }

  .right-panel-editorg {
    font-size: 2rem;
    &:after {
      content: '';
      display: table;
      clear: both;
    }
    .btn-content {
      float: right;
      padding: 5px 0;
      margin-right: 10px;
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
</style>
