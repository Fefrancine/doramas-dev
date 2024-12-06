<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useRouter } from 'vue-router';
import Loading from 'vue-loading-overlay';


const router = useRouter();
const genres = ref([]);
const movies = ref([]);
const isLoading = ref(false);
const currentGenre = ref(null);


const listMovies = async (genreId) => {
    isLoading.value = true;
    currentGenre.value = genreId; 
    const response = await api.get('discover/movie', {
        params: {
            with_genres: genreId,
            language: 'pt-BR'
        }
    });
    movies.value = response.data.results;
    isLoading.value = false;
};


const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('pt-BR', options);
};


const getGenreName = (id) => {
    const genre = genres.value.find((genre) => genre.id === id);
    return genre ? genre.name : 'Gênero não disponível';
};


const openMovie = (movieId) => {
    router.push({ name: 'MovieDetails', params: { movieId } });
};



onMounted(async () => {
    const response = await api.get('genre/movie/list?language=pt-BR');
    genres.value = response.data.genres;
});
</script>

<template>
    <h1>Filmes</h1>
    <hr>
    <br>
    
   
    
    <ul class="genre-list">
        <li v-for="genre in genres" :key="genre.id" class="genre-item" @click="listMovies(genre.id)">
            {{ genre.name }}
        </li>
    </ul>

    <hr>

   
    
    <div class="movie-list">
        <div v-for="movie in movies" :key="movie.id" class="movie-card">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title" @click="openMovie(movie.id)" />
            <div class="movie-details">
                <p class="movie-title">{{ movie.title }}</p>
                <p class="movie-release-date">{{ formatDate(movie.release_date) }}</p>
                <p class="movie-genres">
                    <span v-for="genre_id in movie.genre_ids" :key="genre_id" @click="listMovies(genre_id)">
                        {{ getGenreName(genre_id) }}
                    </span>
                </p>
            </div>
        </div>
    </div>

    
    <loading v-model:active="isLoading" is-full-page />
</template>

<style scoped>
h1 {
    margin-bottom: 40px;
    justify-content: center;
    align-items: center;
    display: flex;
    font-size: 50px;
    background-color: #000;
    color: #850464;
}

.genre-item {
    background-color: #000000;
    border-radius: 1rem;
    padding: 0.5rem 0.5rem;
    color: #fff;
    cursor: pointer;
}

.genre-item:hover {
    background-color: #850464;
}

.movie-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.movie-card {
    width: 15rem;
    height: 30rem;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 0.5rem #000;
}

.movie-card img {
    width: 100%;
    height: 20rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #000;
}

.movie-details {
    padding: 0 0.5rem;
}

.movie-title {
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.3rem;
    height: 3.2rem;
}

.movie-release-date {
    font-size: 0.9rem;
    color: #aaa;
}

.movie-genres {
    font-size: 0.9rem;
    color: #666;
}

.genre-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    list-style: none;
    margin-bottom: 2rem;
}
</style>
