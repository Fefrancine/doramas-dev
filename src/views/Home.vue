<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';  // Certifique-se de que o axios está configurado corretamente

const moviesGenres = ref([]);
const TVGenres = ref([]);

onMounted(async () => {
  let response = await api.get('genre/movie/list?language=pt-BR');
  moviesGenres.value = response.data.genres;

  response = await api.get('genre/tv/list?language=pt-BR');
  TVGenres.value = response.data.genres;
});
</script>

<template>
  <div>

    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/filmes">Filmes</router-link>
      <router-link to="/tv">Programas de TV</router-link>
    </nav>


    <section class="intro">
      <h1>Bem-vindo ao Mundo do Entretenimento!</h1>
      <p>Explore os gêneros de filmes e séries de TV mais populares. Encontre o que você mais gosta, desde ação até
        drama, em nosso site de streaming. Fique por dentro das últimas novidades!</p>
      <img src="/src/assets/imagens/cinema.jpg" alt="">
    </section>


    <section class="intro2">
      <h3>Descubra Mais!</h3>
      <p>Quer saber mais sobre o que está em alta? Navegue pelas categorias e descubra novos filmes e programas que você
        vai adorar.</p>
    </section>
  </div>
</template>

<style scoped>
nav {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 10px 0;
  font-size: 1.2rem;
}

nav a {
  text-decoration: none;
  color: #fff;
  padding: 8px 16px;
  transition: color 0.3s;
}

nav a:hover {
  color: #bbbbbb;
}

.intro {
  margin-top: 30px;
  text-align: center;
  margin-bottom: 3rem;
}

.intro h1 {
  font-size: 2.5rem;
  color: #dfdfdf;
  margin-bottom: 2rem;
}

.intro p {
  font-size: 23px;
  color: #666;
  margin-bottom: 2rem;
}

.intro img {
  width: 192.4vh;
}

.intro2 {
  text-align: center;
  margin-top: 15vh;
}

.intro2 h3 {
  font-size: 2rem;
  color: #dbdbdb;
  margin-bottom: 1rem;
}

.intro2 p {
  font-size: 1.1rem;
  color: #5e5e5e;
  margin-bottom: 2rem;
  font-size: 20px;
}
</style>
