<script setup>
import { defineProps, onMounted } from 'vue';
import { useMovieStore } from '@/stores/movie';

const movieStore = useMovieStore();

const props = defineProps({
    movieId: {
        type: Number,
        required: true,
    },
});

onMounted(async () => {
    await movieStore.getMovieDetail(props.movieId);
});
</script>

<template>
    <div class="main">
        <div class="content">
            <img :src="`https://image.tmdb.org/t/p/w185${movieStore.currentMovie.poster_path}`"
                :alt="movieStore.currentMovie.title" class="movie-img" />

            <div class="details">
                <h1>{{ movieStore.currentMovie.title }}</h1>
                <p class="tagline">{{ movieStore.currentMovie.tagline }}</p>
                <p class="overview">{{ movieStore.currentMovie.overview }}</p>
                <p class="budget">Orçamento: <span>${{ movieStore.currentMovie.budget }}</span></p>
                <p class="rating">Avaliação: <span>{{ movieStore.currentMovie.vote_average }}</span></p>
            </div>
        </div>
    </div>

    <p class="companies-title">Produtoras</p>
    <div class="companies">
        <template v-for="company in movieStore.currentMovie.production_companies" :key="company.id">
            <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
                :alt="company.name" class="company-logo" />
            <p v-else class="company-name">{{ company.name }}</p>
        </template>
    </div>
</template>

<style scoped>
.main {
    width: 100vh;
    margin: 0 auto;
    padding: 2rem;
    margin-top: 20vh;
}

.content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 2rem;
}

.movie-img {
    margin-left: 9vh;
    width: 220px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.details {
    flex: 1;
    max-width: 700px;
}

.details h1 {
    font-size: 3rem;
    color: #ffffff;

}

.tagline {
    font-size: 1.2rem;
    color: #777777;

}

.overview {
    font-size: 1rem;
    color: #ffffff;
    margin-bottom: 1.5rem;
}

.budget,
.rating {
    font-size: 1.1rem;
    color: #333;
}

.budget span,
.rating span {
    font-weight: bold;
    color: #217400;
}


.companies-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    text-align: center;
    color: #ffffff;
    margin-left: 55vh;
}

.companies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2rem;
    margin-left: 50vh;
    align-items: center;
}

.company-logo {
    max-width: 90px;
    max-height: 40px;
    object-fit: contain;
}

.company-name {
    font-size: 1rem;
    color: #555;
    text-align: center;

}
</style>
