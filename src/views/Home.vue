<template>
  <v-container>
    <v-row>
      <v-col class="text-left"><h2>Posts</h2></v-col>
      <v-col class="text-right"><router-link :to="'/create'"><v-btn large color="primary">Create</v-btn></router-link> </v-col>
    </v-row>
    <center>
      <v-card>
        <v-simple-table fixed-header class="mylimit">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  <h2>Title</h2>
                </th>
                <th class="text-center">
                  <h2>Content</h2>
                </th>
                <th class="text-right">
                  <h2>Action</h2>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in posts" :key="item.id">
                <td class="text-left">{{ item.title }}</td>
                <td class="text-center">{{ item.content }}</td>
                <td class="text-right">
                  <v-btn color="success">Update</v-btn>
                  <v-btn color="error">Delete</v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </center>
  </v-container>
</template>


<script>
export default {
  data() {
    return {
      posts: [
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " },
        { id: 1, title: "Hello", content: "My content " }
        ]
    };
  }
};
</script>
<style scoped>
.mylimit {
  max-height: 500px;
}
</style>

