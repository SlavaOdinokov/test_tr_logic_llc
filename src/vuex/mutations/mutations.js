export default {
  SET_CONTACTS: (state, contact) => {
    state.contacts.push(contact)
  },
  REMOVE_CONTACT: (state, index) => {
    state.contacts.splice(index, 1)
  },
  SET_NEW_FIELD: (state, {newField, index}) => {
    state.contacts[index].push(newField)
  },
  REMOVE_FIELD: (state, {indexContact, indexField}) => {
    state.contacts[indexContact].splice(indexField, 1)
  },
  UPDATE: (state, {updatedField, indexContact, indexField}) => {
    state.contacts[indexContact].splice(indexField, 1, updatedField)
  }
}
