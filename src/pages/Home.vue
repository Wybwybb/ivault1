<template>
    <div>
      <h2>Password Management</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="account in accounts" :key="account.id">
            <td>{{ account.website }}</td>
            <td>{{ account.username }}</td>
            <td>{{ account.password }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axiosInstance from '../services/AxiosTokenInstance';
  import { mapGetters, mapMutations } from 'vuex';
  import {
    GET_USER_TOKEN_GETTER,
    LOADING_SPINNER_SHOW_MUTATION,
  } from '../store/storeconstants';
  
  export default {
    data() {
      return {
        accounts: [],
      };
    },
    computed: {
      ...mapGetters('auth', {
        token: GET_USER_TOKEN_GETTER,
      }),
    },
    mounted() {
      this.showLoading(true);
      axiosInstance
        .get(`https://your-api-url/accounts.json?auth=${this.token}`)
        .then((response) => {
          this.formatAccounts(response.data);
          this.showLoading(false);
        })
        .catch(() => {
          this.showLoading(false);
        });
    },
    methods: {
      ...mapMutations({
        showLoading: LOADING_SPINNER_SHOW_MUTATION,
      }),
      formatAccounts(accounts) {
        for (let key in accounts) {
          this.accounts.push({ ...accounts[key], id: key });
        }
        console.log(this.accounts);
      },
    },
  };
  </script>
  
  <style scoped></style>
  