<template>
  <div class="home" id="app">
    <h1>Login</h1>
    <br>
    <input class="form-control" v-model="nama" type="text" placeholder="Name">
    <br><br>
    <input class="form-control" v-model="nik" type="text" placeholder="NIK">
    <br><br>
    <input class="form-control" v-model="username" type="text" placeholder="Username">
    <br><br>
    <input type="password" placeholder="Password" v-model="password">
    <br><br>
    <button @click="login">Save</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'RegisterForm',
  data() {
    return {
      username: '',
      password: '',
      nama: '',
      nik: '',
    };
  },
  methods: {
    async login() {
      axios.post('https://barcodeapk.herokuapp.com/dosen/add/', {
        nama: this.nama,
        nik: this.nik,
        username: this.username,
        password: this.password,
      }).then((value) => {
        console.log(value.data.messages);
        alert('Registrasi Success');
        window.location.href = '/';
      });
    },
  },
};
</script>

<style scoped>

</style>
