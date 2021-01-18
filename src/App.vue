<template>
  <div
    :class="['special-appgallery', `special-appgallery--${$store.state.params.location}`]"
    v-observe-visibility="{
      callback: visibilityChanged,
      once: true,
    }"
  >
    <Screen v-if="isBanner" />
    <div v-if="!isBanner" class="special-appgallery__container">
      <div class="special-appgallery__header">
        <div class="special-appgallery__counter">
          <span>{{ questionIndex }}</span> из {{ stepLength }}
        </div>
        <div class="special-appgallery__wrapper">
          <a
            class="special-appgallery__logo"
            href="/"
            target="_blank"
            @click="sendAnalytics('Logo')"
          ></a>
        </div>
      </div>
      <div v-if="showTitle" class="special-appgallery__title">
        Какое приложение удалите в последнюю очередь?
      </div>
      <TestScreen :options="options" @send="onSend" @restart="restart" />
      <PromoBlock
        v-if="showPromo"
        :pickedApp="pickedApp.text"
        :result="pickedApp.mockResult"
      />
    </div>
  </div>
</template>

<script>
import * as Analytics from './lib/analytics';
import { shuffle, preloadImages } from './lib/helper';
import TestScreen from './components/TestScreen.vue';
import PromoBlock from './components/PromoBlock.vue';
import Screen from './components/Screen.vue';
import Data from './data/data';
import request from './lib/request';

export default {
  name: 'App',
  data() {
    return {
      questionIndex: 1,
      stepLength: 10,
      showPromo: false,
      isArticle: false,
      Data,
      options: shuffle([...Data.apps]).slice(0, this.stepLength),
      pickedApp: {},
      isBanner: false,
      showTitle: true,
    };
  },
  methods: {
    visibilityChanged(isVisible) {
      if (isVisible) {
        Analytics.sendEvent('Project', 'Show');
      }
    },
    onSend(id, pickedApp) {
      this.pickedApp = pickedApp;
      request(`${Data.sendUrl}/${id}`)
        .then((res) => {
          let json = '';
          let options = [...Data.options];
          try {
            json = JSON.parse(res).data;
            const data = json.results;
            options = options.map((item) => ({ ...item, percent: +data[item.label] }));
            options.sort((a, b) => b.percent - a.percent);
          } catch (e) {
            console.log(e);
          }

          this.getResponse(options);
        })
        .catch((er) => {
          console.log(er);
          this.getResponse(Data.options);
        });
    },
    getResponse(options) {
      setTimeout(() => {
        this.promoOptions = options;
        this.showPromo = true;
      }, 500);
    },
    restart() {
      this.showPromo = false;
      this.questionIndex = 1;
      this.pickedApp = {};
    },
  },
  mounted() {
    if (this.$store.state.params.location === '1200x600') {
      this.isBanner = true;
      this.showTitle = false;
    }
    if (this.$store.state.params.location === 'article') {
      this.isBanner = true;
      this.isArticle = true;
      this.showTitle = false;
    }
    this.$root.$on('send-event', (label, action) => {
      if (this.questionIndex < this.stepLength) {
        this.questionIndex += 1;
        Analytics.sendEvent(label, action);
      }
    });
    this.$root.$on('restart', () => {
      this.restart();
    });
    this.$root.$on('start-test', () => {
      this.isBanner = false;
    });
    preloadImages([
      'https://leonardo.osnova.io/e72f85f6-8106-559e-95e8-7ea2e858d55c/',
      'https://leonardo.osnova.io/35015ee7-a1ed-599e-b344-4c45ae56ce2d/',
      'https://leonardo.osnova.io/c3195d11-9972-50c0-9271-3939802eba92/',
      'https://leonardo.osnova.io/241560f9-2b86-5a51-b3aa-0d595d0d0806/',
      'https://leonardo.osnova.io/fb1ac51e-1c92-59d1-8d32-833125fe3b7c/',
      'https://leonardo.osnova.io/742cbe3f-ebec-56c6-a3df-7435e4f983d7/',
      'https://leonardo.osnova.io/67088bfc-83fc-56cc-a888-339e7b443194/',
      'https://leonardo.osnova.io/05fdd39c-d2f9-5a2c-8e47-7b367534d34a/',
      'https://leonardo.osnova.io/74aae3f3-e5d3-5cc3-8ee3-26b6c271569d/',
      'https://leonardo.osnova.io/bf1645e6-9155-5b4c-b837-a52bb9e8082a/',
      'https://leonardo.osnova.io/ee7e195a-e30c-53eb-9c85-bb29171641fa/',
      'https://leonardo.osnova.io/45c53128-ff14-5be6-abe2-1596925b5921/',
      'https://leonardo.osnova.io/88c5df8a-f86e-57dd-9fed-3e2e69cd941c/',
      'https://leonardo.osnova.io/e6070854-61b2-5624-9a9b-b82cb435e793/',
      'https://leonardo.osnova.io/fb8ad17a-9401-578b-84d9-55c5cf293077/',
      'https://leonardo.osnova.io/042b439b-0c6e-5be0-8d66-485db612d905/',
      'https://leonardo.osnova.io/f5bea364-bbab-5c06-8399-f38e3d819161/',
    ]);
  },
  components: {
    TestScreen,
    PromoBlock,
    Screen,
  },
};
</script>

