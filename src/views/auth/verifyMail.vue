<template>
  <v-app>
    <v-main class="about">
      <v-container fluid fill-height>
        <v-row class="text-center">
          <v-col cols="12">
            <img src="../../assets/img/SIS-HAZUL.png" :width="dinamicSize" />
          </v-col>
          <v-col cols="12">
            <p :class="dinamicClass">
              {{ message }}
            </p>
            <v-progress-circular
              v-if="loading"
              indeterminate
              color="blueMinsal"
              class="d-flex mx-auto"
            ></v-progress-circular>
            <v-btn
              color="blueMinsal"
              class="mt-8"
              rounded
              :to="{name:'login'}"
              text
              id="botomAction"
              style="text-transform: none"
              large
            >
              Regresar al login
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: "verifyMail",
  data: () => ({
    loading:false,
    interval: null,
    message: "",
  }),
  methods: {
    async checkVerify() {
      try{
        this.loading=true
        const token = this.$route.params.token;
        const response=await this.services.auth.verifyAccount(token)
        this.message = response?.data.message || "Ha ocurrido un problema";
      }catch{
      }finally {
        this.loading=false
      }
    },
  },
  computed: {
    dinamicClass() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "text-h6";
        case "sm":
          return "text-h6";
        case "md":
          return "text-h4";
        case "lg":
          return "text-h3";
        case "xl":
          return "text-h3";
        case "2xl":
          return "text-h3";
      }
    },
    dinamicSize() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 300;
        case "sm":
          return 300;
        case "md":
          return 400;
        case "lg":
          return 500;
        case "xl":
          return 500;
        case "2xl":
          return 700;
      }
    },
  },
  created() {
    this.checkVerify();
  },
};
</script>
