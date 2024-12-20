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


    <ul class="genre-list">
        <li v-for="genre in genres" :key="genre.id" class="genre-item" @click="listMovies(genre.id)">
            {{ genre.name }}
        </li>
    </ul>

    <h1>Filmes</h1>


    <img src="/src/assets/imagens/cinema.jpg" alt="">

    <div class="movie-list">
        <div v-for="movie in movies" :key="movie.id" class="movie-card">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
                @click="openMovie(movie.id)" />
            <hr>
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
    margin: 20px 0;
    text-align: center;
    font-size: 3rem;
    color: #ffffff;
    padding: 20px 0;
    border-radius: 10px;
}

.genre-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    list-style: none;
    gap: 5px;
    margin-top: 6vh;
    margin-left: -30px;
}

.genre-item {
    font-size: 20px;
    border-radius: 20px;
    padding: 10px 10px;
    color: #fff;
}

.genre-item:hover {
    background-color: #424242;
}

img {
    width: 192.4vh;
}

.movie-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    padding: 20px;
    justify-items: center;
    margin-bottom: 40px;
}


.movie-card {
    background-color: #ffffff;
    width: 30vh;
    height: auto;
    border-radius: 10px;
    margin-top: 40px;
}

.movie-card:hover {
    background-color: #cecece;
}


.movie-card img {
    width: 19vh;
    height: 290px;
    border-radius: 8px;
    margin-left: 50px;
    margin-top: 15px;
    margin-bottom: 8px;
}


.movie-details {
    padding: 15px;
}

.movie-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    text-align: center;
}

.movie-release-date {
    font-size: 1rem;
    color: #888;
    text-align: center;
    margin-bottom: 10px;
}

.movie-genres {
    font-size: 0.9rem;
    color: #ffffff;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.movie-genres span {
    background-color: #000000;
    border-radius: 15px;
    padding: 5px 10px;
    margin: 5px;

}

.movie-genres span:hover {
    background-color: #888;
}
</style>
