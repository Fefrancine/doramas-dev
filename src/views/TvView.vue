<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';

const genres = ref([]);

onMounted(async () => {
  const response = await api.get('genre/tv/list?language=pt-BR');
  genres.value = response.data.genres;
});
</script>

<template>
  <h1>Programas de TV</h1>
  <hr>
  <br>
  <ul class="genre-list">
    <li v-for="genre in genres" :key="genre.id" class="genre-item">
      {{ genre.name }}
    </li>
  </ul>
  <br>
  <hr>
</template>

<style scoped>

h1 {
  margin-bottom: 40px;
  justify-content: center;
  align-items: center;
  display: flex;
  font-size: 50px;
  color: #850464;
  background-color: #000000;
}

.genre-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  list-style: none;
  padding: 0;
}

.genre-item {
  background-color: #000000;
  border-radius: 1rem;
  padding: 0.5rem 0.5rem;
  color: #fff;
  margin-left: -10px;
}

.genre-item:hover {
  cursor: pointer;
  background-color: #850464;

}
</style>