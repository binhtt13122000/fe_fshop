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
              src="https://4menshop.com/logo.png"
              alt="4men"
            />
            <span class="hidden-sm-and-down">2$</span>
          </v-toolbar-title>
  
          <v-spacer></v-spacer>
          <v-list-item-action  class="right" style="width: 150px">
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
                <v-card-text>
                  <v-form >
                    <v-text-field
                      label="Login"
                      v-model="username"
                      :rules="[(v) => !!v || 'username is required']"
                      required
                      name="login"
                      prepend-icon="mdi-account"
                      type="text"
                    ></v-text-field>

                    <v-text-field
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
                  </v-form>
                </v-card-text>
                <v-form class="btnLoginCancel" align="right">
                  <v-spacer></v-spacer>
                  <v-btn
                    gradient="gray"
                    rounded
                    class="z-depth-1a"
                    :disabled="!isValid"
                    v-on:click="login"
                    >Login
                  </v-btn>
                </v-form>
                <br />
                <h3 align="center">Or</h3>
                <br />

                <v-spacer></v-spacer>
                <v-form align="center">
                  <v-spacer></v-spacer>
                  <v-btn color="white" to="/"
                    ><v-icon>mdi-google</v-icon></v-btn
                  >
                </v-form>
                <br />
                <!-- <v-alert v-if="!isHidden" dense text type="error">
                  Login fail. Please check your <strong>username</strong> or
                  <strong>password</strong>
                </v-alert> -->
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    isValid: true,
    isHidden: true,
    username: '',
    password: '',
  }),

  method: {
    login() {
      console.log("login fuc.......");
    }
  },
};
</script>

<style lang="scss">

.create-forgot .right {
  text-decoration: none;
  list-style: none;
}

@media only screen and (max-width: 850px) {
  .btnLoginCancel {
    text-align: center;
  }
}
</style>