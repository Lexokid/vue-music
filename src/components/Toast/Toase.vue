<template>
    <div class='toast'>
      <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'toast',
  data() {
    return {
    };
  },
};
</script>

<style lang='scss'>
.toast {
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  text-align: center;
  padding: 15px 10px;
  max-width: 150px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  z-index: 100;
  bottom: 100px;
  border-radius: 20px;
}
</style>
