<template>
  <div class='avatar-login'>
    <template v-if='userDetail.code'>
      <div class="logined" :style="{backgroundImage: '-webkit-linear-gradient(bottom, rgba(0, 0, 0, 0.3),rgba( 0, 0, 0, 0)),url('+ userDetail.profile.backgroundUrl + ')'}">
        <div class="avatar" :style="{backgroundImage: 'url(' + userDetail.profile.avatarUrl + ')'}"></div>
        <div class="username">
          <span>{{userDetail.profile.nickname}}</span>
          <div>
            <i>Lv.{{userDetail.level}}</i>
            <!-- <p v-if='!userDetail.mobileSign' class="sign" @click="sign" key='sign'> -->
            <p v-if='!userDetail.mobileSign' class="sign" key='sign'>
              签到
            </p>
            <p v-else class="signed" key='signed'>
              已签到
            </p>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="login">
        <div>
          <p>请先登录网易云账号</p>
          <button @click="toLogin">立即登录</button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'avatar',
  data() {
    return {
    };
  },
  computed: {
    userDetail() {
      return this.$store.state.userDetail;
    },
  },
  methods: {
    closeMenu() {
      this.$store.commit({
        type: 'toggleMenu',
      });
    },
    toLogin() {
      this.closeMenu();
      setTimeout(() => { this.$router.push({ path: 'Login' }); }, 400);
    },
    // 检查签到的字段已改
    // async sign() {
    //   await this.$music.dailySignin();
    //   this.$store.dispatch({
    //     type: 'updateUserDetail',
    //     that: this,
    //     isTimestamp: true,
    //   });
    // },
  },
};
</script>

<style lang='scss'>
@import '../../assets/css/base.scss';

.avatar-login {
  .login {
    background: url(/static/afh.png) no-repeat;
    background-size: cover;
    width: 100%;
    height: 160px;
    color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    @extend %center;
    button {
      margin-top: 20px;
      color: #fff;
      border: none;
      background-color: transparent;
      outline: none;
      border: 1px solid #fff;
      width: 150px;
      height: 30px;
      border-radius: 15px;
      -webkit-user-select: none;
      &:active {
        background-color: rgba(255, 255, 255, .5);
      }
    }
  }

  .logined {
    width: 100%;
    height: 160px;
    background-size: cover;
    background-position: 50%;
    position: relative;
    .username {
      position: absolute;
      width: 100%;
      bottom: 10px;
      left: 0;
      color: #fff;
      height: 20px;
      line-height: 20px;
      display: flex;
      flex-flow: nowrap row;
      justify-content: space-between;
      align-items: center;
      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 10px;
      }
      div {
        display: flex;
        align-items: center;
        margin-right: 10px;
        i {
          border: 1px solid #fff;
          border-radius: 100px;
          padding: 0 5px;
          font-size: 12px;
          font-weight: bold;
          height: 15px;
          line-height: 15px;
        }
        p {
          vertical-align: top;
          border-radius: 100px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          margin-left: 10px;
        }
        .sign {
          border: 1px solid #fff;
          padding: 0 0 0 20px;
          background: url(../../assets/img/oh.png) 5px 50% no-repeat;
          background-size: 15px 15px;
          width: 30px;
        }
        .signed {
          border: 1px solid rgba(255, 255, 255, 0.5);
          color: rgba(255, 255, 255, 0.5);
          padding: 0 10px;
          width: 36px;
        }
      }
    }
    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      background-size: cover;
      position: absolute;
      top: 50px;
      left: 15px;
    }
  }
}
</style>
