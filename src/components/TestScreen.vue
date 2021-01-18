<template>
  <div class="special-appgallery-test">
    <div class="special-appgallery-test__buttons">
      <div :class="[
        'special-appgallery-test__button',
        {'special-appgallery-test__button--center': center === 'right',
        'special-appgallery-test__button--hidden': hidden === 'left'}
        ]" ref="right">
        <Button
          :icon="buttons.left.icon"
          :text="buttons.left.text"
          :pos="`right`"
          :id="buttons.left.id"
          :state="buttons.left.state"
          @click="onClick" />
      </div>
      <div v-if="!isHideVs" class="special-appgallery-test__vs">или</div>
       <div :class="[
        'special-appgallery-test__button',
        {'special-appgallery-test__button--center': center === 'left',
        'special-appgallery-test__button--hidden': hidden === 'right'}
        ]" ref="left">
        <Button
          :icon="buttons.right.icon"
          :text="buttons.right.text"
          :pos="`left`"
          :id="buttons.right.id"
          :state="buttons.right.state"
          @click="onClick"

           />
       </div>
    </div>
    <Note
      v-if="showNote"
      :text="buttons.left.note || buttons.right.note"
      @hideNote="hideNote"/>
  </div>
</template>

<script>

import Button from './Button.vue';
import Note from './Note.vue';

export default {
  components: { Button, Note },
  name: 'TestScreen',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showNote: false,
      isClicked: false,
      isHideVs: false,
      current: 2,
      center: '',
      hidden: '',
      pickedApp: '',
      buttons: {
        left: {},
        right: {},
      },
    };
  },
  methods: {
    hideNote() {
      this.showNote = false;
    },
    onClick(id, pos, text) {
      if (!this.isClicked && this.current <= 9) {
        this.$root.$emit('send-event', `Step #${this.current - 1}, Button (${text})`);
        this.showNext(pos);
      } else if (!this.isClicked && this.current <= 10) {
        this.$root.$emit('send-event', `Step #${this.current - 1}, Button (${text})`);
        this.showLast(pos, id);
        this.send(id, pos);
      }
    },
    showNext(pos) {
      this.isClicked = true;
      this.buttons[pos].state = 'clicked';
      setTimeout(() => {
        this.showNote = true;
        const invertPos = pos === 'left' ? 'right' : 'left'; // ивертируем нажатую кнопку
        this.buttons[invertPos].state = 'disabled'; // и убираем pointer-events с нее, чтобы нельзя было быстро кликать

        this.buttons[pos] = { ...this.options[this.current], state: 'hidden' };
        this.current += 1;
        setTimeout(() => {
          this.buttons[pos].state = 'default';
          setTimeout(() => {
            this.isClicked = false;
            this.buttons[invertPos].state = 'default';
          }, 200);
        }, 200);
      }, 200);
    },
    showLast(pos) {
      this.isClicked = true;
      this.buttons[pos].state = 'clicked';
      setTimeout(() => {
        this.$refs[pos].children[0].style.width = `${this.$refs[pos].children[0].offsetWidth}px`;
        setTimeout(() => {
          const position = pos === 'left' ? 'right' : 'left';

          this.buttons[position].state = 'final';
          this.hidden = pos;
          this.center = pos;
          this.isHideVs = true;

          if (this.buttons[position].state === 'final') {
            this.pickedApp = this.buttons[position]; // сохраняем выбранное приложение
          }
        }, 350);
      }, 50);
    },
    send(id) {
      setTimeout(() => {
        this.$emit('send', id, this.pickedApp);
      }, 500);
    },
  },
  mounted() {
    this.buttons.left = { ...this.options[0], state: 'default' };
    this.buttons.right = { ...this.options[1], state: 'default' };
  },
};
</script>

<style lang="stylus">
.special-appgallery-test
  padding-top: 35px;
  padding-bottom 40px;
  transition height 0.2s
  will-change height
  &__vs
    flex-shrink 0;
    background: #FDCB79;
    box-shadow: 0px 6.875px 9.625px -4.125px #E5A63E;
    width: 44px;
    height 44px;
    border-radius: 50%;
    display: flex;
    align-items center
    justify-content center
    font-size: 16px;
    line-height: 21px;
    color: #fff;
    @media (max-width 520px)
      width: 33px;
      height 33px;
      font-size: 11px;
      line-height: 14px;
  &__buttons
    display: flex;
    justify-content: space-around;
    align-items: center;
   &__button
    width 100%
    display flex
    justify-content center
    flex 1 1 100%
    min-height: 177px;

    @media (max-width 520px)
      min-height: 130px;

    &:first-child
      margin-bottom auto

    &:last-child
      margin-top auto

    @media (min-width: 550px)
      width auto
      margin-bottom 0
      flex 0 1 50%

    &:first-child
      @media (min-width: 550px)
        margin-right auto

    &:last-child
      @media (min-width: 550px)
        margin-left auto

  &__button--center
    transition: all .5s ease
    flex 0 1 100%

  &__button--hidden
    @media (min-width: 550px)
      display none
</style>
