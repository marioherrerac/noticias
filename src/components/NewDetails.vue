<!-- BookDetails.vue -->
<template>
  <div class="row">
   <div class="eleven column" style="margin-top: 5%">
    <h2>{{title}}</h2>
     <form>
     <div class="row">
      <div class="six columns">
       <label for="titleInput">Title</label>
       <input class="u-full-width" type="text"
         v-model="noticia.title">
      </div>
      <div class="six columns">
       <label for="authorInput">Author</label>
       <input class="u-full-width" type="text"
          v-model="noticia.author">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="urlInput">URL</label>
       <input class="u-full-width" type="text"
          v-model="noticia.urlLink">
      </div>
      <div class="six columns">
       <label for="yearInput">Year</label>
       <input class="u-full-width" type="text"
         v-model="noticia.year">
      </div>
     </div>
     <div class="row">
      <div class="six columns">
       <label for="durationInput">Duration</label>
       <input class="u-full-width" type="number"
          v-model="noticia.duration">
      </div>
      <div class="six columns">
       <label for="languageInput">Language</label>
       <input class="u-full-width" type="text"
         v-model="noticia.language">
      </div>
     </div>
     <div class="row">
      <router-link class="button button-primary" 
        to="/new">Back</router-link>
       <a v-if='edit' class="button button-primary" style="float: right"
         v-on:click="updateNew(noticia._id)">Update</a>
       <a v-if='create' class="button button-primary" style="float: right"
         v-on:click="createNew()">Create</a>
     </div>
    </form>
  </div>
</div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: "New Details",
  props: ['create','edit','create'],
  data() {
    return {
      title: "New Data",
      noticia: {}
    }
  },
  mounted() {
    const route = useRoute()
    if (route.params.id != null)
      this.findNew(route.params.id);
    else {
      this.noticia = {
        '_id': Math.floor(Math.random()*100000000),'title':'','urlLink':'',
        'year':0,'language':'','duration':0,'author':''};
    }
  },
  methods: {
    findNew: function(id) {
      fetch(this.url+'/.netlify/functions/newFind/'+id,
      { headers: {'Accept': 'application/json'}})
      .then((response) => response.json())
      .then((items) => {
       this.noticia = items[0];
      })
    },
    updateNew: function(id) {
      fetch(this.url+'/.netlify/functions/newUpdate/'+id,
        { headers: {'Content-Type':'application/json'},
          method: 'PUT',
          body: JSON.stringify(this.noticia)})
        .then((data) => {
          this.$router.push('/new');
        }
      )
    },
    createNew: function() {
      fetch(this.url+'/.netlify/functions/newInsert',
        { headers: {'Content-Type':'application/json'},
          method: 'POST',
          body: JSON.stringify(this.noticia)})
        .then((data) => {
           this.$router.push('/new');
        }
      )
    }
  }
};
</script>