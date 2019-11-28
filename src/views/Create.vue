<template>
  <v-container>
    <v-card>
      <v-toolbar color="primary">
        <center>
          <h1>{{label}} Diary</h1>
        </center>
      </v-toolbar>
      <hr>
      <div class="c-width">
        <v-row>
          <v-textarea outlined name="input-7-4" label="Title" rows="1" v-model="title"/>
        </v-row>
        <v-row>
          <v-textarea outlined name="input-7-4" label="Content" rows="3" v-model="content"/>
        </v-row>
        <v-row>
          <v-col>
            <v-btn large block color="error" @click="$router.push({name: 'home'})">
              <v-icon>mdi-window-close</v-icon>
              <h1>Cancel</h1>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn large block color="primary" v-on:click="submit">
              <v-icon>mdi-database</v-icon>
              <h1>{{label}} Diary</h1>
            </v-btn>
          </v-col>
        </v-row>
        <br>
      </div>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "create",
  data() {
    return {
      title: "",
      content: "",
      isUpdate: false,
      id: "",
      label: "Create"
    };
  },
  beforeMount() {
    var ref = window.location.href;
    if (ref.includes("http://localhost:8080/update")) {
      this.isUpdate = true;
      this.id = this.$route.params.paramsId;
      this.label = "Update";
      let url = `http://localhost:3000/get-data/${this.id}`;
      axios.post(url).then(response => {
        this.title = response.data.Title;
        this.content = response.data.Content;
      });
    }
  },
  methods: {
    submit() {
      if (this.isUpdate) {
        let url = `http://localhost:3000/update/${this.id}`;
        axios
          .post(url, {
            id: this.id,
            title: this.title,
            content: this.content
          })
          .then(res => {
            this.isUpdate = false;
            this.$router.push({
              path: "/"
            });
          });
      } else {
        let url = `http://localhost:3000/create`;
        axios
          .put(url, {
            title: this.title,
            content: this.content
          })
          .then(res => {
            this.isUpdate = false;
            this.$router.push({
              name: "home"
            });
          });
      }
    }
  }
};
</script>

<style scoped>
.c-width {
  position: relative;
  padding-top: 5%;
  width: 90%;
  margin: auto;
}

v-container {
  position: relative;
  top: 5%;
}
</style>
