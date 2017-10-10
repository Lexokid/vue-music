<template>
  <div class='silde-item'>
    <img :src='iconURL' :alt="menuItem" />
    <span>{{menuItem}}</span>
    <span class="disc">{{disc}}</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'sildeBarItem',
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
.silde-item {
  line-height: 40px;
  font-size: 14px;
  img {
    width: 20px;
    height: 20px;
    padding: 0 10px;
  }
  .disc{
    font-size: 11px;
    color: #808080;
    float: right;
    margin-right: 10px;
  }
}
</style>
