<template>
  <div class="special-appgallery-promo l-island-a" ref="appGalleryDTF">
    <div class="special-appgallery-promo__container">
      <div class="special-appgallery-promo__title">
          <span>{{result}}%</span> пользователей TJournal тоже оставили <span>{{pickedApp}}</span>
      </div>
      <ShareBlock />

      <div class="special-appgallery-promo__desc">
        Этот тест мы сделали с AppGallery — магазином приложений, который доступен на устройствах HUAWEI и HONOR*. Все загружаемые в него сервисы проходят серьёзный отбор, а четырёхступенчатая защита находит угрозы ещё до того, как приложение попадёт в магазин.
        <span>* — на базе HMS</span>
      </div>

      <FeaturesBlock />

    <div class="special-appgallery-promo__footer">
      <a class="special-appgallery-promo__button"
        href="https://bit.ly/2VSIJfF"
        target="_blank"
        @click="sendAnalytics('Promo')">Интересно</a>
      <a class="special-appgallery-promo__logo"
        href="https://bit.ly/3qImRBA"
        target="_blank"
        @click="sendAnalytics('Logo')" />
    </div>
    </div>
  </div>
</template>

<script>
import * as Analytics from '../lib/analytics';
import FeaturesBlock from './FeaturesBlock.vue';
import ShareBlock from './ShareBlock.vue';

export default {
  name: 'PromoBlock',
  components: {
    ShareBlock,
    FeaturesBlock,

  },
  props: {
    pickedApp: {
      type: String,
      default: 'App name',
    },
    result: {
      type: Number,
      default: 13,
    },
  },
  data() {
    return {

    };
  },
  mounted() {
    Analytics.sendEvent('Result', 'Show');

    setTimeout(() => {
      const scrollTo = (to, duration) => {
        const start = window.pageYOffset;
        const change = to - start;
        let currentTime = 0;
        const increment = 20;

        const animateScroll = () => {
          currentTime += increment;
          const val = Math.easeInOutQuad(currentTime, start, change, duration);
          window.scroll(0, val);
          if (currentTime < duration) {
            setTimeout(animateScroll, increment);
          }
        };
        animateScroll();
      };

      Math.easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t -= 1;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const scrollToElement = (ref) => {
        scrollTo(ref.getBoundingClientRect().top + window.scrollY - 100, 500);
      };

      scrollToElement(this.$refs.appGalleryDTF);
    });
  },
  methods: {

  },
};
</script>

