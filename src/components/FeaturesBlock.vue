<template>
  <div class="special-appgallery-features">
    <div class="special-appgallery-features__item"
      v-for="(feature, index) in data.features"
      :key="index">
      <div class="special-appgallery-features__title">{{feature.title}}</div>
      <div class="special-appgallery-features__desc">{{feature.desc}}</div>
    </div>

  </div>
</template>

<script>
import data from '../data/data';

export default {
  name: 'FeaturesBlock',
  data() {
    return {
      data,
    };
  },
};
</script>

<style lang="stylus">
.special-appgallery-features
  display: flex;
  flex-flow: row wrap;
  margin-left: -15px;
  margin-right 100px
  @media (max-width 520px)
    margin-right 0
  &__item
    flex:1 1 auto;
    text-align:center;
    max-width: 135px;

    margin: 7px 10px;

    @media (max-width 520px)
      max-width: 113px;
  &__title
    background: #FFEAC7;
    border-radius: 8px;
    padding 13px 20px;
    color: #E5A63E;
    font-weight: 500;
    font-size: 24px;
    line-height: 24px;

    @media (max-width 520px)
      font-size: 16px;
      line-height: 20px;

  &__desc
    font-size: 16px;
    line-height: 21px;
    margin-top: 7px;
</style>
