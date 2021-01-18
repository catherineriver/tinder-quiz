<template>
  <div class="special-appgallery-note">
    <div class="special-appgallery-note__text" v-html="text"></div>
  </div>
</template>

<script>
export default {
  name: 'Note',
  props: {
    text: {
      type: String,
    },
  },
  created() {
    setTimeout(() => { this.$emit('hideNote'); },
      3000);
  },
};
</script>

<style lang="stylus">
.special-appgallery-note
  font-size: 16px;
  line-height: 20px;

  background: #FFFFFF;
  border-radius: 8px;
  padding 19px;

  max-width: 495px;
  margin: 20px auto;

</style>
