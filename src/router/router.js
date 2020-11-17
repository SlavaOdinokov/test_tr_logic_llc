import Vue from 'vue'
import Router from 'vue-router'
import ContactsList from '../components/contacts-list/contacts-list'
import ContactSingle from '../components/contact-single/contact-single'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'contacts-list',
      component: ContactsList
    },
    {
      path: '/contact',
      name: 'contact-single',
      component: ContactSingle,
      props: true
    }
  ]
})

export default router
