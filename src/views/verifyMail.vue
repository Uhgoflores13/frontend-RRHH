<template>
  <v-app>
    <v-main class="about">
      <v-container fluid fill-height>
        <v-row class="text-center">
          <v-col cols="12">
            <img src="../assets/img/SIS-HAZUL.png" :width="dinamicSize" />
          </v-col>
          <v-col cols="12">
            <p :class="dinamicClass">
              {{ message }}
            </p>
            <v-progress-circular v-if="message == ''" indeterminate color="blueMinsal" class="d-flex mx-auto"></v-progress-circular>
            <v-btn
              color="blueMinsal"
              class="mt-8"
              rounded
              @click="ejecutarMover()"
              text
              id="botomAction"
              style="text-transform:none"
              large
            >
              <p class="text-h6 ma-0">Regresar al login</p>
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
    move: 0,
    interval: null,
    message: "",
  }),
  methods: {
    mover() {
      this.move = this.move + 10;
    },
    async checkVerify() {
      let token = this.$route.params.token;
      try {
        const response = await this.http_client(
          `/api/v1/verificar-usuario/${token}`,
        );
        this.message = response.data.message || "Ha ocurrido un problema";
      } catch (e) {
        this.message = "Su correo electrónico no se ha podido verificar";
      }
    },
    ejecutarMover() {
      // const btn = document.getElementById('botomAction')
      // const x = document.getElementById('botomAction').getBoundingClientRect()
      // const ancho=screen.width
      // let positionX = 0
      // let interval=setInterval(() => {
      //     positionX  = btn.getBoundingClientRect().x
      //     if( positionX < ancho){
      //       this.mover()
      //     }else{
      //       this.move = x
      //       clearInterval(interval)
      //       this.ejecutarMover()
      //     }
      //   },1)
      this.$router.push("/login");
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
