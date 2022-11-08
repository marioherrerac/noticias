<!-- BookIndex.vue -->
<template>
  <div class="row">
   <div style="margin-top: 5%">
     <h2>{{title}}</h2>
     <table><thead>
       <tr>
         <th>Title</th>
        <th>Autor</th>
        <th>Network</th>
        <th>Year</th>
        <th class="text-center">Actions</th>
	   </tr>
       </thead><tbody>
       <tr v-for='noticia in news' :key="noticia._id">
       <td>{{noticia.title}}</td>
       <td>{{noticia.author}}</td>
       <td>{{noticia.network}}</td>
       <td>{{noticia.year}}</td>
       <td>
       <router-link class="button"
         :to="'/new/show/'+noticia._id">Show</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/new/edit/'+noticia._id">Edit</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deleteNew(noticia._id)">Erase</a>
       </td>
       </tr></tbody>
     </table>
     <router-link class="button button-primary" 
       to="/new/create">New</router-link>
   </div>
  </div>
</template>

<script>
	
export default {
  name: "New Index",
  data() {
    return {
      title: 'New List',
      news: []
    };
  },
  mounted() {
    this.allNews()
  },
  methods: {
    allNews() {
      fetch(this.url+'/.netlify/functions/newFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.news = items;
        })
     },
     deleteNew(id) {
       fetch(this.url+'/.netlify/functions/newDelete/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((items) => {
            this.allNews();
          }
        )
     }
  }
};
</script>