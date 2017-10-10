<template>
  <div class='loginPage'>
    <div class="wrap">
      <img class="bg" src="../../assets/img/a34.jpg">
      <img class="icon" src="../../assets/img/a3p.png">
      <div class="form">
        <div class="formItem">
          <img src="../../assets/img/a3d.png">
          <span>+86 </span>
          <input type="tel" v-model="phone" placeholder="请输入手机号">
        </div>
        <div class="formItem">
          <img src="../../assets/img/a3f.png">
          <input type="password" v-model="password" placeholder="请输入密码">
        </div>
        <button @click="login">登录</button>
      </div>
    </div>
    <transition name='fade'>
      <v-toast v-if="isToast">登录失败</v-toast>
    </transition>
  </div>
</template>

<script>
import toast from '../Toast/Toase';

export default {
  name: 'loginPage',
  data() {
    return {
      phone: '',
      password: '',
      isToast: false,
    };
  },
  methods: {
    async login() {
      if ((/^1\d{10}$/.test(this.phone)) && (/^.{6,18}$/.test(this.password))) {
        const res = await this.$music.login(this.phone, this.password);
        // When login is successful, save the data to localStorage and vuex
        if (res.data.code === 200) {
          localStorage.setItem('user', JSON.stringify(res.data));
          this.$store.commit('setUserId', res.data.account.id);
          this.$store.dispatch({
            type: 'updateUserDetail',
            that: this,
          });
          this.$store.dispatch({
            type: 'updatePlaylist',
            that: this,
          });
          this.$router.go(-1);
        } else {
          this.isToast = true;
          setTimeout(() => { this.isToast = false; }, 2000);
        }
      }
    },
  },
  components: {
    'v-toast': toast,
  },
};
</script>

<style lang='scss'>
@import '../../assets/css/base.scss';

.loginPage {
  @extend %full-page;
  .wrap {
    width: 100%;
    height: 100%;
    max-width: 567px;
    margin: 0 auto;
    position: relative;
    .bg {
      position: absolute;
      width: 100%;
      top: 0;
    }
    .icon {
      width: 90px;
      position: absolute;
      top: 80px;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
    .form {
      position: absolute;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: 200px;
      width: 80%;
      .formItem {
        border-bottom: 1px solid #ced0d0;
        padding: 10px 0;
        img {
          width: 20px;
        }
        span {
          vertical-align: middle;
        }
        input {
          background-color: transparent;
          border: none;
          outline: none;
          height: 20px;
          font-size: 16px;
          vertical-align: middle;
        }
      }
      button {
        background: transparent;
        color: #ce3d3a;
        border: 1px solid #ce3d3a;
        outline: none;
        width: 100%;
        font-size: 16px;
        height: 40px;
        border-radius: 20px;
        margin-top: 20px;
        &:active {
          background: #ce3d3a;
          color: #fff;
        }
      }
    }
  }
}
</style>
