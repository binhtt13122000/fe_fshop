<template>
  <div class="app">
    <v-app id="inspire">
      <v-app-bar
        :clipped-left="$vuetify.breakpoint.lgAndUp"
        app
        color="grey darken-3"
        dark
      >
        <v-toolbar-title class="ml-0 pl-4">
          <img
            class="header-main-logo-js"
            src="https://4menshop.com/logo.png"
            alt="4men"
          />
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-list-item-action class="right" style="width: 150px">
          <v-btn to="/loginpage">Sign in</v-btn>
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
                <v-card-text>
                  <v-text-field
                    class="form_group"
                    label="User Name"
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
                    label="Full Name"
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

                  <v-text-field
                    class="form_group"
                    id="password"
                    label="Confirm Password"
                    v-model="password"
                    name="password"
                    :rules="rules.passwordRules"
                    required
                    error-count="5"
                    prepend-icon="mdi-lock-open"
                    type="password"
                  ></v-text-field>
                  <div class="text-xs-center">
                    <v-btn class="" type="submit" color="success"
                      >Register</v-btn
                    >
                  </div>
                </v-card-text>
              </v-form>
              <br />
              <v-form align="center">
                <v-spacer></v-spacer>
                <hr
                  class="black accent-2 mb-4 mt-0 d-inline-block"
                  style="max-width: 300px; width: 100%"
                />
                <br />
                <a href="" class="googleIcon"
                  ><i class="fab fa-google fa-2x"></i>Login with Google</a
                >
              </v-form>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
      <v-divider></v-divider>
      <VmFooter></VmFooter>
    </v-app>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VmFooter from "../../components/Footer.vue";
export default {
  components: { VmFooter },
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
        .dispatch("auth/register", {
          userName: this.userName,
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
    },
    ...mapGetters("auth", ["user"]),
  },
  created() {
    if (!this.user) {
      this.$router.push("/products");
    }
  },
};
</script>

<style lang="scss">
.text-xs-center {
  text-align: center;
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