<style lang="stylus">
.special-appgallery
  position: relative
  z-index: 99
  max-width: 100%
  font-family: 'Roboto', sans-serif
  font-size: 16px
  line-height: normal
  text-size-adjust: 100%
  background-color: transparent
  &--article
    .special-appgallery__container
      box-shadow none;

  & *
  & *:before
  & *:after
    box-sizing: border-box

  & svg
    display block
    fill currentColor
    pointer-events none

  & b
    font-weight: 700
  & img
    display: block;
    width: 100%;

  & button
    margin: 0
    padding: 0
    font-family: inherit
    user-select: none
    outline: none
    box-shadow: none
    appearance: none
    cursor: pointer

  &__container
    width: 640px
    max-width: 100%
    margin: 0 auto
    padding: 0 15px

    background: #FFF4E2;
    border-radius 8px;
    box-shadow: 0px 50px 52px -42px #FFB743;

    @media (min-width: 640px)
      padding: 0 20px
  &__header
    display: flex;
    align-items: center;
    padding-top: 21px;
    padding-bottom: 17px;
    @media (max-width 520px)
      padding-top: 16px;
      padding-bottom: 13px;
  &__counter
    font-size: 22px;
    line-height: 27px;
    letter-spacing: 0.02em;
    & > span
      color: #CE0E2D;

  &__wrapper
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  &__title
    font-size: 22px;
    line-height: 27px;
    margin-top 15px;
  &__logo
    max-width 108px;
    width: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='135' height='36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M52.45 19.016h-5.06l-1.239 3.387h-2.227l4.958-12.645h2.102l5.069 12.645h-2.338l-1.264-3.387zm-4.424-1.719h3.78l-1.355-3.623c-.185-.5-.367-1.053-.55-1.656a39.466 39.466 0 01-.532 1.64l-1.343 3.64zM57.057 15.29c0-.698-.025-1.466-.07-2.305h2.023c.075.388.129.789.157 1.198.84-.913 1.797-1.371 2.88-1.371.628 0 1.21.157 1.743.475.537.318.967.817 1.297 1.5.33.685.492 1.552.492 2.606 0 1.099-.19 2.04-.562 2.817-.376.78-.9 1.371-1.574 1.772-.673.4-1.454.603-2.338.603-.64 0-1.272-.107-1.892-.322v3.891l-2.156.182V15.29zm5.671 4.813c.438-.591.661-1.454.661-2.586 0-1.054-.181-1.818-.545-2.293-.364-.475-.847-.71-1.454-.71-.417 0-.806.099-1.16.297a4.364 4.364 0 00-1.013.793v5.044c.215.103.467.186.752.248s.566.09.847.09c.834.005 1.47-.293 1.912-.883zM66.967 15.29c0-.698-.025-1.466-.07-2.305h2.024c.074.388.128.789.157 1.198.838-.913 1.797-1.371 2.879-1.371.628 0 1.21.157 1.743.475.537.318.967.817 1.297 1.5.33.685.492 1.552.492 2.606 0 1.099-.19 2.04-.562 2.817-.376.78-.9 1.371-1.574 1.772-.673.4-1.454.603-2.338.603-.64 0-1.272-.107-1.892-.322v3.891l-2.156.182V15.29zm5.668 4.813c.437-.591.66-1.454.66-2.586 0-1.054-.181-1.818-.545-2.293-.363-.475-.847-.71-1.454-.71-.417 0-.806.099-1.16.297a4.362 4.362 0 00-1.013.793v5.044c.215.103.467.186.752.248s.566.09.847.09c.834.005 1.475-.293 1.913-.883zM79.558 21.804a5.24 5.24 0 01-2.148-2.214c-.5-.958-.752-2.094-.752-3.404 0-1.42.29-2.627.863-3.618.579-.992 1.36-1.736 2.355-2.235.992-.496 2.103-.748 3.338-.748.727 0 1.42.078 2.082.24a9.2 9.2 0 011.846.656l-.549 1.657c-1.148-.545-2.239-.822-3.28-.822-.88 0-1.648.186-2.31.562-.66.376-1.172.925-1.54 1.652-.368.727-.55 1.607-.55 2.636 0 .9.141 1.701.426 2.4a3.549 3.549 0 001.334 1.656c.608.41 1.376.611 2.301.611.417 0 .839-.032 1.256-.103.417-.07.814-.173 1.177-.305v-2.558h-2.924V16.19h5.019v5.325c-.723.339-1.479.595-2.272.777-.793.181-1.582.268-2.371.268-1.269.017-2.367-.24-3.301-.756zM95.272 22.403a8.6 8.6 0 01-.149-1.247c-.33.396-.764.731-1.297 1.008-.533.277-1.132.413-1.8.413a3.416 3.416 0 01-1.48-.318 2.477 2.477 0 01-1.061-.959c-.26-.425-.393-.95-.393-1.565 0-.913.33-1.644.987-2.186.657-.545 1.756-.817 3.289-.817.578 0 1.148.04 1.71.123v-.181c0-.83-.178-1.417-.533-1.76-.355-.339-.863-.512-1.528-.512-.459 0-.95.066-1.475.202a7.665 7.665 0 00-1.38.48l-.339-1.57c.385-.174.893-.335 1.52-.48a8.859 8.859 0 011.992-.219c.814 0 1.508.124 2.078.372.57.248 1.016.674 1.334 1.273.322.603.479 1.412.479 2.429v3.742c0 .389.025.98.07 1.772h-2.024zm-1.293-1.747a3.485 3.485 0 001.099-.801v-1.748a14.323 14.323 0 00-1.442-.095c-.892 0-1.504.145-1.846.434-.34.29-.513.677-.513 1.165 0 .467.124.81.372 1.033.248.223.583.334 1.008.334.434 0 .872-.107 1.322-.322zM99.11 20.144V9.014l2.148-.173V19.76c0 .401.07.686.207.851.136.166.355.248.648.248.132 0 .322-.033.566-.095l.252 1.545a3.587 3.587 0 01-.748.198c-.293.05-.57.075-.834.075-1.491-.004-2.24-.814-2.24-2.437zM104.48 20.144V9.014l2.148-.173V19.76c0 .401.07.686.207.851.136.166.355.248.648.248.132 0 .323-.033.566-.095l.252 1.545a3.593 3.593 0 01-.747.198c-.294.05-.571.075-.835.075-1.491-.004-2.239-.814-2.239-2.437zM117.241 17.966h-6.164c.099 1.97 1.037 2.958 2.817 2.958.442 0 .897-.054 1.36-.161a7.98 7.98 0 001.33-.434l.471 1.475c-1.054.512-2.239.768-3.553.768-1 0-1.842-.19-2.532-.566a3.653 3.653 0 01-1.549-1.631c-.347-.711-.521-1.566-.521-2.566 0-1.04.182-1.937.55-2.689.367-.752.875-1.322 1.532-1.718.653-.397 1.409-.595 2.264-.595.888 0 1.636.206 2.231.623.594.418 1.036.971 1.326 1.661.289.694.429 1.458.429 2.297v.578h.009zm-2.103-1.367c-.041-.752-.231-1.314-.566-1.69-.339-.376-.789-.562-1.351-.562-.545 0-1.004.19-1.367.566-.364.38-.599.938-.711 1.686h3.995zM118.976 15.352c0-.516-.025-1.305-.071-2.367h2.016c.037.26.07.574.099.938.033.363.054.66.066.884.248-.413.496-.76.736-1.041.239-.281.524-.512.847-.69a2.243 2.243 0 011.103-.264c.33 0 .615.033.855.103l-.273 1.867a2.46 2.46 0 00-.698-.095c-.508 0-.95.128-1.326.388-.38.26-.781.686-1.215 1.28v6.049h-2.148v-7.052h.009zM125.928 26.258a5.584 5.584 0 01-.777-.186l.393-1.57c.144.042.33.079.549.12.223.038.43.058.628.058.954 0 1.669-.615 2.148-1.842l.141-.347-3.474-9.497h2.313l1.747 5.308c.285.909.467 1.603.55 2.086.161-.682.355-1.363.574-2.04l1.772-5.35h2.173l-3.466 9.538c-.326.9-.677 1.628-1.057 2.181-.38.554-.827.963-1.339 1.231-.516.269-1.136.401-1.863.401a6.926 6.926 0 01-1.012-.09z' fill='%23000'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M25.253 0H9.885C2.648 0 0 2.648 0 9.885v15.368c0 7.237 2.648 9.885 9.885 9.885h15.363c7.238 0 9.89-2.648 9.89-9.885V9.885C35.138 2.648 32.49 0 25.253 0z' fill='%23C8102E'/%3E%3Cpath d='M6.957 17.573h.933v4.594h-.933v-1.868H4.854v1.868H3.92v-4.594h.934v1.855h2.103v-1.855zm5.25 2.627c0 .748-.372 1.145-1.045 1.145-.678 0-1.05-.41-1.05-1.178v-2.594H9.18V20.2c0 1.293.719 2.033 1.97 2.033 1.265 0 1.987-.756 1.987-2.07v-2.59h-.933V20.2h.004zm10.773.529l-1.04-3.16h-.76l-1.042 3.16-1.016-3.156h-.991l1.603 4.594h.772l1.045-3.016 1.045 3.016h.777l1.599-4.594h-.967l-1.024 3.156zm3.656-.541h1.694v-.835h-1.694v-.941H29.1v-.839h-3.38v4.59h3.47v-.84H26.64v-1.135h-.004zm3.66 1.97h.922v-4.585h-.922v4.585zm-15.313-.95l-.417.959h-.95l2.024-4.59h.822l2.016 4.59h-.98l-.412-.959h-2.103zm.347-.83h1.409l-.707-1.644-.702 1.644zM17.569 11.724a5.855 5.855 0 01-5.85-5.85h.827a5.029 5.029 0 005.023 5.024 5.029 5.029 0 005.023-5.023h.826a5.855 5.855 0 01-5.85 5.849z' fill='%23fff'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: cover;
    height: 28px;

    @media (max-width 520px)
      max-width 100px;
      height: 26px;
</style>
