<template>
  <div :class="['special-appgallery-screen', {'l-island-a': isArticle}]">
    <div class="special-appgallery-screen__header">
      <div class="special-appgallery-screen__title">Какое приложение удалите в последнюю очередь?</div>
      <div class="special-appgallery-screen__button" @click="startTest">Проверить</div>
    </div>

    <div class="special-appgallery-screen__gif">
      <img src="https://leonardo.osnova.io/89cd1910-ef75-5487-9bc1-fd74b1c5c85e/" alt="">
    </div>

  </div>
</template>

<script>
export default {
  name: 'Screen',
  props: {
    isArticle: {
      type: Boolean,
    },
  },
  methods: {
    startTest() {
      this.$root.$emit('start-test');
    },
  },
};
</script>

<style lang="stylus">
.special-appgallery-screen
  max-width: 1200px;
  background: #FFF4E2;
  width: 100%;
  display flex
  flex-flow row nowrap
  padding: 78px 45px;
  @media (max-width 640px)
    padding: 3.6vw 6.6vw;
  &__header
    display: flex;
    flex-direction: column;
  &__gif
    max-height 600px
    flex-shrink 0
    @media (max-width 640px)
      max-width: 33vw
  &__title
    font-weight: bold;
    font-size: 50px;
    line-height: 120%;
    @media (max-width 640px)
      font-size: 5vw;
  &__button
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    font-weight: 500;
    font-size: 30px;
    line-height: 41px;
    border: 2px solid #000000;
    border-radius: 8px;

    padding 19px 50px;

    text-decoration none

    -webkit-transition: all 0.2s;
    transition: all 0.2s;

    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    outline: none;
    cursor: pointer;

    max-width 255px;
    margin-top 46px;
    @media (max-width 640px)
      font-size: 4.7vw;
      padding: 0.1vw 5vw;
      max-width: 35vw;
      border: 1px solid #000000;

</style>
