<template>
  <div class="contacts-list">
    <h2 class="contacts-list__title">Contacts list</h2>
    <button
      class="contacts-list__btn btn"
      @click="isPopupAddContact = !isPopupAddContact"
    >
      Add contact
    </button>

    <div class="contacts-list__items" v-if="CONTACTS.length">
      <transition-group name="transition-list" class="transition-contacts-list">
        <contacts-list-item
          v-for="(item, index) in CONTACTS"
          :key="index"
          :contact_item="item"
          :contact_index="index"
          @deleteContact="deleteContact(index)"
        />
      </transition-group>
    </div>
    <p class="contacts-list__empty" v-else>No contacts yet</p>

    <!-- Modal add new contact -->
    <popup
      v-if="isPopupAddContact"
      popupName="Add contact"
      @closePopup="isPopupAddContact = !isPopupAddContact"
    >
      <div class="popup-add">
        <transition name="error">
          <p class="popup-add__error" v-if="errors.length">{{errors[0]}}</p>
        </transition>

        <label class="popup-add__label">
          <input
            class="popup-add__input"
            type="text"
            placeholder=" "
            v-model="newContactField.name"
          />
          <span class="popup-add__label-name">Name</span>
        </label>

        <label class="popup-add__label">
          <input
            class="popup-add__input"
            type="text"
            placeholder=" "
            v-model="newContactField.number"
          />
          <span class="popup-add__label-name">Number</span>
        </label>

        <button
          class="btn contacts-list__btn popup-add__btn"
          @click="addContact"
        >
          Add
        </button>
      </div>
    </popup>
    <!-- // -->

    <!-- Modal сonfirmation of contact deletion -->
    <popup
      v-if="isPopupConfirmDelete"
      popupName="Are you sure?"
      @closePopup="isPopupConfirmDelete = !isPopupConfirmDelete"
    >
      <div class="confirm">
        <span
          class="confirm__btn"
          @click="confirmDeleteContact"
        >Yes</span>
        <span
          class="confirm__btn"
          @click="isPopupConfirmDelete = !isPopupConfirmDelete"
        >No</span>
      </div>
    </popup>
    <!-- // -->

  </div>
</template>

<script>
  import ContactsListItem from './contacts-list-item'
  import Popup from '../popup/popup'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'contacts-list',
    components: { ContactsListItem, Popup },
    data() {
      return {
        newContactField: {
          id: '',
          name: '',
          number: '',
          oldName: '',
          oldValue: '',
          isEdit: false
        },
        isPopupAddContact: false,
        isPopupConfirmDelete: false,
        currentItemIndex: '',
        errors: []
      }
    },
    computed: {
      ...mapGetters([
        'CONTACTS'
      ])
    },
    methods: {
      ...mapActions([
        'ADD_CONTACT',
        'DELETE_CONTACT'
      ]),
      addContact() {
        if (this.checkInput()) {
          this.ADD_CONTACT([
            {
              id: Date.now().toLocaleString(),
              name: 'name',
              value: this.newContactField.name,
              oldName: 'name',
              oldValue: this.newContactField.name,
              isEdit: false
            },
            {
              id: Date.now().toLocaleString() + '123',
              name: 'number',
              value: this.newContactField.number,
              oldName: 'number',
              oldValue: this.newContactField.number,
              isEdit: false
            }
          ])
          this.newContactField.name = ''
          this.newContactField.number = ''
          this.isPopupAddContact = false
        }
      },
      deleteContact(index) {
        this.isPopupConfirmDelete = true
        this.currentItemIndex = index
      },
      confirmDeleteContact() {
        this.DELETE_CONTACT(this.currentItemIndex)
        this.isPopupConfirmDelete = false
      },
      checkInput() {
        if (this.newContactField.name && this.newContactField.number) {
          return true
        }

        this.errors = []

        if (!this.newContactField.name) {
          this.errors.push('Enter name')
          this.hideError()
        }
        if (!this.newContactField.number) {
          this.errors.push('Enter number')
          this.hideError()
        }
      },
      hideError() {
        setTimeout(() => {
          this.errors = []
        }, 7000)
      }
    }
  }
</script>

<style lang="scss">
  .contacts-list {
    &__title {
      margin-bottom: 20px;
    }
    &__btn {
      padding: 5px 15px;
      border: none;
      color: #fff;
      background: #4fc08d;
      box-shadow: 0 0 8px 0 rgba(121, 216, 173, .7);
      &:hover {
        box-shadow: 0 0 12px 0 rgba(9, 141, 82, .7);
      }
    }
    &__empty {
      margin-top: 30px;
      font-size: 20px;
    }
    &__items {
      margin-top: 30px;
    }
  }

  .popup-add {
    width: 100%;

    &__error {
      position: absolute;
      top: 65px;
      left: 40px;
      color: #d80808;
    }
    &__label {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 25px;
    }
    &__label-name {
      position: absolute;
      top: 8px;
      left: 5px;
      font-size: 14px;
      font-weight: 400;
      color: #797979;
      transition: .3s;
    }
    &__input {
      width: 250px;
      padding: 5px;
      font-size: 16px;
      font-family: 'Roboto', sans-serif;
      color: #2c3e50;
      font-weight: 500;
      border: none;
      border-bottom: 1px solid #000;
      transition: .3s;
      &:focus {
        border-bottom: 1px solid #00af60;
      }
    }
    &__input:focus + &__label-name,
    &__input:not(:placeholder-shown) + &__label-name {
      top: -12px;
      font-size: 12px;
      color: #00af60;
    }
    &__btn {
      min-width: 100px;
      margin-top: 15px;
    }
  }

  .confirm {
    display: flex;
    &__btn {
      display: block;
      margin: 0 20px;
      cursor: pointer;
      font-size: 20px;
    }
  }

  .error {
    &-enter, &-leave-to {
      opacity: 0;
    }
    &-enter-active, &-leave-active {
      transition: all .5s ease;
    }
    &-enter-to, &-leave {
      opacity: 1;
    }
  }

  .transition-contacts-list {
    display: flex;
    flex-direction: column;
  }
  .transition-list {
    &-enter, &-leave-to {
      transform: translateX(100px);
      opacity: 0;
    }
    &-enter-active, &-leave-active {
      transition: all .2s ease;
    }
    &-enter-to, &-leave {
      opacity: 1;
    }
  }
</style>
