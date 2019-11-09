<template>
  <dir>
    <center>
      <v-card min-height="800">
        <v-toolbar class="stick" dark color="primary">
          <v-spacer></v-spacer>

          <v-btn class="mr-6" dark icon @click="$router.push({name:'home'})">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <div v-if="staredDiary.length == 0">
          <br>
          <br>
          <br>
          <h1>No Entry for Stared Diary</h1>
        </div>
        <di v-else>
          <div v-for="(item, i) in staredDiary" :key="i">
            <br>
            <v-card elevation="5" width="80%">
              <v-img class="white--text align-end" height="200px" src="@/assets/yes.png">
                <v-card-title>
                  <v-icon
                    v-if="!item.Stared"
                    class="pointer"
                    size="50"
                    color="white"
                    @click="starthis(item.IDPost);item.Stared = !item.Stared"
                  >mdi-star-outline</v-icon>
                  <v-icon v-if="item.Stared" class="pointer" size="50" color="yellow">mdi-star</v-icon>
                  <h1>{{item.Title}}</h1>
                </v-card-title>
              </v-img>
              <div class="text-left indent pl-10 pr-10">
                <br>
                <p>{{item.Content}}</p>
              </div>
              <br>
              <br>
              <v-footer absolute class="text-center">
                <h5>You have star this diary</h5>
              </v-footer>
            </v-card>
          </div>
        </di>
      </v-card>
    </center>
  </dir>
</template>
<script>
import axios from "axios";
export default {
  name: "stared",
  data() {
    return {
      staredDiary: [],
      posts: []
    };
  },
  beforeMount() {
    console.log("sfdsfsdlk");
    let url = `http://localhost:3000/get-data/all`;
    axios.get(url).then(response => {
      this.posts = response.data;
      for (let i = 0; i < this.posts.length; ++i) {
        if (this.posts[i].Stared) {
          this.staredDiary.push(this.posts[i]);
        }
      }
    });
  }
};
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
.indent {
  text-indent: 50px;
  text-align: justify;
}
.stick {
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
}
</style>