<style lang="stylus">
.special-appgallery-promo
  &__container
    width: 640px
    max-width: 100%
    margin: 0 auto
    padding 30px 20px;

    font-size: 24px;
    line-height: 30px;

    background: #fff;
    border-bottom-left-radius 8px;
    border-bottom-right-radius 8px;

    @media (max-width: 520px)
      font-size: 18px;
      line-height: 22px;

  &__title
    font-weight: bold;
    & > span
      color: #E5A63E;

  &__desc
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    & > span
      color: #dedede;
      display: block;
      font-size: 12px;
      font-weight: 400;
      line-height: 26px;
      @media (max-width: 520px)
        line-height: 21px;

  &__footer
    display: flex;
    align-items: center;
    margin: 20px 0;

    @media (max-width 520px)
      margin-top: 21px;
      margin-bottom: 10px;
  &__button
    margin-right: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    font-size: 16px;
    line-height: 20px;
    background-color: #FFBF53;
    border-radius: 8px;

    color: #fff;

    padding: 14px 84px;
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
    &:after
      content: "";
      border-radius: 5px;
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      opacity: 0;
      -webkit-transition: all 0.2s;
      transition: all 0.2s;
    &:hover
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

    &:hover::after
      opacity: 1;
  &__logo
    flex-grow: 0;
    flex-shrink: 0;
    max-width 155px;
    width: 100%;
    background-image: url("data:image/svg+xml,%3Csvg width='135' height='36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M52.45 19.016h-5.06l-1.239 3.387h-2.227l4.958-12.645h2.102l5.069 12.645h-2.338l-1.264-3.387zm-4.424-1.719h3.78l-1.355-3.623c-.185-.5-.367-1.053-.55-1.656a39.466 39.466 0 01-.532 1.64l-1.343 3.64zM57.057 15.29c0-.698-.025-1.466-.07-2.305h2.023c.075.388.129.789.157 1.198.84-.913 1.797-1.371 2.88-1.371.628 0 1.21.157 1.743.475.537.318.967.817 1.297 1.5.33.685.492 1.552.492 2.606 0 1.099-.19 2.04-.562 2.817-.376.78-.9 1.371-1.574 1.772-.673.4-1.454.603-2.338.603-.64 0-1.272-.107-1.892-.322v3.891l-2.156.182V15.29zm5.671 4.813c.438-.591.661-1.454.661-2.586 0-1.054-.181-1.818-.545-2.293-.364-.475-.847-.71-1.454-.71-.417 0-.806.099-1.16.297a4.364 4.364 0 00-1.013.793v5.044c.215.103.467.186.752.248s.566.09.847.09c.834.005 1.47-.293 1.912-.883zM66.967 15.29c0-.698-.025-1.466-.07-2.305h2.024c.074.388.128.789.157 1.198.838-.913 1.797-1.371 2.879-1.371.628 0 1.21.157 1.743.475.537.318.967.817 1.297 1.5.33.685.492 1.552.492 2.606 0 1.099-.19 2.04-.562 2.817-.376.78-.9 1.371-1.574 1.772-.673.4-1.454.603-2.338.603-.64 0-1.272-.107-1.892-.322v3.891l-2.156.182V15.29zm5.668 4.813c.437-.591.66-1.454.66-2.586 0-1.054-.181-1.818-.545-2.293-.363-.475-.847-.71-1.454-.71-.417 0-.806.099-1.16.297a4.362 4.362 0 00-1.013.793v5.044c.215.103.467.186.752.248s.566.09.847.09c.834.005 1.475-.293 1.913-.883zM79.558 21.804a5.24 5.24 0 01-2.148-2.214c-.5-.958-.752-2.094-.752-3.404 0-1.42.29-2.627.863-3.618.579-.992 1.36-1.736 2.355-2.235.992-.496 2.103-.748 3.338-.748.727 0 1.42.078 2.082.24a9.2 9.2 0 011.846.656l-.549 1.657c-1.148-.545-2.239-.822-3.28-.822-.88 0-1.648.186-2.31.562-.66.376-1.172.925-1.54 1.652-.368.727-.55 1.607-.55 2.636 0 .9.141 1.701.426 2.4a3.549 3.549 0 001.334 1.656c.608.41 1.376.611 2.301.611.417 0 .839-.032 1.256-.103.417-.07.814-.173 1.177-.305v-2.558h-2.924V16.19h5.019v5.325c-.723.339-1.479.595-2.272.777-.793.181-1.582.268-2.371.268-1.269.017-2.367-.24-3.301-.756zM95.272 22.403a8.6 8.6 0 01-.149-1.247c-.33.396-.764.731-1.297 1.008-.533.277-1.132.413-1.8.413a3.416 3.416 0 01-1.48-.318 2.477 2.477 0 01-1.061-.959c-.26-.425-.393-.95-.393-1.565 0-.913.33-1.644.987-2.186.657-.545 1.756-.817 3.289-.817.578 0 1.148.04 1.71.123v-.181c0-.83-.178-1.417-.533-1.76-.355-.339-.863-.512-1.528-.512-.459 0-.95.066-1.475.202a7.665 7.665 0 00-1.38.48l-.339-1.57c.385-.174.893-.335 1.52-.48a8.859 8.859 0 011.992-.219c.814 0 1.508.124 2.078.372.57.248 1.016.674 1.334 1.273.322.603.479 1.412.479 2.429v3.742c0 .389.025.98.07 1.772h-2.024zm-1.293-1.747a3.485 3.485 0 001.099-.801v-1.748a14.323 14.323 0 00-1.442-.095c-.892 0-1.504.145-1.846.434-.34.29-.513.677-.513 1.165 0 .467.124.81.372 1.033.248.223.583.334 1.008.334.434 0 .872-.107 1.322-.322zM99.11 20.144V9.014l2.148-.173V19.76c0 .401.07.686.207.851.136.166.355.248.648.248.132 0 .322-.033.566-.095l.252 1.545a3.587 3.587 0 01-.748.198c-.293.05-.57.075-.834.075-1.491-.004-2.24-.814-2.24-2.437zM104.48 20.144V9.014l2.148-.173V19.76c0 .401.07.686.207.851.136.166.355.248.648.248.132 0 .323-.033.566-.095l.252 1.545a3.593 3.593 0 01-.747.198c-.294.05-.571.075-.835.075-1.491-.004-2.239-.814-2.239-2.437zM117.241 17.966h-6.164c.099 1.97 1.037 2.958 2.817 2.958.442 0 .897-.054 1.36-.161a7.98 7.98 0 001.33-.434l.471 1.475c-1.054.512-2.239.768-3.553.768-1 0-1.842-.19-2.532-.566a3.653 3.653 0 01-1.549-1.631c-.347-.711-.521-1.566-.521-2.566 0-1.04.182-1.937.55-2.689.367-.752.875-1.322 1.532-1.718.653-.397 1.409-.595 2.264-.595.888 0 1.636.206 2.231.623.594.418 1.036.971 1.326 1.661.289.694.429 1.458.429 2.297v.578h.009zm-2.103-1.367c-.041-.752-.231-1.314-.566-1.69-.339-.376-.789-.562-1.351-.562-.545 0-1.004.19-1.367.566-.364.38-.599.938-.711 1.686h3.995zM118.976 15.352c0-.516-.025-1.305-.071-2.367h2.016c.037.26.07.574.099.938.033.363.054.66.066.884.248-.413.496-.76.736-1.041.239-.281.524-.512.847-.69a2.243 2.243 0 011.103-.264c.33 0 .615.033.855.103l-.273 1.867a2.46 2.46 0 00-.698-.095c-.508 0-.95.128-1.326.388-.38.26-.781.686-1.215 1.28v6.049h-2.148v-7.052h.009zM125.928 26.258a5.584 5.584 0 01-.777-.186l.393-1.57c.144.042.33.079.549.12.223.038.43.058.628.058.954 0 1.669-.615 2.148-1.842l.141-.347-3.474-9.497h2.313l1.747 5.308c.285.909.467 1.603.55 2.086.161-.682.355-1.363.574-2.04l1.772-5.35h2.173l-3.466 9.538c-.326.9-.677 1.628-1.057 2.181-.38.554-.827.963-1.339 1.231-.516.269-1.136.401-1.863.401a6.926 6.926 0 01-1.012-.09z' fill='%23000'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M25.253 0H9.885C2.648 0 0 2.648 0 9.885v15.368c0 7.237 2.648 9.885 9.885 9.885h15.363c7.238 0 9.89-2.648 9.89-9.885V9.885C35.138 2.648 32.49 0 25.253 0z' fill='%23C8102E'/%3E%3Cpath d='M6.957 17.573h.933v4.594h-.933v-1.868H4.854v1.868H3.92v-4.594h.934v1.855h2.103v-1.855zm5.25 2.627c0 .748-.372 1.145-1.045 1.145-.678 0-1.05-.41-1.05-1.178v-2.594H9.18V20.2c0 1.293.719 2.033 1.97 2.033 1.265 0 1.987-.756 1.987-2.07v-2.59h-.933V20.2h.004zm10.773.529l-1.04-3.16h-.76l-1.042 3.16-1.016-3.156h-.991l1.603 4.594h.772l1.045-3.016 1.045 3.016h.777l1.599-4.594h-.967l-1.024 3.156zm3.656-.541h1.694v-.835h-1.694v-.941H29.1v-.839h-3.38v4.59h3.47v-.84H26.64v-1.135h-.004zm3.66 1.97h.922v-4.585h-.922v4.585zm-15.313-.95l-.417.959h-.95l2.024-4.59h.822l2.016 4.59h-.98l-.412-.959h-2.103zm.347-.83h1.409l-.707-1.644-.702 1.644zM17.569 11.724a5.855 5.855 0 01-5.85-5.85h.827a5.029 5.029 0 005.023 5.024 5.029 5.029 0 005.023-5.023h.826a5.855 5.855 0 01-5.85 5.849z' fill='%23fff'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: cover;
    height: 40px;

    @media (max-width 520px)
      max-width 54px;
      background-image: url("data:image/svg+xml,%3Csvg width='54' height='50' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M34.092 0h-14.14c-6.66 0-9.098 2.437-9.098 9.103v14.152c0 6.666 2.435 9.103 9.095 9.103h14.135c6.66 0 9.103-2.437 9.103-9.103V9.103C43.187 2.437 40.752 0 34.092 0z' fill='%23C8102E'/%3E%3Cpath d='M17.26 16.185h.856v4.23h-.857v-1.72h-1.935v1.72h-.858v-4.23h.858v1.708h1.935v-1.708zm4.83 2.422c0 .686-.343 1.056-.96 1.056-.625 0-.968-.378-.968-1.083v-2.391h-.857v2.418c0 1.19.66 1.872 1.814 1.872 1.162 0 1.829-.694 1.829-1.907v-2.387h-.858v2.422zm9.91.488l-.96-2.91h-.701l-.96 2.91-.934-2.906h-.914l1.475 4.229h.712l.96-2.776.96 2.776h.716l1.471-4.23h-.888L32 19.096zm3.364-.5h1.559v-.77h-1.559v-.866h2.264v-.77h-3.11v4.225h3.194v-.774h-2.348v-1.045zm3.369 1.815h.845v-4.225h-.845v4.225zm-14.09-.88l-.385.88h-.876l1.863-4.229h.758l1.856 4.23h-.9l-.38-.882h-1.936zm.316-.763h1.296l-.652-1.514-.644 1.514zM27.02 10.796c-2.968 0-5.38-2.418-5.38-5.388h.763a4.628 4.628 0 004.621 4.625 4.628 4.628 0 004.622-4.625h.762c-.004 2.97-2.42 5.388-5.388 5.388z' fill='%23fff'/%3E%3Cpath d='M5.075 45.637H2.061l-.739 2.017H0l2.949-7.531h1.253l3.018 7.532H5.83l-.755-2.018zm-2.633-1.026H4.69l-.804-2.158c-.11-.298-.22-.626-.327-.988-.096.32-.202.645-.317.976l-.8 2.17zM7.818 43.418c0-.416-.015-.874-.042-1.373H8.98c.046.233.077.469.096.713.499-.545 1.07-.816 1.714-.816.374 0 .72.095 1.04.282.32.19.576.488.774.893.194.408.293.922.293 1.552 0 .656-.11 1.216-.335 1.678a2.421 2.421 0 01-.938 1.056c-.4.24-.864.358-1.39.358-.381 0-.758-.064-1.128-.19v2.318L7.822 50v-6.582h-.004zm3.372 2.864c.263-.351.393-.866.393-1.54 0-.63-.107-1.084-.324-1.366a1.034 1.034 0 00-.865-.423c-.248 0-.48.057-.69.175-.21.118-.411.275-.602.473v3.005a2.3 2.3 0 00.949.202c.5.004.88-.172 1.14-.526zM13.712 43.418c0-.416-.015-.874-.042-1.373h1.204c.046.233.077.469.096.713.499-.545 1.07-.816 1.714-.816.374 0 .72.095 1.04.282.32.19.576.488.774.893.194.408.293.922.293 1.552 0 .656-.11 1.216-.335 1.678a2.421 2.421 0 01-.937 1.056c-.4.24-.865.358-1.391.358-.381 0-.758-.064-1.128-.19v2.318L13.716 50v-6.582h-.004zm3.376 2.864c.263-.351.392-.866.392-1.54 0-.63-.106-1.084-.323-1.366a1.034 1.034 0 00-.865-.423c-.248 0-.48.057-.69.175-.21.118-.411.275-.602.473v3.005a2.3 2.3 0 00.949.202c.495.004.876-.172 1.139-.526zM21.206 47.296a3.112 3.112 0 01-1.276-1.32c-.297-.571-.446-1.246-.446-2.028 0-.847.172-1.564.515-2.155a3.311 3.311 0 011.398-1.33c.59-.298 1.254-.447 1.985-.447.434 0 .846.05 1.238.145.393.095.758.225 1.098.393l-.328.987c-.682-.324-1.334-.488-1.955-.488-.522 0-.979.11-1.375.336a2.32 2.32 0 00-.918.984c-.217.434-.328.957-.328 1.571 0 .538.084 1.014.252 1.43.167.416.434.744.796.988.362.244.819.362 1.368.362.247 0 .499-.019.746-.06.248-.043.484-.104.701-.184v-1.522h-1.74v-.999h2.986v3.173a6.583 6.583 0 01-2.762.622c-.743.004-1.398-.149-1.955-.458zM30.557 47.655a4.53 4.53 0 01-.088-.744 2.437 2.437 0 01-.774.599 2.295 2.295 0 01-1.07.248c-.324 0-.617-.065-.88-.191a1.456 1.456 0 01-.633-.572c-.156-.256-.232-.565-.232-.934 0-.546.194-.98.587-1.305.392-.324 1.044-.484 1.958-.484.343 0 .682.023 1.017.072v-.106c0-.496-.106-.847-.316-1.05-.21-.201-.514-.304-.91-.304-.275 0-.568.038-.877.118-.312.08-.587.175-.819.286l-.202-.934a5.09 5.09 0 01.903-.286c.373-.088.77-.13 1.185-.13.484 0 .895.072 1.234.221.34.149.606.4.797.76.19.358.285.842.285 1.448v2.231c0 .233.016.584.042 1.057h-1.207zm-.766-1.041c.267-.13.484-.287.655-.477v-1.041a8.267 8.267 0 00-.857-.058c-.53 0-.895.084-1.098.256a.867.867 0 00-.304.694c0 .278.072.484.22.618.15.133.347.198.599.198.255 0 .518-.06.785-.19zM32.843 46.308V39.68l1.276-.103v6.503c0 .24.042.408.122.507.08.099.21.148.389.148.08 0 .19-.019.339-.057l.152.92c-.122.049-.27.087-.446.118-.175.03-.339.045-.495.045-.891-.004-1.337-.488-1.337-1.453zM36.04 46.308V39.68l1.276-.103v6.503c0 .24.042.408.122.507.08.099.21.148.389.148.08 0 .19-.019.339-.057l.152.92a2.2 2.2 0 01-.446.118c-.175.03-.339.045-.495.045-.892-.004-1.337-.488-1.337-1.453zM43.633 45.012h-3.665c.057 1.174.617 1.762 1.676 1.762.263 0 .534-.031.808-.096s.541-.148.793-.26l.282.878c-.63.305-1.33.458-2.115.458-.594 0-1.097-.11-1.505-.34a2.168 2.168 0 01-.922-.972c-.206-.423-.309-.93-.309-1.53 0-.621.11-1.155.328-1.601.217-.446.522-.79.91-1.026.39-.236.839-.355 1.35-.355.529 0 .97.126 1.325.374s.617.58.789.992c.171.411.255.87.255 1.365v.35zm-1.253-.816c-.023-.447-.138-.782-.34-1.007-.201-.225-.468-.336-.803-.336-.324 0-.599.11-.812.34-.217.225-.358.56-.423 1.003h2.378zM44.665 43.452c0-.309-.015-.778-.041-1.407h1.2a15.934 15.934 0 01.099 1.087c.148-.248.293-.454.438-.622.145-.168.312-.305.503-.412.19-.107.411-.16.655-.16.198 0 .366.02.51.061l-.16 1.114a1.418 1.418 0 00-.415-.058c-.3 0-.563.077-.788.233-.225.156-.465.408-.72.763v3.604h-1.277v-4.203h-.004zM48.803 49.95a3.287 3.287 0 01-.46-.11l.232-.935c.087.023.194.046.327.07a2.2 2.2 0 00.374.033c.567 0 .994-.366 1.276-1.098l.084-.206-2.069-5.655h1.376l1.04 3.161a10 10 0 01.327 1.243c.096-.404.21-.812.343-1.216l1.056-3.188H54L51.94 47.73c-.194.538-.404.968-.629 1.3a2.227 2.227 0 01-.796.733c-.309.16-.678.24-1.109.24a4.157 4.157 0 01-.602-.054z' fill='%23000'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-size: cover;
      height: 50px;

</style>
