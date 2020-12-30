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
                      label="Login"
                      v-model="person.username"
                      :rules="[(v) => !!v || 'username is required']"
                      required
                      name="login"
                      prepend-icon="mdi-account"
                      type="text"
                    ></v-text-field>

                    <v-text-field
                      id="password"
                      label="Password"
                      v-model="person.password"
                      :rules="[(v) => !!v || 'Password is required']"
                      required
                      name="password"
                      prepend-icon="mdi-lock"
                      type="password"
                    ></v-text-field>
                    <div class="create-forgot">
                      <v-list-item-action>
                        <router-link class="right" to="/signupPage"
                          >Create account</router-link
                        >
                      </v-list-item-action>
                      <v-list-item-action>
                        <router-link class="left" to="/forgotpasswordForm"
                          >Forgot password ?</router-link
                        >
                      </v-list-item-action>
                      <!-- <p>
                        <router-link class="right" to="/signupPage"
                          >Create account</router-link
                        >
                      </p>
                      <p>
                        <router-link class="left" to="/forgotpasswordForm"
                          >Forgot password ?</router-link
                        >
                      </p> -->
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
                    @click="isHidden = !isHidden"
                    >Login
                  </v-btn>
                </v-form>
                <br />
                <h3 align="left">Or</h3>
                <br />

                <v-spacer></v-spacer>
                <v-form align="center">
                  <v-spacer></v-spacer>
                  <v-btn color="white" to="/"
                    ><v-icon>mdi-google</v-icon></v-btn
                  >
                </v-form>
                <br />
                <v-alert v-if="!isHidden" dense text type="error">
                  Login fail. Please check your <strong>username</strong> or
                  <strong>password</strong>
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
import Auth from "../utils/AuthenticationService";
export default {
  data: () => ({
    isValid: true,
    isHidden: true,
    person: {
      username: null,
      password: null,
    },
  }),
  auth: null,
  created() {
    this.auth = new Auth();
  },
  method: {
    // login() {
    //   <v-alert dense border="left" type="warning">
    //     I'm a dense alert with the of warning
    //   </v-alert>;
    //   const credentials = {
    //     username: this.username,
    //     password: this.password,
    //   };
    // const response = auth.login(credentials);
    // this.msg = response.msg;
    //   this.auth.login(credentials).then((response) => {
    //     if (response.status === 200) {
    //         this.$toast.add({
    //           severity: "success",
    //           summary: "Success Message",
    //           detail: "Order submitted",
    //           life: 3000,
    //         });
    //       this.$router.push("/about");
    //     } else {
    //         this.$toast.add({
    //           severity: "error",
    //           summary: "Error Message",
    //           detail: "Order submitted",
    //           life: 3000,
    //         });
    //     }
    //   });
    // },
    redict() {},
  },
};
</script>

<style lang="scss">
// .create-forgot ul li router-link {
//   text-decoration: none;
//   list-style: none;
//   // display: inline;
// }
.create-forgot .left {
  text-align: right;
  text-decoration: none;
  list-style: none;
}

@media only screen and (max-width: 850px) {
  .btnLoginCancel {
    text-align: center;
  }
}
</style>