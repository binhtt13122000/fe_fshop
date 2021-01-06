<template>
  <div class="app">
    <v-app id="inspire">
      <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="grey darken-3"
        dark
      >
        <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
          <img
            class="header-main-logo-js"
            src="https://4menshop.com/logo.png"
            alt="4men"
          />
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-list-item-action class="right" style="width: 150px">
          <v-btn to="/signuppage">Sign up</v-btn>
        </v-list-item-action>
        <v-list-item-action class="left">
          <v-btn to="/"><v-icon>mdi-exit-to-app</v-icon></v-btn>
        </v-list-item-action>
      </v-app-bar>
      <v-main>
        <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <h1 class="black--text" align="center">Sign in</h1>
              <v-spacer></v-spacer>
              <v-form @submit.prevent="login()">
                <v-card-text>
                  <v-text-field
                    class="form_group"
                    label="username"
                    v-model="username"
                    :rules="[(v) => !!v || 'username is required']"
                    required
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>

                  <v-text-field
                    class="form_group"
                    id="password"
                    label="Password"
                    v-model="password"
                    :rules="[(v) => !!v || 'Password is required']"
                    required
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>

                  <div class="create-forgot">
                    <p class="right" align="right">
                      <router-link to="/forgotpasswordForm"
                        >Forgot password ?</router-link
                      >
                    </p>
                  </div>
                  <div class="text-xs-center">
                    <v-btn class="" type="submit" color="success">Login</v-btn>
                  </div>
                </v-card-text>
              </v-form>
              <br />
              <v-spacer></v-spacer>
              <v-form align="center">
                <v-spacer></v-spacer>
                <hr
                  class="black accent-2 mb-4 mt-0 d-inline-block mx-auto"
                  style="width: 300px"
                />
                <br />
                <a href="" class="googleIcon"
                  ><i class="fab fa-google fa-2x"></i>Login with Google</a
                >
              </v-form>
              <br />
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
// import Axios from 'axios';
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      console.log("login fuction from components.......");
      this.$store
        .dispatch("auth/login", {
          username: this.username,
          password: this.password,
        })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
    //  login() {
    //   Axios.post('http://localhost:8082/v1/api/users/login', {username: this.username,
    //     password: this.password,}).then(response => {
    //       console.log(response)
    //     }).catch(()=> {
    //       console.log("-----Errror")
    //     })
    // }
  },
};
</script>

<style lang="scss">
.create-forgot .right {
  text-decoration: none;
  list-style: none;
}

.text-xs-center {
  text-align: right;
}
.fa-google {
  background: conic-gradient(
      from -45deg,
      #ea4335 110deg,
      #4285f4 90deg 180deg,
      #34a853 180deg 270deg,
      #fbbc05 270deg
    )
    73% 55%/150% 150% no-repeat;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
}
.googleIcon {
  text-decoration: none;
}
@media only screen and (max-width: 850px) {
  .text-xs-center {
    text-align: center;
  }
}
</style>