<template>
  <div class='myMusicItem'>
    <div>
      <img :src='iconURL' :alt="menuItem" />
    </div>
    <div>
      <span>{{menuItem}}</span>
      <span class="disc">({{disc}})</span>
      <p class="border-1px"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myMusicItem',
  props: {
    opt: {
      type: Object,
    },
  },
  data() {
    return {
      iconURL: this.opt.iconURL,
      menuItem: this.opt.menuItem,
      disc: this.opt.disc,
    };
  },
};
</script>

<style lang='scss'>
@import '../../assets/css/border-1px.scss';
.border-1px {
  @include border-1px(#d9d9d9);
}

.myMusicItem {
  display: flex;
  flex-flow: nowrap row;
  div {
    height: 50px;
    img {
      width: 100%;
      height: 100%;
    }
    &:nth-child(1) {
      width: 50px;
      padding: 10px;
      box-sizing: border-box;
    }
    &:nth-child(2) {
      flex: 1;
      line-height: 50px;
      .disc {
        color: #919293;
        font-size: 13px;
        font-weight: bold;
      }
    }
  }
}
</style>
