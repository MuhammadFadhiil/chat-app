<template>
  <b-row>
    <b-col align-self="start">&nbsp;</b-col>
    <b-col cols="4" align-self="center">
    <h2>Join Chatroom</h2>
      <b-form @submit="onSubmit">
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  >
          <div class="mt-2">
            <b-form-input id="username" v-model.trim="chat.username" placeholder="Username"></b-form-input>
          </div>
          <div class="mt-4">
            <b-form-input id="roomid" v-model.trim="chat.roomid" placeholder="RoomID"></b-form-input>
          </div>
        </b-form-group>
        <div class="mt-4">
          <b-button class="btn btn-success btn-lg" type="submit" variant="success">Join</b-button>
        </div>
      </b-form>
    </b-col>
    <b-col align-self="end">&nbsp;</b-col>
  </b-row>
</template>

<script>
import axios from 'axios'
import * as io from 'socket.io-client'

export default {
  name: 'JoinRoom',
  data () {
    return {
      chat: {},
      socket: io('http://localhost:4000')
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.chat.room = this.chat.roomid
      this.chat.message = this.chat.username + ' join the room'
      axios.post(`http://localhost:3000/api/chat`, this.chat)
        .then(response => {
          this.socket.emit('save-message', { room: this.chat.room, username: this.chat.username, message: 'Join this room', created_date: new Date() })
          this.$router.push({
            name: 'ChatRoom',
            params: { id: this.chat.roomid, username: response.data.chat.username }
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>

<style>
.btn-success {
  font-family: Raleway-SemiBold;
  font-size: 13px;
  color: #f6f6f6;
  letter-spacing: 1px;
  line-height: 15px;
  border: 2px solid rgba(103, 192, 103, 0.75);
  border-radius: 40px;
  background: solid;
  background-color: #5db075;
  transition: all 0.3s ease 0s;
}
</style>
