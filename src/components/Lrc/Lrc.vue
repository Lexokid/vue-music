<template>
  <div class="content-body" ref="lrcwrap">
    <div class="lrc">
      <template v-if="hasLrc">
        <p ref="p" v-for="(val,key,index) in lyric" :key="index" :class="{active: index == currentLyric}">
          {{val}}
          <br>
          <span v-if="tlyric">{{tlyric[key]}}</span>
        </p>
      </template>
      <template v-else>
        <p>暂无歌词</p>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lrc',
  data() {
    return {
      currentLyric: 0,
      scrollTop: 0,
      translateY: 0,
    };
  },
  computed: {
    hasMusic() {
      return Object.keys(this.$store.getters.currentMusic).length !== 0;
    },
    isPlay() {
      return this.$store.state.isPlay;
    },
    hasLrc() {
      return this.$store.state.lrc.lrc;
    },
    lyric() {
      return this.parseLyric(this.$store.state.lrc.lrc.lyric);
    },
    tlyric() {
      return this.parseLyric(this.$store.state.lrc.tlyric.lyric);
    },
    currentTime() {
      return Math.floor(this.$store.state.musicTime);
    },
  },
  watch: {
    currentTime() {
      if (!this.hasLrc) return;
      if (this.currentTime === 0) this.currentLyric = 0;
      Object.keys(this.lyric).forEach((item, index) => {
        if (this.currentTime === Number(item)) {
          this.currentLyric = index;
        }
      });
    },
    currentLyric() {
      // this.translateY += -this.$refs.p[this.currentLyric].offsetHeight;
      this.scrollTop = this.$refs.p[this.currentLyric].offsetTop;
      // const start = this.$refs.lrcwrap.scrollTop;
      const end = this.scrollTop - (this.$refs.lrcwrap.clientHeight / 2);
      this.$refs.lrcwrap.scrollTop = end;
      // 在手机上过渡效果惨不忍睹
      // this.scroll(this.$refs.lrcwrap, start, end);
    },
  },
  methods: {
    parseLyric(lrc) {
      if (!lrc) return;
      const lyrics = lrc.split('\n');
      const timeStampReg = /\[\d*:\d*[.|:]\d*\]/;
      const lrcObj = {};
      lyrics.forEach((item, index) => {
        if (timeStampReg.test(item)) {
          const min = Number(item.match(/\[\d*/)[0].slice(1));
          const sec = Number(item.match(/:\d*/)[0].slice(1));
          const time = (min * 60) + sec;
          const string = item.replace(timeStampReg, '');
          if (string) lrcObj[time] = string;
        }
      });
      return lrcObj;
    },
    scroll(elm, start, end, fps = 60, time = 500) {
      const distance = end - start;
      let count = fps * (time / 1000);
      const dis = distance / count;
      const timer = setInterval(() => {
        elm.scrollTop += dis;
        count -= 1;
        if (count <= 0) {
          clearInterval(timer);
        }
      }, 1000 / fps);
    },
  },
};
</script>

<style lang='scss'>
.content-body {
  position: relative;
  width: 100%;
  height: calc(80vh - 50px);
  overflow-y: scroll;
  .lrc {
    color: rgba(255, 255, 255, .5);
    text-align: center;
    padding: 50% 0;
    transition: transform .5s linear;
    p {
      padding: 10px 10%;
      line-height: 18px;
      span {
        font-size: 14px;
      }
    }
    .active {
      color: #fff;
    }
  }
}
</style>
