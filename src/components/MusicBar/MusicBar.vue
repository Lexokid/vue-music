<template>
  <div class='music-bar'>
    <div class="range">
      <span>{{selectPrecentage ? formatSelectTime : currentTime}}</span>
      <div class="progress-bar" ref="progressBar">
        <div class="current" ref="current" :style="{width: (selectPrecentage || precentage) + '%'}"></div>
        <div class="ball" ref="ball" :style="{left: (selectPrecentage || precentage) + '%'}" @mousedown.stop="touchstart" @touchstart.stop="touchstart" @mousemove.stop="touchmove($event)" @touchmove.stop="touchmove($event)" @mouseup.stop="touchend" @touchend.stop="touchend"></div>
      </div>
      <span>{{duration}}</span>
    </div>
    <div class="music-ctr">
      <img src="../../assets/img/a_l.png">
      <img src="../../assets/img/a9j.png" @click="pre">
      <img src="../../assets/img/a9f.png" v-show='isPlay' @click='togglePlay'>
      <img src="../../assets/img/a9h.png" v-show='!isPlay' @click='togglePlay'>
      <img src="../../assets/img/a9d.png" @click="next">
      <img src="../../assets/img/aa1_.png">
    </div>
  </div>
</template>

<script>
export default {
  name: 'music-bar',
  data() {
    return {
      isDrag: false,
      selectPrecentage: 0,
    };
  },
  computed: {
    hasMusic() {
      return Object.keys(this.$store.getters.currentMusic).length !== 0;
    },
    isPlay() {
      return this.$store.state.isPlay;
    },
    currentTime() {
      return this.timerFormat(this.$store.state.musicTime);
    },
    selectTime() {
      return this.$store.state.musicDuration * (this.selectPrecentage / 100);
    },
    formatSelectTime() {
      return this.timerFormat(this.selectTime);
    },
    duration() {
      // return this.$store.state.musicDuration;
      return this.timerFormat(this.$store.state.musicDuration);
    },
    precentage() {
      return this.$store.getters.precentage;
    },
  },
  methods: {
    timerFormat(time) {
      if (isNaN(time)) return '00:00';
      let min = Math.floor(time / 60);
      let sec = Math.floor(time % 60);
      min = min > 9 ? min : `0${min}`;
      sec = sec > 9 ? sec : `0${sec}`;
      return `${min}:${sec}`;
    },
    togglePlay() {
      this.$store.commit('togglePlay');
    },
    next() {
      this.$store.dispatch({
        type: 'nextMusic',
        that: this,
      });
    },
    pre() {
      this.$store.dispatch({
        type: 'preMusic',
        that: this,
      });
    },
    touchstart() {
      this.isDrag = true;
    },
    touchend() {
      this.isDrag = false;
      this.$store.commit('updateSelectTime', this.selectTime);
      this.$store.commit('updateMusicTime', this.selectTime);
      this.selectPrecentage = 0;
    },
    touchmove(e) {
      if (this.isDrag) {
        const touches = e.touches;
        const offsetLeft = this.$refs.progressBar.offsetLeft;
        const offsetWidth = this.$refs.progressBar.offsetWidth;
        let x;
        let y;
        if (touches && touches[0]) {
          x = touches[0].pageX;
          y = touches[0].pageY;
        } else {
          x = e.pageX;
          y = e.pageY;
        }
        this.selectPrecentage = (Math.floor(x - offsetLeft) / offsetWidth) * 100;
        if (this.selectPrecentage > 100) {
          this.selectPrecentage = 100;
        } else if (this.selectPrecentage < 0) {
          this.selectPrecentage = 0;
        }
      }
    },
  },
};
</script>

<style lang='scss'>
.music-bar {
  height: 20vh;
  .range {
    display: flex;
    align-items: center;
    color: rgba(245, 245, 245, .8);
    font-size: 12px;
    width: 90%;
    margin: 0 5%;
    height: 7vh;
    .progress-bar {
      flex: 1;
      background: rgba(245, 245, 245, .3);
      height: 2px;
      margin: 0 10px;
      border-radius: 2px;
      position: relative;
      .current {
        height: 100%;
        background: #d33a31;
      }
      .ball {
        position: absolute;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #fff;
        margin: -9px 0 0 -8px;
      }
    }
  }
  .music-ctr {
    height: 13vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img:nth-child(1),
    img:nth-child(6) {
      width: 9vh;
    }
    img:nth-child(2),
    img:nth-child(5) {
      width: 12vh;
    }
    img:nth-child(3),
    img:nth-child(4) {
      width: 15vh;
    }
  }
}
</style>
