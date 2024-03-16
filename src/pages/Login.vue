<template>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div>
          <!-- Logo -->
          <div class="text-center mb-4">
            <img src="@/assets/ILogo.png" alt="Logo" width="250" height="100">
          </div>
          <div>
            <div>
              <h3>Login</h3>
              <hr />
            </div>
            <div class="alert alert-danger" v-if="error">
              {{ error }}
            </div>
            <form @submit.prevent="onLogin()">
              <!-- Email -->
              <div class="form-group">
                <label>Email</label>
                <input type="text" class="form-control" v-model.trim="email" />
                <div class="error" v-if="errors.email">
                  {{ errors.email }}
                </div>
              </div>
              <!-- Password -->
              <div class="form-group">
                <label>Password</label>
                <div class="input-group">
                  <input type="password" class="form-control" v-model.trim="password" />
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
                      <i class="fa" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
                    </button>
                  </div>
                </div>
                <div class="error" v-if="errors.password">
                  {{ errors.password }}
                </div>
              </div>
              <!-- Forgot Password -->
              <div class="text-right mb-3">
                <button class="btn btn-link">Forgot Password</button>
              </div>
              <!-- Login Button -->
              <div class="my-3">
                <button type="submit" class="btn btn-primary">Login</button>
              </div>
              <!-- Sign Up Button -->
              <div class="text-center">
                <p>Don't Have an Account? <button class="btn btn-link" @click="goToSignup">Sign up</button></p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  import SignupValidations from '../services/SignupValidations';
  import { LOGIN_ACTION } from '../store/storeconstants';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
        errors: [],
        error: '',
        showPassword: false
      };
    },
    methods: {
      ...mapActions('auth', { login: LOGIN_ACTION }),
      async onLogin() {
        let validations = new SignupValidations(this.email, this.password);
        this.errors = validations.checkValidations();
  
        if (this.errors.length) {
          return false;
        }
        this.error = '';
        
        try {
          await this.login({ email: this.email, password: this.password });
          this.$router.push('/Home');
        } catch (e) {
          this.error = e;
        }
      },
      goToSignup() {
        this.$router.push('/signup');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your component-specific styles here */
  </style>
  