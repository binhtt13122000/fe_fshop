<template>
  <div class="app">
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
              <v-form @submit.prevent="register()">
                    <v-text-field
                      class="form_group"
                      label="Fullname"
                      v-model="fullname"
                      :rules="[(v) => !!v || 'fullname is required']"
                      required
                      error-count="3"
                      prepend-icon="mdi-account"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      class="form_group"
                      label="username"
                      v-model="username"
                      :rules="[(v) => !!v || 'username is required']"
                      required
                      error-count="3"
                      name="username"
                      prepend-icon="mdi-rename-box"
                      type="text"
                    ></v-text-field>
                    <v-text-field
                      class="form_group"
                      label="Email"
                      v-model="email"
                      :rules="[(v) => !!v || 'username is required']"
                      required
                      error-count="2"
                      name="Email"
                      prepend-icon="mdi-email"
                      type="text"
                    ></v-text-field>

                    <v-text-field
                      class="form_group"
                      id="password"
                      label="Password"
                      v-model="password"
                      name="password"
                      :rules="[(v) => !!v || 'username is required']"
                      required
                      error-count="5"
                      prepend-icon="mdi-lock"
                      type="password"
                    ></v-text-field>
                    <div class="text-xs-center">
                      <v-btn class="" type="submit" color="success"
                        >Register</v-btn
                      >
                    </div>
                  </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fullname: "",
      username: "",
      email: "",
      password: "",
      registerAt: "",
      status: 1,
    //   fullnameRules: [
    //   (v) => !!v || "Full name is required",
    //   (v) => (v && v.length >= 2) || "Password must have 5+ characters",
    // ],
    // usernameRules: [
    //   (v) => !!v || "Full name is required",
    //   (v) => (v && v.length >= 2) || "Password must have 5+ characters",
    // ],
    // emailRules: [
    //   (v) => !!v || "E-mail is required",
    //   (v) =>
    //     /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
    //     "E-mail must be valid",
    // ],
    // passwordRules: [
    //   (v) => !!v || "Password is required",
    //   (v) => (v && v.length >= 5) || "Password must have 5+ characters",
    //   (v) => /(?=.*[A-Z])/.test(v) || "Must have one uppercase character",
    //   (v) => /(?=.*\d)/.test(v) || "Must have one number",
    // ],
    };
  },
  method: {
    register() {
      console.log("login fuction from components.......");
      this.$store
        .dispatch("AUTH/register", {
          fullname: this.fullname,
          username: this.username,
          email: this.email,
          password: this.password,
          is_admin: "ROL_1",
          registerAt: new Date(),
          status: 1,
        })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
.text-xs-center {
  text-align: right;
}
@media only screen and (max-width: 850px) {
  .text-xs-center {
    text-align: center;
  }
}
</style>