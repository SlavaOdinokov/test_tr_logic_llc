import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions/actions'
import mutations from './mutations/mutations'
import getters from './getters/getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    contacts: [
      [
        {
          id: '11',
          name: 'name',
          value: 'Jack',
          oldName: 'name',
          oldValue: 'Jack',
          isEdit: false
        },
        {
          id: '22',
          name: 'number',
          value: '89997779999',
          oldName: 'number',
          oldValue: '89997779999',
          isEdit: false
        }
      ],
      [
        {
          id: '11',
          name: 'name',
          value: 'Jhon',
          oldName: 'name',
          oldValue: 'Jhon',
          isEdit: false
        },
        {
          id: '22',
          name: 'number',
          value: '81115551111',
          oldName: 'number',
          oldValue: '81115551111',
          isEdit: false
        }
      ],
      [
        {
          id: '11',
          name: 'name',
          value: 'Leo',
          oldName: 'name',
          oldValue: 'Leo',
          isEdit: false
        },
        {
          id: '22',
          name: 'number',
          value: '83337774444',
          oldName: 'number',
          oldValue: '83337774444',
          isEdit: false
        }
      ]
    ]
  },
  mutations,
  actions,
  getters
})

export default store
