<template>
  <div>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
      </v-card>
    </v-dialog>
    <Home :key="forceUpdate" v-on:InsideMethod="RenderNow"/>
  </div>
</template>

<script>
//import axios from "axios";
import Home from "./Home.vue";
export default {
  name: "profile",
  components: {
    Home
  },
  data() {
    return {
      forceUpdate: 0
    };
  },
  methods: {
    RenderNow() {
      this.forceUpdate += 1;
    }
  }
};
</script>

<style scoped>
#cover {
  background-image: url("~@/assets/cover.png");
  height: 300px;
  background-size: cover;
  font-family: verdana;
}

.profile {
  position: relative;
  border: solid 1px black;
  border-radius: 50%;
  margin-top: -150px;
}

.pp-name {
  position: relative;
  margin-top: -100px;
  color: white;
  font-size: 45px;
  -webkit-text-stroke-width: 2px;
  -webkit-text-stroke-color: black;
}

.main {
  width: 70%;
}
.pointer {
  cursor: pointer;
}
</style>
