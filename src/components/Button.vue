<template>
  <div :class="['special-appgallery-button',
    `special-appgallery-button--${state}`,
    `special-appgallery-button--${pos}`]"
    :is="tagName"
    @click="onClick">
    <div class="special-appgallery-button__content">
      <div class="special-appgallery-button__icon">
          <img :src="icon" alt="">
      </div>
      <div class="special-appgallery-button__text" v-html="text">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Button',
  props: {
    // pickedApp: {
    //   type: Boolean,
    // },
    tagName: {
      type: String,
      default: 'div',
    },
    state: {
      type: String,
      default: 'default',
    },
    icon: {
      type: String,
      default: '',
    },
    id: {
      type: Number,
      default: 0,
    },
    pos: {
      type: String,
      default: 'left',
    },
    text: {
      type: String,
      default: '',
    },
  },
  methods: {
    onClick() {
      this.$emit('click', this.id, this.pos, this.text);
      // if (this.pickedApp) {
      //   this.$emit('picked', this.pickedApp);
      // }
    },
  },
};
</script>

<style lang="stylus">
.special-appgallery-button
  width 100%
  margin: 0
  position relative
  cursor pointer
  user-select none
  display flex
  align-items: center
  justify-content center

  padding: 20px 42px;
  margin: 0 5px
  max-width: 177px;

  will-change transform, opacity
  transition transform .25s ease, opacity .25s ease

  @media (max-width 520px)
    max-width: 130px;
    padding: 20px 0;

  &:before
    content ''
    position absolute
    left 0
    top 0
    width 100%
    height 100%
    box-sizing: border-box;
    background: linear-gradient(179.84deg, #FFE7BF 1.55%, #FED695 99.86%);
    box-shadow: 0px 4px 8px rgba(238, 169, 57, 0.3);
    border-radius: 15px;

    transition transform .25s ease
  &__content
    position: relative;
    display: flex;
    flex-flow column nowrap;
    align-items center;
  &__icon
    position relative
    width: 93px;
    @media (max-width 520px)
      width 65px;
  &__text
    color: #606060;
    font-size: 12px;
    line-height: 15px;
    margin-top: 13px;
    text-align: center;
  &--disabled
      pointer-events none;
  &--default
    @media (min-width: 550px)
      &:hover
        &:before
          will-change transform, opacity
          transform scale(1.02, 1.06)

      &:active
        &:before
          background: linear-gradient(179.84deg, #FFE2B0 1.55%, #FDC872 99.86%);

  &--left&--clicked
    opacity 0
    transform translateY(20px)
    @media (min-width: 550px)
      transform translateX(20px)

  &--right&--clicked
    opacity 0
    transform translateY(-20px)
    @media (min-width: 550px)
      transform translateX(-20px)

  &--hidden
    opacity 0
    transform scale(.9)

  &--final
    cursor default

  &--left&--final
    @media (max-width: 549px)
      transform translateY(-30px)

  &--right&--final
    @media (max-width: 549px)
      transform translateY(30px)

</style>
