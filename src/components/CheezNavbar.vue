<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container">
        <router-link to="/" class="navbar-brand">Home</router-link>
  
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
  

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/topics" class="nav-link">Topics</router-link>
            </li>
          </ul>
          <!-- for debugging -->
           <button @click="logout">Remove token</button>
          <ul class="navbar-nav ms-auto">
            <li v-if="!user" class="nav-item">
              <router-link to="/login" class="nav-link">Log In</router-link>
            </li>
            <li v-if="!user" class="nav-item">
              <router-link to="/register" class="nav-link">Register</router-link>
            </li>
            <li v-if="user" class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img :src="user.pfp_url" alt="Profile Picture" class="rounded-circle" style="width: 30px; height: 30px; object-fit: cover;">
                {{ user.username }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><router-link to="/profile" class="dropdown-item">Edit Profile</router-link></li>
                <li><a class="dropdown-item" href="#" @click="logout">Log Out</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  import { getData } from '@/services/api';
  import Cookies from 'js-cookie';

  import axios from 'axios';
  axios.withCredentials = true;
  
  export default {
    data() {
      return {
        user: null
      };
    },
    computed: {
      userId() {
        console.log("token:", Cookies.get('refresh_token'));
        const token = Cookies.get('refresh_token');
        return token ? this.decodeToken(token).userID : null;
      }
    },
    async created() {
      if (this.userId) {
        try {
          const response = await getData(`/users/${this.userId}`);
          this.user = response;
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      }
    },
    methods: {
      decodeToken(token) {
        const payload = token.split('.')[1];
        const decoded = atob(payload);
        console.log("decoded:", decoded);
        return JSON.parse(decoded);
      },
      logout() {
        Cookies.remove('refresh_token');
        this.user = null;
        this.$router.push('/');
      }
    }
  };
  </script>
  
  <style scoped>
  .navbar {
    z-index: 1000;
  }
  
  .navbar-brand {
    font-weight: bold;
  }
  
  .nav-item {
    margin-left: 20px;
  }
  
  .dropdown-toggle {
    display: flex;
    align-items: center;
  }
  
  .dropdown-menu {
    min-width: 200px;
  }
  </style>
  