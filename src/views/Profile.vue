<template>
  <div>
    <center>
      <div class="main">
        <v-card>
          <div id="cover"></div>
          <v-row>
            <v-col>
              <img src="@/assets/person.png" class="profile" />
            </v-col>
            <v-col>
              <h1 class="pp-name">Redgie Gravador</h1>
            </v-col>
          </v-row>
          <div>
            <v-row>
              <v-col class="text-right">
                <v-btn text color="primary" @click="gotoCom('create')">
                  <span>
                    <v-icon>mdi-file-document-edit</v-icon>
                  </span>New Diary
                </v-btn>
              </v-col>
              <v-col class="text-left">
                <v-btn text color="rgb(179, 179, 0)">
                  <span>
                    <v-icon>mdi-star</v-icon>
                  </span>Started
                </v-btn>
              </v-col>
            </v-row>
          </div>
          <br />
        </v-card>
        <hr />
        <div v-for="(item, i) in posts" :key="i">
          <br />
          <v-card height="500" elevation="5">
            <v-img class="white--text align-end" height="200px" src="@/assets/yes.png">
              <v-card-title>
                <v-icon
                  v-if="!item.Stared"
                  class="pointer"
                  size="50"
                  color="white"
                  @click="starthis(item.IDPost);item.Stared = !item.Stared"
                >mdi-star-outline</v-icon>
                <v-icon
                  v-if="item.Stared"
                  class="pointer"
                  size="50"
                  color="yellow"
                  @click="starthis(item.IDPost)"
                >mdi-star</v-icon>
                <h1>{{item.Title}}</h1>
              </v-card-title>
            </v-img>

            <p>{{item.Content}}</p>
            <v-footer absolute class="font-weight-medium">
              <v-row>
                <v-col>
                  <v-btn text block color="error">
                    <span>
                      <v-icon>mdi-file-document-box-remove</v-icon>
                    </span>Delete Diary
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn text block color="success" @click="togoUpdate(item.IDPost)">
                    <span>
                      <v-icon>mdi-file-document-edit</v-icon>
                    </span>Edit Diary
                  </v-btn>
                </v-col>
              </v-row>
            </v-footer>
          </v-card>
          <br />
        </div>
      </div>
    </center>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "profile",
  data() {
    return {
      posts: [],
      background: "primary"
    };
  },
  beforeMount() {
    let url = `http://localhost:3000/get-data/all`;
    axios.get(url).then(response => {
      this.posts = response.data;
    });
  },
  methods: {
    togoUpdate(id) {
      this.$router.push({ path: "/update/" + id });
    },
    gotoCom(pathname) {
      this.$router.push({ name: pathname });
    },
    starthis(id) {
      let url = `http://localhost:3000/star/${id}`;
      axios.put(url).then(response => {
        alert(response.data.status)
        if (response.data.status) {
          
        }
      });
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
