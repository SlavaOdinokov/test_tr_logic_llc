<template>
  <div class="contacts-list-item">
    <p class="contacts-list-item__field">
      <span class="contacts-list-item__field-name">{{contact_item[0].name}}:</span>
      {{contact_item[0].value}}
    </p>
    <p class="contacts-list-item__field">
      <span class="contacts-list-item__field-name">{{contact_item[1].name}}:</span>
      {{contact_item[1].value}}
    </p>

    <div>
      <router-link :to="{ name: 'contact-single', params: {contact_data: contact_item, contact_index} }">
        <button class=" btn contacts-list-item__btn-contact">Open</button>
      </router-link>
      <button
        class="btn contacts-list-item__btn-del"
        @click="deleteContact"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'contacts-list-item',
    props: {
      contact_item: {
        type: Array,
        default() {
          return []
        }
      },
      contact_index: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {}
    },
    methods: {
      deleteContact() {
        this.$emit('deleteContact')
      }
    }
  }
</script>

<style lang="scss">
  .contacts-list-item {
    padding: 15px;
    margin-bottom: 15px;
    max-width: 400px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 0 8px 0 #b8b6b6;
    background: #fff;

    &__btn-del {
      width: 100px;
      margin-top: 10px;
      color: #e70e0e;
      border: 2px solid #e70e0e;
      background: transparent;
      &:hover {
        box-shadow: 0 0 10px 0 rgba(167, 14, 14, .7);
      }
    }
    &__btn-contact {
      width: 100px;
      margin-right: 10px;
      color: #fff;
      border: 2px solid #0060cf;
      background: #0060cf;
      &:hover {
        box-shadow: 0 0 12px 0 rgba(85, 132, 223, .7);
      }
    }
    &__field {
      margin-bottom: 10px;
    }
    &__field-name {
      font-weight: 700;
      font-size: 14px;
    }
  }
</style>
