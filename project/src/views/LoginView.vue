<template>
  <div class="login padding-container">
    <v-container>
      <div class="login-container">
        <v-card>
          <form @submit.prevent="login" class="login-form">
            <h1>{{ register ? "Inscription" : "Connexion" }}</h1>
            <v-text-field
             data-cy="email"
              v-model="email"
              class="field"
              name="email"
              type="email"

              label="Adresse email"
              required
              append-icon="mdi-at"
            ></v-text-field>
            <!-- mdp -->
            <v-text-field
              data-cy="mdp"
              v-model="password"
              class="field"
              name="mdp"
              placeholder="password"

              label="Mot de passe"

              @click:append="changeEye"
              :append-icon="eye ? 'mdi-eye' : 'mdi-eye-off'"
              counter
            >
            </v-text-field>
                  <!--       :type="passwordType"
              :rules="passwordRules" -->
            <!-- confirm mdp -->
          <!--    <v-text-field
            data-cy="confirmmdp"
              v-if="register"
              v-model="confirmmdp"
              class="field"
              name="confirm-mdp"
              placeholder="password"
              :type="passwordType"
              :rules="confirmRules"
              label="Confirmation mot de passe"
              required
              @click:append="changeEye"
              :append-icon="eye ? 'mdi-eye' : 'mdi-eye-off'"
              counter
            >
            </v-text-field> -->
            <!-- register / login -->
            <div>
              <span data-cy="register"
                @click="register = !register"
                class="blue--text text-decoration-underline toggle-login"
                >{{
                  register
                    ? "Déjà un compte ? cliquez ici"
                    : "Pas encore de compte ? Inscrivez vous ici"
                }}</span
              >
            </div>
            <v-spacer class="mb-8"></v-spacer>
            <p class="red--text mx-auto">{{ error }}</p>
            <v-btn class="my-4" dark type="submit" data-cy="submitLogin">{{
              register ? "s'inscrire" : "se connecter"
            }}</v-btn>
          </form>
        </v-card>
        <v-snackbar v-model="snackbar" :timeout="timeout" color="success">
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",

  data() {
    return {
      eye: false,
      error: "",
      errors: [],
      snackbar: false,
      text: "",
      timeout: 2000,
      register: false,
      email: "",
      // emailRules: [
      //   (v) => !!v || "E-mail requis",
      //   (v) =>
      //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      //       v
      //     ) || "E-mail doit être valide. Ex: adresse@mail.fr",
      // ],
      password: "",
      confirmmdp: "",
      passwordType: "password",
      // passwordRules: [
      //   (v) => !!v || "Mot de passe requis",
      //   (v) =>
      //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      //       v
      //     ) ||
      //     "Le mot de passe doit être de longueur 8 et contenir au moins: 1 lettre majuscule, 1 lettre minuscule, 1 chiffre, 1 caractère spécial",
      // ],
      // confirmRules: [
      //   (v) => !!v || "Doit être identique au mot de passe",
      //   (v) =>
      //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
      //       v
      //     ) ||
      //     "Le mot de passe doit être de longueur 8 et contenir au moins: 1 lettre majuscule, 1 lettre minuscule, 1 chiffre, 1 caractère spécial",
      // ],
      token: "",

      disabled: false,
    };
  },

  methods: {
    changeEye() {
      if (this.eye) {
        this.eye = false;
        this.passwordType = "password";
      } else {
        this.eye = true;
        this.passwordType = "text";
      }
    },
    login() {
      this.errors = [];
      if (!this.email) {
        this.errors.push("Email required.");
      }
      // else if (!this.validEmail(this.email)) {
      //   this.errors.push("Valid email required.");
      // }
      if (!this.password) {
        this.errors.push("Password required");
      }
      // else if (!this.validPassword(this.password)) {
      //   this.errors.push("Valid password required.");
      // }
      // if (this.register) {
      //   if (this.password !== this.confirmmdp) {
      //     this.errors.push(
      //       "le mot de passe et la confirmation doivent être identique"
      //     );
      //   }
      // }

      // if (!this.errors.length) {
        axios
          .post(
            `http://localhost:3000/api/user/${
              this.register ? "signup" : "login"
            }`,
            {
              email: this.email,
              password: this.password,
            }
          )
          .then((response) => {
            this.token = response.data.token;
            let jwt = this.token;
            if (!this.register) {
              localStorage.setItem("jwt", jwt);
              this.$router.push("/");
              setTimeout(window.location.reload(), 1000);
            }
            axios.defaults.headers.common = {
              Authorization: `Bearer ${jwt}`,
            };
            this.snackbar = true;
            this.register
              ? (this.text = "vous êtes bien inscrit")
              : (this.text = "vous êtes connectés");
          })
          .catch((err) => {
            this.error = err.request.response;
            console.log(err.request)
          });
        return true;
      // }
    },
    validEmail: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validPassword: function (password) {
      var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
      return re.test(password);
    },
  },
};
</script>
<style>
.login-img {
  display: none;
}
.login-form {
  display: flex;
  flex-direction: column;
  margin: 1rem;
}
.toggle-login {
  cursor: pointer;
}
.login-container {
  width: 300px;
  margin: auto;
}
@media screen and (min-width: 768px) {
  .login-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
  .login-form {
    width: 300px;
  }
  .login-img {
    display: block;
    height: 100%;
  }
}
@media screen and (min-width: 1024px) {
  .login-form {
    width: 400px;
  }
}
</style>
