<template>
  <div>
    <router-link :to="{ name: 'contacts-list' }">
      <button class="btn-back btn contacts-list-item__btn-contact">
        <i class="material-icons">keyboard_arrow_left</i>
        Back
      </button>
    </router-link>

    <div class="contact-single">
      <div v-for="(item, index) in contact_data" :key="index">
        <div class="contact-single__item">
          <div v-if="item.isEdit" class="contact-single__value">editing...</div>
          <div v-else>
            <span class="contact-single__label">{{item.name}}</span>
            <span class="contact-single__value">{{item.value}}</span>
          </div>

          <div class="contact-single__btn-group">
            <i
              @click="editEnter(item, index)"
              class="material-icons contact-single__icon"
              title="edit"
            >edit</i>
            <i
              v-if="item.name !== 'name' && item.name !== 'number'"
              @click="deleteField(index)"
              class="material-icons contact-single__icon"
              title="delete"
            >delete_forever</i>
            <i
              @click="undoLastEdit(item, index)"
              class="material-icons"
              title="undo last edit"
            >undo</i>
          </div>

          <transition name="transition-edit">
            <div v-if="item.isEdit" class="edit">
              <h3 class="edit__title">Edit field</h3>
              <label
                class="new-field__label"
                v-if="item.name !== 'name' && item.name !== 'number'"
              >
                <span class="new-field__label-name">Name:</span>
                <input
                  type="text"
                  class="new-field__input"
                  v-model="item.name"
                />
              </label>
              <span v-else class="edit__label-name">{{item.name}}</span>

              <label class="new-field__label">
                <span class="new-field__label-name">Value:</span>
                <input
                  type="text"
                  class="new-field__input"
                  v-model="item.value"
                />
              </label>

              <div class="edit__btn-group">
                <span @click="saveChanges(item, index)" class="edit__btn edit__btn-save">Save</span>
                <span @click="editCancel(item, index)" class="edit__btn">Cancel</span>
              </div>
            </div>
          </transition>
        </div>
      </div>

      <div class="new-field">
        <div class="new-field__title-wrapper">
          <h4 class="new-field__title">New Field</h4>
          <transition name="error">
            <p class="new-field__error" v-if="errors.length">{{errors[0]}}</p>
          </transition>
        </div>

        <label class="new-field__label">
          <span class="new-field__label-name">Name:</span>
          <input
            type="text"
            class="new-field__input"
            v-model="newField.name"
          />
        </label>

        <label class="new-field__label">
          <span class="new-field__label-name">Value:</span>
          <input
            type="text"
            class="new-field__input"
            v-model="newField.value"
          />
        </label>

        <button
          class="new-field__btn contacts-list__btn btn"
          @click="addNewField"
        >
          Add
        </button>
      </div>
    </div>

    <!-- Modal сonfirmation of field deletion -->
    <popup
      v-if="isPopupConfirmDelete"
      popupName="Are you sure?"
      @closePopup="isPopupConfirmDelete = !isPopupConfirmDelete"
    >
      <div class="confirm">
        <span
          class="confirm__btn"
          @click="confirmationDelete"
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
  import { mapActions } from 'vuex'
  import Popup from '../popup/popup'

  export default {
    name: 'contact-single',
    components: { Popup },
    props: {
      contact_data: {
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
      return {
        newField: {
          id: '',
          name: '',
          value: '',
          oldName: '',
          oldValue: '',
          isEdit: false
        },
        isPopupConfirmDelete: false,
        indexField: 0,
        errors: []
      }
    },
    methods: {
      ...mapActions([
        'ADD_NEW_FIELD',
        'DELETE_FIELD',
        'UPDATE_FIELD'
      ]),
      addNewField() {
        if (this.checkInput()) {
          this.ADD_NEW_FIELD({
            newField: {
              id: Date.now().toLocaleString(),
              name: this.newField.name,
              value: this.newField.value,
              oldName: this.newField.name,
              oldValue: this.newField.value,
              isEdit: false
            },
            index: this.contact_index
          })
          this.newField.name = ''
          this.newField.value = ''
        }
      },
      deleteField(index) {
        this.isPopupConfirmDelete = true
        this.indexField = index
      },
      confirmationDelete() {
        this.DELETE_FIELD({
          indexContact: this.contact_index,
          indexField: this.indexField
        })
        this.isPopupConfirmDelete = false
      },
      editEnter(item, index) {
        this.contact_data[index].oldName = item.name
        this.contact_data[index].oldValue = item.value
        this.contact_data.map(item => item.isEdit = false)
        this.contact_data[index].isEdit = true
      },
      editCancel(item, index) {
        this.contact_data[index].name = item.oldName
        this.contact_data[index].value = item.oldValue
        this.contact_data[index].isEdit = false
      },
      saveChanges(item, index) {
        this.UPDATE_FIELD({
          updatedField: item,
          indexContact: this.contact_index,
          indexField: index
        })
        this.contact_data[index].isEdit = false
      },
      undoLastEdit(item, index) {
        this.UPDATE_FIELD({
          updatedField: {
            ...item,
            name: item.oldName,
            value: item.oldValue
          },
          indexContact: this.contact_index,
          indexField: index
        })
      },
      checkInput() {
        const checkField = this.contact_data.find(item => {
          return item.name.toLowerCase() === this.newField.name.toLowerCase()
        })

        if (this.newField.name && this.newField.value && !checkField) {
          return true
        }

        this.errors = []

        if (!this.newField.name) {
          this.errors.push('Enter name field')
          this.hideError()
        }
        if (!this.newField.value) {
          this.errors.push('Enter value field')
          this.hideError()
        }
        if (checkField) {
          this.errors.push('Field already exists')
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
  .btn-back {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 15px;
    margin: 0;
    margin-bottom: 20px;
  }

  .contact-single {
    width: 400px;
    box-shadow: 0 0 8px 0 #b8b6b6;
    padding: 30px;
    background: #fff;

    &__title {
      margin-bottom: 30px;
      padding-bottom: 5px;
      border-bottom: 1px solid #e7e7e7;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
    }
    &__btn-group {
      display: flex;
    }
    &__item {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
      padding-bottom: 5px;
      border-bottom: 1px solid #e7e7e7;
    }
    &__label {
      position: absolute;
      top: -20px;
      left: 0;
      font-size: 14px;
      color: #00af60;
    }
    &__icon {
      margin-right: 10px;
    }
  }

  .new-field {
    padding-top: 10px;

    &__title {
      margin-bottom: 10px;
    }
    &__title-wrapper {
      display: flex;
    }
    &__label {
      display: block;
      margin-bottom: 10px;
      max-width: 270px;
      font-size: 14px;
      font-weight: 500;
    }
    &__label-name {
      display: inline-block;
      width: 50px;
      margin-right: 10px;
    }
    &__input {
      padding: 2px 5px;
      font-size: 16px;
      font-family: 'Roboto', sans-serif;
      color: #2c3e50;
      font-weight: 500;
      border: none;
      border-bottom: 1px solid #000;
      &:focus {
        border-bottom: 1px solid #00af60;
      }
    }
    &__btn {
      margin-top: 15px;
    }
    &__error {
      margin-left: 15px;
      color: #d80808;
    }
  }

  .edit {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateX(120%);
    padding: 15px;
    background: #fff;
    box-shadow: 0 0 16px 0 #b8b6b6;
    border-radius: 4px;

    &__title {
      display: inline-block;
      font-size: 18px;
      margin-bottom: 10px;
      margin-right: 7px;
    }
    &__label-name {
      font-size: 18px;
      font-weight: 700;
      color: #00af60;
    }
    &__btn-group {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
    }
    &__btn {
      display: block;
      font-size: 18px;
      cursor: pointer;
      transition: all .2s;
      &:hover {
        color: #d80808;
      }
    }
    &__btn-save {
      margin-right: 20px;
      &:hover {
        color: #00af60;
      }
    }
  }

  .transition-edit {
    &-enter, &-leave-to {
      opacity: 0;
    }
    &-enter-active, &-leave-active {
      transition: all .2s;
    }
    &-enter-to, &-leave {
      opacity: 1;
    }
  }
</style>
