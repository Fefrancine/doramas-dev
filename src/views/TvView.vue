<script setup>
import { ref, onMounted } from 'vue';
import api from '@/plugins/axios';
import { useRouter } from 'vue-router';
import Loading from 'vue-loading-overlay';

const router = useRouter();
const genres = ref([]);
const tvShows = ref([]);
const isLoading = ref(false);
const currentGenre = ref(null);

const listTvShows = async (genreId) => {
    isLoading.value = true;
    currentGenre.value = genreId;
    const response = await api.get('discover/tv', {
        params: {
            with_genres: genreId,
            language: 'pt-BR'
        }
    });
    tvShows.value = response.data.results;
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

const openTvShow = (tvShowId) => {
    router.push({ name: 'TvShowDetails', params: { tvShowId } });
};

onMounted(async () => {
    const response = await api.get('genre/tv/list?language=pt-BR');
    genres.value = response.data.genres;
});
</script>

<template>
    <h1>Séries de TV</h1>
    <hr>
    <br>

    <ul class="genre-list">
        <li v-for="genre in genres" :key="genre.id" class="genre-item" @click="listTvShows(genre.id)">
            {{ genre.name }}
        </li>
    </ul>

    <hr>

    <div class="tv-show-list">
        <div v-for="tvShow in tvShows" :key="tvShow.id" class="tv-show-card">
            <img :src="`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`" :alt="tvShow.name" @click="openTvShow(tvShow.id)" />
            <div class="tv-show-details">
                <p class="tv-show-title">{{ tvShow.name }}</p>
                <p class="tv-show-release-date">{{ formatDate(tvShow.first_air_date) }}</p>
                <p class="tv-show-genres">
                    <span v-for="genre_id in tvShow.genre_ids" :key="genre_id" @click="listTvShows(genre_id)">
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

.tv-show-list {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.tv-show-card {
    width: 15rem;
    height: 30rem;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: 0 0 0.5rem #000;
}

.tv-show-card img {
    width: 100%;
    height: 20rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 0.5rem #000;
}

.tv-show-details {
    padding: 0 0.5rem;
}

.tv-show-title {
    font-size: 1.1rem;
    font-weight: bold;
    line-height: 1.3rem;
    height: 3.2rem;
}

.tv-show-release-date {
    font-size: 0.9rem;
    color: #aaa;
}

.tv-show-genres {
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
