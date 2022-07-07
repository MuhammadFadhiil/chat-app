import Vue from 'vue'
import Router from 'vue-router'
import JoinRoom from '@/components/JoinRoom'
import ChatRoom from '@/components/ChatRoom'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'JoinRoom',
      component: JoinRoom
    },
    {
      path: '/chat-room/:id/:username',
      name: 'ChatRoom',
      component: ChatRoom
    }
  ]
})
