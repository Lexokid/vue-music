<template>
  <div class='silde-bar'>
    <!-- mask -->
    <transition name='fade'>
      <div class='mask' @click='closeMenu' v-show='isShowMenu'></div>
    </transition>
    <!-- menu -->
    <transition name='silde'>
      <div class="menu-wrap" v-show='isShowMenu'>
        <div class="menu">
          <!-- login -->
          <v-avatar></v-avatar>
          <!-- menu-item -->
          <div class="menu-content">
            <v-sildeBarItem v-for='(item, index) in lists' :key='index' :opt='item'>
              <div class="split" v-if='(index === 3)||(index === 5)'></div>
            </v-sildeBarItem>
          </div>
        </div>
        <!-- menu-bottom -->
        <p class="border-1px"></p>
        <div class="option">
          <div class="">
            <img src="/static/afv.png" alt="夜间模式">
            <span>夜间模式</span>
          </div>
          <div>
            <img src="/static/afw.png" alt="设置">
            <span>设置</span>
          </div>
          <div @click="logOut">
            <img src="/static/afn.png" alt="退出">
            <span>退出</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import lists from './list.json';
import sildeBarItem from '../SildeBarItem/SildeBarItem';
import avatar from '../Avatar/Avatar';

export default {
  name: 'sildeBar',
  data() {
    return {
      lists,
    };
  },
  computed: {
    isShowMenu() {
      return this.$store.state.isShowMenu;
    },
  },
  methods: {
    closeMenu() {
      this.$store.commit({
        type: 'toggleMenu',
      });
    },
    logOut() {
      if (localStorage.getItem('user')) {
        localStorage.removeItem('user');
        this.$store.commit('setUserId', '');
        this.$store.commit({
          type: 'setUserDetail',
          userDetail: {},
        });
        this.$store.commit({
          type: 'setPlaylist',
          userDetail: [],
        });
      }
    },
  },
  components: {
    'v-sildeBarItem': sildeBarItem,
    'v-avatar': avatar,
  },
};
</script>

<style lang='scss'>
@import '../../assets/css/border-1px.scss';

.silde-bar {
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba( 0, 0, 0, 0.6);
    z-index: 9;
  }

  .menu-wrap {
    position: absolute;
    top: 0;
    left: 0;
    width: 80%;
    max-width: 370px;
    height: 100vh;
    background-color: #fff;
    z-index: 10;

    .menu {
      height: calc(100vh - 45px);
      overflow: auto;

      .split {
        width: 100%;
        height: 7px;
        background-color: #f2f4f5;
      }
    }
    .border-1px {
      @include border-1px(#d9d9d9);
    }
    .option {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 45px;
      display: flex;
      flex-flow: nowrap row;

      div {
        line-height: 45px;
        text-align: center;
        &:nth-child(1) {
          flex: 7;
        }
        &:nth-child(2) {
          flex: 5;
        }
        &:nth-child(3) {
          flex: 5;
        }
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.silde-enter-active,
.silde-leave-active {
  transition: transform .3s;
}

.silde-enter,
.silde-leave-to {
  transform: translateX(-100%);
}
</style>
