<template>
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <div>
          <div>
            <h3>Signup</h3>
            <hr />
          </div>
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>
          <form @submit.prevent="onSignup()">
            <div class="form-group">
              <label>First Name</label>
              <input type="text" class="form-control" v-model.trim="firstName" @input="capitalizeFirstLetter($event, 'firstName')" />
              <div class="error" v-if="firstNameError">{{ firstNameError }}</div>
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input type="text" class="form-control" v-model.trim="lastName" @input="capitalizeFirstLetter($event, 'lastName')" />
              <div class="error" v-if="lastNameError">{{ lastNameError }}</div>
            </div>
            <div class="form-group">
              <label>Contact Number</label>
              <input type="text" class="form-control" v-model.trim="contactNumber" @input="validateContactNumber" />
              <div class="error" v-if="contactNumberError">{{ contactNumberError }}</div>
            </div>
            <div class="form-group">
              <label>Username</label>
              <input type="text" class="form-control" v-model.trim="username" @input="capitalizeFirstLetter($event, 'username')" />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" class="form-control" v-model.trim="email" @input="validateEmail" />
              <div class="error" v-if="emailError">{{ emailError }}</div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <div class="input-group">
                <input class="form-control" v-model.trim="password" :type="showPassword ? 'text' : 'password'" />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="showPassword = !showPassword">
                    <i class="fa" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
                  </button>
                </div>
              </div>
            </div>
            <div class="form-group">
              <label>Confirm Password</label>
              <div class="input-group">
                <input class="form-control" v-model.trim="confirmPassword" :type="showConfirmPassword ? 'text' : 'password'" />
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary" type="button" @click="showConfirmPassword = !showConfirmPassword">
                    <i class="fa" :class="showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'"></i>
                  </button>
                </div>
              </div>
              <div class="error" v-if="password !== confirmPassword">
                Passwords do not match
              </div>
            </div>
            <div class="form-group">
              <label>OTP Code</label>
              <input type="text" class="form-control" v-model.trim="otpCode" />
            </div>
            <div class="my-3">
              <button type="submit" class="btn btn-primary">Create Account</button>
            </div>
            <div>
              <p>Resend Email</p> <!-- You can add a countdown timer here -->
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        firstName: '',
        lastName: '',
        contactNumber: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        otpCode: '',
        error: '',
        showPassword: false,
        showConfirmPassword: false,
        firstNameError: '',
        lastNameError: '',
        contactNumberError: '',
        emailError: ''
      };
    },
    methods: {
      ...mapActions('auth', ['signup']),
      async onSignup() {
        // Your signup logic here
        let validationsPassed = true;
        this.validateFirstName();
        this.validateLastName();
        this.validateContactNumber();
        this.validateEmail();
        if (this.firstNameError || this.lastNameError || this.contactNumberError || this.emailError || this.password !== this.confirmPassword) {
          validationsPassed = false;
        }
  
        if (validationsPassed) {
          try {
            await this.signup({
              firstName: this.firstName,
              lastName: this.lastName,
              contactNumber: this.contactNumber,
              username: this.username.charAt(0).toUpperCase() + this.username.slice(1), // Capitalize first letter of username
              email: this.email,
              password: this.password
            });
            // Redirect to home page after successful signup
            this.$router.push('/');
          } catch (error) {
            this.error = error;
          }
        }
      },
      capitalizeFirstLetter(event, field) {
        // Automatically capitalize the first letter of the field
        const value = event.target.value;
        if (value.length === 1) {
          this[field] = value.toUpperCase();
        } else if (value.length > 1 && value.charAt(value.length - 2) === ' ') {
          this[field] = value.slice(0, -1) + value.charAt(value.length - 1).toUpperCase();
        }
      },
      validateContactNumber() {
        // Validate contact number (numbers only)
        const regex = /^\d+$/;
        if (!regex.test(this.contactNumber)) {
          this.contactNumberError = 'Please enter a valid contact number (numbers only).';
        } else {
          this.contactNumberError = '';
        }
      },
      validateEmail() {
        // Validate email address
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(this.email)) {
          this.emailError = 'Please enter a valid email address.';
        } else {
          this.emailError = '';
        }
      }
    }
  };
  </script>
  