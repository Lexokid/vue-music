<template>
  <div class='playlist-top'>
    <div class="bg">
      <img :src="bgUrl">
    </div>
    <div class="playlistDisc">
      <div class="playlistImg" :style="{backgroundImage: 'url('+ bgUrl + ')'}"></div>
      <div class="disc">
        <p>{{name}}</p>
        <div class="creator">
          <img :src="avatar || '/static/a8t.png'">
          <span>{{creator}}</span>
          <i></i>
        </div>
      </div>
    </div>
    <div class="option">
      <div>
        <img src="../../assets/img/yw.png">
        <span>{{count.subscribedCount}}</span>
      </div>
      <div>
        <img src="../../assets/img/yt.png">
        <span>{{count.commentCount}}</span>
      </div>
      <div>
        <img src="../../assets/img/z0.png">
        <span>{{count.shareCount}}</span>
      </div>
      <div>
        <img src="../../assets/img/yu.png">
        <span>下载</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'playlist-top',
  props: {
    name: {
      type: String,
      default: '',
    },
    bgUrl: {
      type: String,
      default: '',
    },
    avatar: {
      type: String,
      default: '',
    },
    creator: {
      type: String,
      default: '',
    },
    count: {
      type: Object,
      default: {},
    },
  },
};
</script>

<style lang='scss'>
.playlist-top {
  width: 100%;
  height: 250px;
  position: relative;
  padding-top: 50px;
  box-sizing: border-box;
  color: #fff;
  .bg {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    img {
      width: 100%;
      height: 100%;
      filter: blur(70px);
      transform-origin: center;
      transform: scale(2);
    }
  }
  .playlistDisc {
    display: -webkit-box;
    margin: 0 20px;
    .playlistImg {
      width: 130px;
      height: 130px;
      background-size: 100%;
      background-repeat: no-repeat;
    }
    .disc {
      flex: 1;
      padding: 20px 20px 0;
      p {
        font-size: 18px;
        margin-bottom: 20px;
      }
      .creator {
        display: flex;
        align-items: center;
        img {
          width: 25px;
          height: 25px;
          border-radius: 50%;
        }
        span {
          font-size: 14px;
          margin-left: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: calc(100% - 35px);
        }
        i {
          background: url(../../assets/img/ahi.png) no-repeat;
          background-size: 100%;
          width: 5px;
          height: 10px;
          margin-left: 5px;
        }
      }
    }
  }
  .option {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
