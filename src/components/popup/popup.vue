<template>
  <transition name="transition-popup" appear>
    <div class="overlay" ref="overlay">
      <div class="popup">
        <div class="popup__header">
          <span class="popup__title">{{popupName}}</span>
          <span>
            <i
              class="material-icons"
              @click="closePopup"
            >
              close
            </i>
          </span>
        </div>

        <div class="popup__content">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'popup',
    props: {
      popupName: {
        type: String,
        default: 'Popup name'
      }
    },
    data() {
      return {}
    },
    methods: {
      closePopup() {
        this.$emit('closePopup')
      }
    },
    mounted() {
      document.addEventListener('click', item => {
        if (item.target === this.$refs['overlay']) {
          this.closePopup()
        }
      })
    }
  }
</script>

<style lang="scss">
  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, .3);
    z-index: 2;
  }

  .popup {
    padding: 30px 40px;
    position: absolute;
    top: 15%;
    left: 50%;
    transform: translateX(-50%);
    min-width: 300px;
    max-width: 500px;
    background: #fff;
    z-index: 3;
    border-radius: 4px;

    &__header {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 45px;
    }
    &__content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    &__title {
      font-size: 22px;
    }
  }

  .transition-popup {
    &-enter, &-leave-to {
      opacity: 0;
    }
    &-enter-active, &-leave-active {
      transition: all .3s ease;
    }
    &-enter-to, &-leave {
      opacity: 1;
    }
  }
</style>
