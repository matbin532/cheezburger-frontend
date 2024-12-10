<template>
    <div class="text-center">
    <form class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="inputUsername" class="sr-only">Username</label>
      <input type="text" id="inputUsername" class="form-control" placeholder="Username" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="button" @click="login">Sign in</button>
    </form>
</div>
</template>

<script>
import { postData } from '@/services/api';
import Cookies from 'js-cookie';
import axios from 'axios';

axios.withCredentials = true;

export default {
    methods: {
        async login() {
            const username = document.getElementById('inputUsername').value;
            const password = document.getElementById('inputPassword').value;
            try {
                await postData('/users/login', { "username": username, "password": password });
                Cookies.get('refresh_token');
                localStorage.setItem('refresh_token', Cookies.get('refresh_token'));
                console.log(document.cookie);
                this.$router.push('/');
            } catch (error) {
                console.error('Error logging in:', error);
            }
        }
    }
}

</script>

<style scoped>

html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}


</style>

