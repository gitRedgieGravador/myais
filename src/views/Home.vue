<template>
  <center>
    <h1>Stories Of My Life</h1>
    <v-card id="main">
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
              <v-btn text color="rgb(179, 179, 0)" @click="gotoCom('stared')">
                <span>
                  <v-icon>mdi-star</v-icon>
                </span>Star
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <br />
      </v-card>
      <hr />

      <div v-for="(item, i) in posts" :key="i">
        <br />
        <v-card elevation="5">
          <v-img class="white--text align-end" height="200px" src="@/assets/yes.png">
            <v-card-title>
              <v-icon
                v-if="!item.Stared"
                class="pointer"
                size="50"
                color="white"
                @click="starthis(item.IDPost)"
              >mdi-star-outline</v-icon>
              <v-icon v-if="item.Stared" class="pointer" size="50" color="yellow">mdi-star</v-icon>

              <h1>{{item.Title}}</h1>
            </v-card-title>
            <v-card-subtitle class="text-left">
              <i>
                <h5 class="c-white">{{new Date(item.DateStamp).toLocaleString()}}</h5>
              </i>
            </v-card-subtitle>
          </v-img>
          <div class="text-left indent pl-10 pr-10">
            <br />
            <p>{{item.Content}}</p>
          </div>
          <br />
          <br />
          <br />
          <v-footer absolute class="font-weight-medium">
            <v-row>
              <v-col>
                <v-btn text block color="error" @click="deletei(item.IDPost)">
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
    </v-card>
  </center>
</template>


<script>
import axios from "axios";
export default {
  data() {
    return {
      forceUpdate: 0,
      posts: [],
      staredDiary: [],
      background: "primary",
      staredDialog: false,
      resized: false
    };
  },
  beforeMount() {
    this.getNow()
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  methods: {
    getNow() {
      let url = `http://localhost:3000/get-data/all`;
      axios.get(url).then(response => {
        this.posts = response.data;
        for (let i = 0; i < this.posts.length; ++i) {
          if (this.posts[i].Stared) {
            this.staredDiary.push(this.posts[i]);
          }
        }
      });
    },
    handleResize() {
      if (window.innerWidth < 1200) {
        this.resized = true;
        this.handleWidth();
      } else {
        this.resized = false;
        this.handleWidth();
      }
    },
    handleWidth() {
      if (this.resized) {
        document.getElementById("main").style.width = "100%";
      } else {
        document.getElementById("main").style.width = "70%";
      }
    },
    togoUpdate(id) {
      this.$router.push({ path: "/update/" + id });
    },
    gotoCom(pathname) {
      this.$router.push({ name: pathname });
    },
    starthis(id) {
      let url = `http://localhost:3000/star/${id}`;
      axios.put(url).then(response => {
        if (response.data.status) {
          this.getNow()
        }
      });
    },
    deletei(id) {
      let url = `http://localhost:3000/delete/${id}`;
      axios.delete(url).then(response => {
        for (let i = 0; i < this.posts.length; ++i) {
          if (this.posts[i].IDPost == response.data) {
            this.posts.splice(i, 1);
          }
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

#main {
  width: 70%;
}
.pointer {
  cursor: pointer;
}
.indent {
  text-indent: 50px;
  text-align: justify;
}
.stick {
  position: sticky;
  top: 0;
  z-index: 10;
}
.c-white {
  color: white;
  margin-left: 6%;
}
</style>