<template>
  <b-row>
    <b-col cols="12">
      <h2>
        {{ this.$route.params.id }}
      </h2>
      <b-list-group class="panel-body" v-chat-scroll>
        <b-list-group-item v-for="(item) in chats" class="chat" :key="item.id">

          <div class="right clearfix mb-4" v-if="item.username === username">
            <div class="chat-body clearfix">
              <p>{{ item.message }}</p>
            </div>
          </div>

          <div class="left clearfix mb-4" v-else>
            <div class="header">
              <p class="primary-font">{{ item.username }}</p>
            </div>
            <div class="chat-body clearfix">
              <p>{{ item.message }}</p>
            </div>
          </div>

        </b-list-group-item>
      </b-list-group>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors" :key="error">
          {{error.message}}
        </li>
      </ul>
      <b-form @submit="onSubmit" class="chat-form">
        <b-input-group class="inp-group" id="fieldsetHorizontal" horizontal>
          <b-form-input class="submit-chat" id="message" v-model.trim="chat.message" placeholder="Message here..."></b-form-input>
          <b-input-group-append>
            <b-btn class="button-send" type="submit" variant="info">
              <b-icon icon="arrow-up" aria-hidden="true"></b-icon>
            </b-btn>
          </b-input-group-append>
        </b-input-group>
        </b-form>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'
import Vue from 'vue'
import VueChatScroll from 'vue-chat-scroll'
import * as io from 'socket.io-client'
Vue.use(VueChatScroll)

export default {
  name: 'ChatRoom',
  data () {
    return {
      chats: [],
      errors: [],
      username: this.$route.params.username,
      chat: {},
      socket: io('http://localhost:4000')
    }
  },
  created () {
    axios.get(`http://localhost:3000/api/chat/${this.$route.params.id}`)
      .then(response => {
        this.chats = response.data.chats
      })
      .catch(e => {
        this.errors.push(e)
      })

    // Check the connection to socket io server
    this.socket.on('connect_error', (err) => {
      console.log(`created connect_error due to ${err.message}`)
    })

    this.socket.on('new-message', function (data) {
      if (data.room === this.$route.params.id) {
        console.log(data)
        this.chats.push(data)
      }
    }.bind(this))
  },
  methods: {
    logout () {
      this.socket.emit('save-message', { room: this.chat.room, username: this.chat.username, message: this.chat.username + ' left this room', created_date: new Date() })
      this.$router.push({
        name: 'JoinRoom'
      })
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.chat.room = this.$route.params.id
      this.chat.username = this.$route.params.username
      axios.post(`http://localhost:3000/api/chat`, this.chat)
        .then(response => {
          this.socket.emit('save-message', response.data.chat)
          this.chat.message = ''

          // Check the connection to socket io server
          this.socket.on('connect_error', (err) => {
            console.log(`onsubmit connect_error due to ${err.message}`)
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
  .chat .left .chat-body {
    /* height: 50px;
    width: 50%; */
    text-align: left;
    margin-left: 100px;
    background: solid;
    background-color: #F6F6F6;
    border-radius: 15px;
  }

  .chat .right .chat-body {
    /* height: 50px;
    width: 50%; */
    text-align: right;
    margin-right: 100px;
    background: solid;
    background-color: #5db075;
    border-radius: 15px;
  }

  .header {
    text-align: left;
    margin-left: 100px;
    color: #000000;
  }

  .chat .left .chat-body p {
    margin: 0;
    color: #000000;
  }

  .chat .right .chat-body p {
    margin: 0;
    color: #E8E8E8;
  }

  .button-send {
    border: 2px solid rgba(103, 192, 103, 0.75);
    background: solid;
    background-color: #5db075;
  }

  .panel-body {
    overflow-y: scroll;
    height: 350px;
  }

  .chat-form {
    margin: 20px auto;
    width: 80%;
  }
</style>
