<template>
  <div class="special-appgallery-promo-shares">
    <div class="likely" ref="share"></div>
    <div
      :class="[
        'special-appgallery-promo-shares__share',
        { 'special-appgallery-promo-shares__share--copied': showModal },
      ]"
      v-clipboard="clipboardCopyHandler()"
      v-clipboard:success="clipboardSuccessHandler"
    />
    <div class="special-appgallery-promo-shares__restart" @click="restart">
      <icon-base icon-name="icon-restart" width="17" height="17" viewBox="0 0 17 17">
        <icon-restart></icon-restart>
      </icon-base>
      Пройти ещё раз
    </div>
  </div>
</template>

<script>
import IconBase from './IconBase.vue';
import IconRestart from './Icons/IconRestart.vue';

import * as Analytics from '../lib/analytics';
import * as Share from '../lib/share';

export default {
  name: 'ShareBlock',
  components: {
    IconRestart,
    IconBase,
  },
  data() {
    return {
      showModal: false,
    };
  },
  mounted() {
    this.share();
  },
  methods: {
    clipboardCopyHandler() {
      this.url = `https://dtf.ru/special/quotes/share/${this.score}`;

      return this.url;
    },
    clipboardSuccessHandler({ value, event }) {
      this.value = value;
      this.event = event;
      Analytics.sendEvent('share-link');
      clearTimeout(this.modalTimeout);
      this.showModal = true;
      this.modalTimeout = setTimeout(() => {
        this.showModal = false;
      }, 1500);
    },
    declineWord(number, words) {
      let result = '';

      if (number % 10 === 1 && number % 100 !== 11) {
        result += words[0];
      } else if (
        [2, 3, 4].indexOf(number % 10) > -1
        && [12, 13, 14].indexOf(number % 100) < 0
      ) {
        result += words[1];
      } else {
        result += words[2];
      }

      return result;
    },
    share() {
      const socials = this.$refs.share;
      Share.make(socials, {
        title: `Смог угадать ${this.score} ${this.declineWord(this.clicks, [
          'игровой жанр',
          'игровых жанра',
          'игровых жанров',
        ])} из 7.`,
        url: `https://dtf.ru/special/code-test/share/${this.score}`,
      });
    },
    restart() {
      Analytics.sendEvent('Restart');
      this.$root.$emit('restart');
    },
  },
};
</script>

<style lang="stylus">
.special-appgallery-promo-shares
  display: flex;
  flex-flow: row wrap;


  margin: 20px 0;
  &__restart
    display flex
    flex-direction row
    align-items center

    font-size: 16px;
    line-height: 19px;
    cursor: pointer;
    color: #000;
    & > svg
      color: #000;
      margin-right 10px
      transition: transform 0.4s ease-in;
    &:hover
      & > svg
        transform: rotate(360deg);
    @media (max-width 520px)
      margin-top: 16px;
      font-size: 12px;
      line-height: 14px;
      & > svg
        width: 12px;
        height 12px;
  &__share
    z-index 10
    position relative
    background-image: url("data:image/svg+xml,%3Csvg width='18' height='18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6.147 5.1L8.07 3.18v10.166a.931.931 0 101.862 0V3.179L11.853 5.1a.932.932 0 101.317-1.317L9.658.273a.931.931 0 00-1.316 0L4.83 3.783a.931.931 0 101.316 1.318z' fill='%23000'/%3E%3Cpath d='M17.069 8.07a.931.931 0 00-.931.93v7.138H1.862V9A.931.931 0 000 9v7.448A1.552 1.552 0 001.552 18h14.896A1.552 1.552 0 0018 16.448V9a.931.931 0 00-.931-.93z' fill='%23000'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;

    margin: 0 14px;

    border: 1px solid #DCDCDC;
    box-sizing: border-box;
    border-radius: 5px;
    cursor pointer

    transition: background .2s

    height: 40px;
    width: 100%;
    max-width 40px
    @media (max-width 520px)
      max-width 38px
      height 32px;
    &--copied::before
      content 'Cсылка скопирована'
      background: #FFFFFF;

      box-shadow: 0px 3px 6px #FFF4E2;
      border: 1px solid #FFF4E2;
      border-radius: 3px;
      position: absolute;
      bottom: 50px;
      right: 0;

      padding: 6px 8px;
      font-size: 12px;
      line-height: 12px;
      display: block;

      width: 140px;
      transform: translateX(45px);
      color: #000;

      @media (max-width: 320px)
        right: 30px;

.likely
  z-index: 10;
  flex-shrink: 0;

.likely--custom
  display flex
  flex-direction row
  align-items center
  width: 100%;
  margin: 0 -7px;

  & .likely__widget
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    flex: 1 1 auto;
    margin: 0 7px;

    height: 40px;
    font-size: 16px;
    color: #000;

    padding: 0 9px;

    border: 1px solid #DCDCDC;
    box-sizing: border-box;
    border-radius: 5px;

    transition: all .2s
    &:hover
      cursor: pointer;

    @media (max-width 520px)
      max-width 38px
      height 32px;
      padding: 7px 8px;
      &::before
        height: 30px;
      &:hover
        color: #000;

    & .likely__icon
        fill: currentColor;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        & > svg
            width: 20px;
            height: 20px;
            @media (max-width 520px)
              width: 17px;
  & .likely__widget--facebook
    max-width: 160px;
    padding: 7px 20px;
    background: #3C5A99;
    border-radius: 5px;
    border: none;
    color: #fff;
    & svg
      width: 22px;
      height: 21px;
      margin-right: 10px;
    @media (max-width: 520px)
      max-width: 122px;
      padding: 7px 20px;
      font-size: 12px;
      & > span
        margin-left: -6px
      & svg
        width: 7px;
        height: 16px;
</style>
