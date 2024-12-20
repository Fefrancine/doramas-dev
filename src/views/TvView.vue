<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/plugins/axios';
import Loading from 'vue-loading-overlay';

const router = useRouter();
const genres = ref([]);
const tvShows = ref([]);
const isLoading = ref(false);
const currentGenre = ref(null);


const listTvShows = async (genreId) => {
    isLoading.value = true;
    currentGenre.value = genreId;
    try {
        const response = await api.get('discover/tv', {
            params: {
                with_genres: genreId,
                language: 'pt-BR',
            },
        });
        tvShows.value = response.data.results || [];
    } catch (error) {
        console.error('Erro ao listar programas de TV:', error);
    } finally {
        isLoading.value = false;
    }
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
    router.push({ name: 'tvDetails', params: { tvShowId } });
};


onMounted(async () => {
    try {
        const response = await api.get('genre/tv/list?language=pt-BR');
        genres.value = response.data.genres;
    } catch (error) {
        console.error('Erro ao carregar gêneros:', error);
    }
});
</script>

<template>
   
    <ul class="genre-list">
        <li v-for="genre in genres" :key="genre.id" class="genre-item" @click="listTvShows(genre.id)">
            {{ genre.name }}
        </li>
    </ul>

    <h1>Séries de TV</h1>


    <img src="@/assets/imagens/cinema.jpg" alt="Imagem de cinema">


    <div class="tv-show-list">
        <div v-for="tvShow in tvShows" :key="tvShow.id" class="tv-show-card">
            <img 
                :src="tvShow.poster_path ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}` : '/path/to/placeholder.jpg'"
                :alt="tvShow.name || 'Sem título'" 
                @click="openTvShow(tvShow.id)"
            />
            <hr>
            <div class="tv-show-details">
                <p class="tv-show-title">{{ tvShow.name }}</p>
                <p class="tv-show-release-date">{{ formatDate(tvShow.first_air_date) || 'Data desconhecida' }}</p>
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
    gap: 1.5rem;
    list-style: none;
    margin: 20px 0;
    margin-left: -35px;
    margin-bottom: 4vh;
    margin-top: 5vh;
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
    width: 100%;
    height: auto;
}

.tv-show-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    padding: 20px;
    justify-items: center;
    margin-bottom: 40px;
}

.tv-show-card {
    background-color: #ffffff;
    width: 30vh;
    height: auto;
    border-radius: 10px;
    margin-top: 60px;
}

.tv-show-card:hover {
    background-color: #cecece;
}

.tv-show-card img {
    width: 19vh;
    height: 290px;
    object-fit: cover;
    border-radius: 8px;
    margin-left: 50px;
    margin-top: 15px;
    margin-bottom: 15px;
}

.tv-show-details {
    padding: 15px;
}

.tv-show-title {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    text-align: center;
}

.tv-show-release-date {
    font-size: 1rem;
    color: #888;
    text-align: center;
    margin-bottom: 10px;
}

.tv-show-genres {
    font-size: 0.9rem;
    color: #ffffff;
    text-align: center;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.tv-show-genres span {
    background-color: #000000;
    border-radius: 15px;
    padding: 5px 10px;
    margin: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.tv-show-genres span:hover {
    background-color: #888;
}
</style>
