<template>
  <transition name="sildeUp">
    <div class='musicPage' v-show="isShow">
      <div class="bg" :style="{backgroundImage: 'url('+ picUrl + ')'}"></div>
      <div class="content">
        <div class="title">
          <img class="back" src="../../assets/img/mv.png" @click="closeMusicPage">
          <div>
            <p>{{title}}</p>
            <p>{{author}}</p>
          </div>
          <img class="share" src="../../assets/img/n2.png">
        </div>

        <div style="height: calc(80vh - 50px)" @click="toggleLrc">
          <transition name="fade" mode="out-in">
            <keep-alive>
              <v-cd v-if='!isShowLrc'></v-cd>
              <v-lrc v-else></v-lrc>
            </keep-alive>
          </transition>
        </div>

        <v-musicBar></v-musicBar>
      </div>
    </div>
  </transition>
</template>

<script>
import musicBar from '../MusicBar/MusicBar';
import cd from '../CD/CD';
import lrc from '../Lrc/Lrc';

export default {
  name: 'musicPage',
  data() {
    return {
      isShowLrc: false,
    };
  },
  computed: {
    isShow() {
      return this.$store.state.isShowMusic;
    },
    hasMusic() {
      return this.$store.getters.currentMusic;
    },
    isPlay() {
      return this.$store.state.isPlay;
    },
    title() {
      return this.hasMusic ? this.hasMusic.name : null;
    },
    author() {
      return this.hasMusic ? this.hasMusic.ar[0].name : null;
    },
    picUrl() {
      return this.hasMusic ? this.hasMusic.al.picUrl : null;
    },
  },
  methods: {
    closeMusicPage() {
      this.$store.commit('closeMusicPage');
    },
    toggleLrc() {
      this.isShowLrc = !this.isShowLrc;
    },
  },
  components: {
    'v-musicBar': musicBar,
    'v-cd': cd,
    'v-lrc': lrc,
  },
};
</script>

<style lang='scss'>
@import '../../assets/css/base.scss';
@import '../../assets/css/border-1px.scss';

.musicPage {
  @extend %full-page;
  z-index: 12;
  overflow: hidden;
  background: #7f7f7f;
  .bg {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    filter: blur(50px) brightness(0.7);
    transform: scale(1.2);
    position: absolute;
  }
  .content {
    position: absolute;
    width: 100vw;
    height: 100vh;
    .title {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .back {
        height: 50px;
      }
      .share {
        height: 30px;
        margin-right: 10px;
      }
      div {
        height: 50px;
        flex: 1;
        color: #fff;
        display: flex;
        flex-flow: nowrap column;
        justify-content: center;
        p:nth-child(1) {
          font-size: 18px;
          margin-bottom: 5px;
        }
        p:nth-child(2) {
          font-size: 14px;
          color: #adadad;
        }
      }
    }
  }
}
</style>
