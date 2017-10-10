<template>
  <div class='playlist'>
    <div class="split">
      <img class="toggle" :class='{ rotate90: isShow }' @click="isShow = !isShow" src='../../assets/img/z4.png'>
      <slot name='title'></slot>
      <span class='disc'>({{lists.length}})</span>
      <img class="option" src="../../assets/img/a28.png">
    </div>
    <transition name='opacity'>
      <div class="lists" v-show="isShow">
        <v-playlistItem v-for='(list, index) in lists' :key='index' :item='list'></v-playlistItem>
      </div>
    </transition>
  </div>
</template>

<script>
import playlistItem from '../PlaylistItem/PlaylistItem';

export default {
  name: 'playlist',
  props: {
    lists: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      isShow: true,
    };
  },
  components: {
    'v-playlistItem': playlistItem,
  },
};
</script>

<style lang='scss'>
.playlist {
  overflow: hidden;
  .split {
    width: 100%;
    height: 30px;
    line-height: 30px;
    background-color: #e9e9e9;
    color: #5d5d5d;
    font-size: 12px;
    .toggle {
      width: 12px;
      height: 12px;
      margin: 0 5px 0 10px;
      transform: rotateZ(0deg);
      transform-origin: 50%;
      transition: transform .3s ease;
    }
    .disc {
      font-weight: bold;
    }
    .option {
      float: right;
      width: 20px;
      height: 20px;
      margin: 5px 20px 5px;
    }
  }
  .lists {
    overflow: hidden;
  }
}

.rotate90 {
  transform: rotateZ(90deg) !important;
}

.opacity-enter-active,
.opacity-leave-active {
  transition: opacity .3s ease;
}

.opacity-enter,
.opacity-leave-to {
  opacity: 0;
}
</style>
