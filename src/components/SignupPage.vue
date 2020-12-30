<template>
  <div id="app">
    <v-app id="inspire">
      <v-app id="inspire">
        <v-app-bar
          :clipped-left="$vuetify.breakpoint.lgAndUp"
          app
          color="blue darken-3"
          dark
        >
          <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
            <img
              class="header-main-logo-js"
              src="//static.chiccdn.com/web/assets/images/common/logo.png"
              alt="NewChic"
            />
            <span class="hidden-sm-and-down">2$</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn to="/"><v-icon>mdi-exit-to-app</v-icon></v-btn>
        </v-app-bar>

        <v-main>
          <v-container class="fill-height" fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="8" md="4">
                <h1 class="black--text" align="center">Sign in</h1>
                <v-spacer></v-spacer>
                <v-card-text>
                <v-form v-model="isValid">
                  <v-text-field
                      label="Fullname"
                      v-model="person.fullname"
                      :rules="fullnameRules" required error-count="3"

                      prepend-icon="mdi-account"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      label="username"
                      v-model="person.username"
                      :rules="usernameRules" required error-count="3"
                      name="username"
                      prepend-icon="mdi-rename-box"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      label="Email"
                      v-model="person.email"
                      :rules="emailRules" required error-count="2"
                      name="Email"
                      prepend-icon="mdi-email"
                      type="text"
                    ></v-text-field>
  
                    <v-text-field
                      id="password"
                      label="Password"
                      v-model="person.password"
                      name="password"
                      :rules="passwordRules" required error-count="5"
                      prepend-icon="mdi-lock"
                      type="password"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                  <v-form class="btnLoginCancel" align="right">
                    <v-spacer></v-spacer>
                    <v-btn gradient="gray" rounded class="z-depth-1a" @click="isHidden = !isHidden" :disabled="!isValid"
                      >Register</v-btn>
                  </v-form>
                    <br />
                    <v-alert v-if="!isHidden" dense text type="error">
                    Register fail. Please check your <strong>Input</strong>
                  </v-alert>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
import Auth from '../utils/AuthenticationService'
export default {
  props: {
    source: String,
  },
  data: () =>  ({
        isValid: true,
        isHidden: true,
        person: {
            fullname: null,
            username: null,
            email: null,
            password: null
        },
        fullnameRules: [ 
            v => !!v || 'Full name is required', 
            v => (v && v.length >= 2) || 'Password must have 5+ characters', 
        ],
        usernameRules: [
                        v => !!v || 'Full name is required', 
            v => (v && v.length >= 2) || 'Password must have 5+ characters', 
        ],
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [ 
            v => !!v || 'Password is required', 
            v => (v && v.length >= 5) || 'Password must have 5+ characters',
            v => /(?=.*[A-Z])/.test(v) || 'Must have one uppercase character', 
            v => /(?=.*\d)/.test(v) || 'Must have one number', 
        ],
        auth: null,
        created() {
            this.auth =  new Auth();
        },
    }),
    method: {

      reigster()  {
        const credentials = {
            fullname: this.fullname,
            username: this.username,
            email: this.email,
            password: this.password
        };
        this.isValid = false,
        this.$router.push({name: 'home'})
        this.auth.register(credentials).then(() => {
            //  if(response.status === 200){ 
                this.$router.push({ name: 'login', query: { redirect: '/' } })
            //}
            
        })
      }
    }
};
</script>

<style lang="scss">
@media only screen and (max-width: 850px) {
  .btnLoginCancel {
      text-align: center;
  }
}
</style>