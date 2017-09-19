/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="left-panel">
    <el-tree :data="treeData" highlight-current :props="defaultProps" :render-content="renderContent"
             node-key="id" :default-expanded-keys="[1]" @node-click="handleNodeClick"></el-tree>
  </div>
</template>

<script>
  import TreeItem from './tree-item'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        defaultProps: {
          children: 'folder',
          label: 'name'
        }
      }
    },
    computed: {
      ...mapGetters(['treeData'])
    },
    methods: {
      /**
       * 自定义树组件的节点
       */
      renderContent(h, {node, data, store}) {
        return h(TreeItem, {
          props: {
            label: node.data.name,
            id: node.data.id
          }
        })
      },
      /**
       * 树节点点击事件
       * @param obj
       * @param node
       */
      handleNodeClick(obj, node) {
        let path = node.data.name
        while (node.parent && node.parent.id !== 1) {
          path = node.parent.data.name + '/' + path
          node = node.parent
        }
        this.pushPath(path)
      },
      ...mapMutations({pushPath: 'PUSH_PATH'})
    },
    components: {
      TreeItem
    }
  }
</script>

<style lang="scss" scoped>
  .left-panel {
    height: 100%;
    left: 100%;
    padding-left: 20px;
    box-sizing: border-box;
    overflow: hidden;
    .el-tree {
      border: none;
    }
  }
</style>
