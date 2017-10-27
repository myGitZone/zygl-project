/*
* @Author: ycl
* @Date:
* @description
*/
<template>
  <div class="login-container">
    <div id="canvascontainer" ref='can'></div>
    <div class="login-info-container">
      <el-form :model="formdata">
        <el-form-item prop="username" :rules="[
                  { required: true, message: '请输入用户名', trigger: 'blur' }
                ]">
          <el-input v-model="formdata.username" placeholder="请输入用户名">
            <template slot="prepend">
              <i class="login-icon fa fa-user-o" aria-hidden="true"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password" :rules="[
                  { required: true, message: '请输入密码', trigger: 'blur' }
                ]">
          <el-input type="password" v-model="formdata.password" placeholder="请输入密码">
            <template slot="prepend">
              <i class="login-icon fa fa-lock" aria-hidden="true"></i>
            </template>
          </el-input>
        </el-form-item>
        <span style="color:red" v-if="showError">用户名或密码错误</span>
        <el-button style="width:100%" @click="loginClick" type="primary">登&nbsp&nbsp&nbsp录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { LOGIN_URL } from '@/assets/js/const-value.js'
import Cookies from 'js-cookie'
import { JWT_TOKEN } from '@/assets/js/const-value'
const SEPARATION = 100
const AMOUNTX = 50
const AMOUNTY = 50

export default {
  data() {
    return {
      formdata: {
        username: '',
        password: ''
      },
      showError: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initCanvas()
    })
  },
  methods: {
    /**
     * 登录点击
     */
    loginClick() {
      let params = new URLSearchParams()
      params.set('passWord', this.formdata.password)
      params.set('userName', this.formdata.username)
      this.$axios.post(LOGIN_URL, params).then((res) => {
        if (res.data.status) {
          this.showError = false
          Cookies.set(JWT_TOKEN, res.data.token)
          this.$router.push('/main')
        } else {
          this.showError = true
        }
      }).catch(() => {
        this.showError = true
      })
    },
    /**
     * 初始化canvas
     * @private
     */
    initCanvas() {
      this.count = 0
      this.mouseX = 0
      this.mouseY = 0
      this.windowHalfX = window.innerWidth / 2
      this.windowHalfY = window.innerHeight / 2
      let THREE = window.THREE
      this.container = document.createElement('div')
      this.$refs.can.appendChild(this.container)
      // 参数1.为视野角 ,参数2为纵横比,参数3为相机允许离物体的最近距离.参数4为相机允许离物体的最远距离.
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000)
      this.camera.position.z = 1000
      this.scene = new THREE.Scene()
      let PI2 = Math.PI * 2
      let material = new THREE.ParticleCanvasMaterial({
        color: 0x0078de,
        program(context) {
          context.beginPath()
          context.arc(0, 0, 1, 0, PI2, true)
          context.fill()
        }
      })
      let i = 0
      this.particles = []
      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          let particle = this.particles[i++] = new THREE.Particle(material)
          particle.position.x = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2)
          particle.position.z = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2)
          this.scene.add(particle)
        }
      }
      this.renderer = new THREE.CanvasRenderer()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.container.appendChild(this.renderer.domElement)

      document.addEventListener('mousemove', this.onDocumentMouseMove, false)
      document.addEventListener('touchstart', this.onDocumentTouchStart, false)
      document.addEventListener('touchmove', this.onDocumentTouchMove, false)
      window.addEventListener('resize', this.onWindowResize, false)
      this.animate()
    },
    /**
     * 鼠标移动事件
     */
    onDocumentMouseMove(event) {
      this.mouseX = event.clientX - this.windowHalfX
      this.mouseY = event.clientY - this.windowHalfY
    },
    /**
     * 触摸开始
     */
    onDocumentTouchStart(event) {
      if (event.touches.length === 1) {
        event.preventDefault()
        this.mouseX = event.touches[0].pageX - this.windowHalfX
        this.mouseY = event.touches[0].pageY - this.windowHalfY
      }
    },
    /**
     * 触摸移动
     */
    onDocumentTouchMove() {
      if (event.touches.length === 1) {
        event.preventDefault()
        this.mouseX = event.touches[0].pageX - this.windowHalfX
        this.mouseY = event.touches[0].pageY - this.windowHalfY
      }
    },
    /**
     * 桌面重新设置
     */
    onWindowResize() {
      this.windowHalfX = window.innerWidth / 2
      this.windowHalfY = window.innerHeight / 2
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },
    // 动画效果
    animate() {
      requestAnimationFrame(this.animate)
      this.render()
    },
    /**
     * 渲染
     */
    render() {
      this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05
      this.camera.position.y += (-this.mouseY - this.camera.position.y) * 0.05
      this.camera.lookAt(this.scene.position)
      let i = 0
      for (var ix = 0; ix < AMOUNTX; ix++) {
        for (var iy = 0; iy < AMOUNTY; iy++) {
          let particle = this.particles[i++]
          particle.position.y = (Math.sin((ix + this.count) * 0.3) * 50) + (Math.sin((iy + this.count) * 0.5) * 50)
          particle.scale.x = particle.scale.y = (Math.sin((ix + this.count) * 0.3) + 1) * 2 + (Math.sin((iy + this.count) * 0.5) + 1) * 2
        }
      }
      this.renderer.render(this.scene, this.camera)
      this.count += 0.1
    }
  }
}
</script>

<style lang="scss">
.login-container {
  height: 100%;
  margin: 0;
  background-color: #141a48;
  overflow: hidden;
  .login-info-container {
    position: absolute;
    top: 260px;
    left: 0;
    right: 0;
    width: 350px;
    margin: auto;
    color: #fff;
    .el-form-item__content {
      line-height: 0 !important;
      font-size: 0;
    }
    .login-icon {
      width: 12px;
      text-align: center;
    }
  }
}
</style>
