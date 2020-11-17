<template>
  <div class="main-wrapper">
    <transition name="transition-page" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'main-wrapper',
    data() {
      return {}
    }
  }
</script>

<style lang="scss">
  .main-wrapper {
    max-width: 1140px;
    margin: 0 auto;
    padding: 50px 30px 0 30px;
  }

  .transition-page {
    &-enter, &-leave-to {
      opacity: 0;
      transform: translateX(-200px);
    }
    &-enter-active, &-leave-active {
      transition: all .6s ease;
    }
    &-enter-to, &-leave {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
