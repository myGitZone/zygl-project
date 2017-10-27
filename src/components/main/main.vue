/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div id="main-container">
    <app-header></app-header>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <app-footer></app-footer>
    <rigth-menu v-if="rightMenuShow"></rigth-menu>
    <upload-component v-if="showUpload"></upload-component>
    <attribute-dialog v-for="(item,index) in attrbutes" :key="item.uid" :index="index"
                      :attrbuteInfo="item"></attribute-dialog>
    <el-dialog :close-on-click-modal="false" :modal="false" :before-close="dialogClose" custom-class="dialog-custom dialog-custom-shadow" title="授权管理"
               :visible="showAuth" size="large">
      <AuthPanel></AuthPanel>
    </el-dialog>
  </div>
</template>

<script>
import AppHeader from './app-header'
import AppFooter from './app-footer'
import RigthMenu from './right-menu'
import UploadComponent from './upload-component'
import AttributeDialog from './attribute-dialog'
import { FOLDER_TREE, GET_ORGS, GET_CURRENT_USERINFO } from '@/assets/js/const-value.js'
import { mapMutations, mapGetters } from 'vuex'
import Cookies from 'js-cookie'
import { JWT_TOKEN } from '@/assets/js/const-value'
import AuthPanel from './home/content/auth/auth-panel'
export default {
  name: 'app',
  data() {
    return {
      dialogVisible: false
    }
  },
  created() {
    this.$axios.interceptors.request.use(
      config => {
        if (Cookies.get(JWT_TOKEN)) {
          config.headers.authorization = `${Cookies.get(JWT_TOKEN)}`
        }
        return config
      },
      err => {
        return Promise.reject(err)
      })
    this.$axios.interceptors.response.use(
      response => {
        if (!response.data.status && response.data.data === 'login') {
          this.$router.push('/login')
        } else {
          if (response.headers.authorization) {
            Cookies.set(JWT_TOKEN, response.headers.authorization)
          }
          return response
        }
      },
      err => {
        return Promise.reject(err)
      })
    this.$axios.get(FOLDER_TREE).then((res) => {
      if (res.data.status) {
        let dataTree = res.data.data
        let data = [dataTree]
        this.setTreeData(data)
      }
    })
    this.$axios.get(GET_ORGS).then((res) => {
      if (res.data.status) {
        this.setOrgDatas(res.data.data)
      }
    })
    this.$axios.get(GET_CURRENT_USERINFO).then((res) => {
      this.setUserInfo(res.data.data)
    })
  },
  computed: {
    ...mapGetters(['rightMenuShow', 'showUpload', 'attrbutes', 'showAuth'])
  },
  mounted() {
    document.addEventListener('mousedown', (e) => {
      this.changeMenuShow({ isShow: false, left: 0, top: 0 })
    })
  },
  methods: {
    dialogClose() {
      this.changeAuthShow(false)
    },
    ...mapMutations({
      setUserInfo: 'SET_USERINFO',
      changeMenuShow: 'CHANGE_RIGHT_MENU_SHOW',
      setTreeData: 'SET_TREE_DATA',
      setOrgDatas: 'SET_ORG_DATAS',
      changeIndex: 'CHANGE_INDEX',
      setSelectId: 'SET_SELECT_ID',
      changeAuthShow: 'CHANGE_AUTH_SHOW'
    })
  },
  components: {
    AppHeader,
    RigthMenu,
    AppFooter,
    UploadComponent,
    AttributeDialog,
    AuthPanel
  }
}
</script>

<style lang="scss">
.dialog-custom {
  width: 60% !important;
  height: 70% !important;
  .el-dialog__body {
    padding: 0 !important;
  }
}

.dialog-custom-shadow {
  box-shadow: 0px 0px 20px rgba(0, 140, 255, 0.46);
  border: 1px solid #71b9f3;
}
</style>
