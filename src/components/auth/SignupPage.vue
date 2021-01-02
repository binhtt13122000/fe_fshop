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
          <span class="hidden-sm-and-down">2$</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>
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
                <v-card-text>
                  <v-text-field
                    class="form_group"
                    label="userName"
                    v-model="userName"
                    :rules="rules.usernameRules"
                    required
                    error-count="3"
                    name="userName"
                    prepend-icon="mdi-account"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    class="form_group"
                    label="name"
                    v-model="name"
                    :rules="rules.nameRules"
                    required
                    error-count="3"
                    name="name"
                    prepend-icon="mdi-rename-box"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    class="form_group"
                    label="Email"
                    v-model="email"
                    :rules="rules.emailRules"
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
                    :rules="rules.passwordRules"
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
                </v-card-text>
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
      name: "",
      userName: "",
      email: "",
      password: "",
      rules: {
        usernameRules: [
          (v) => !!v || "Full name is required",
          (v) => (v && v.length >= 2) || "User name  must have 5+ characters",
        ],
        nameRules: [
          (v) => !!v || "Full name is required",
          (v) => (v && v.length >= 2) || "Full name  must have 5+ characters",
        ],
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) =>
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            "E-mail must be valid",
        ],
        passwordRules: [
          (v) => !!v || "Password is required",
          (v) => (v && v.length >= 5) || "Password must have 5+ characters",
          (v) => /(?=.*[A-Z])/.test(v) || "Must have one uppercase character",
          (v) => /(?=.*\d)/.test(v) || "Must have one number",
        ],
      },
    };
  },
  methods: {
    register() {
      console.log("login fuction from components.......");
      this.$store
        .dispatch("AUTH/register", {
          userName: this.userName,
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
      console.log("login fuction from components.1221......");
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