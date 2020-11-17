export default {
  ADD_CONTACT({commit}, contact) {
    commit('SET_CONTACTS', contact)
  },
  DELETE_CONTACT({commit}, index) {
    commit('REMOVE_CONTACT', index)
  },
  ADD_NEW_FIELD({commit}, {newField, index}) {
    commit('SET_NEW_FIELD', {newField, index})
  },
  DELETE_FIELD({commit}, {indexContact, indexField}) {
    commit('REMOVE_FIELD', {indexContact, indexField})
  },
  UPDATE_FIELD({commit}, {updatedField, indexContact, indexField}) {
    commit('UPDATE', {updatedField, indexContact, indexField})
  }
}
