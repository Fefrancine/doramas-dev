<script setup>
import { defineProps, onMounted } from 'vue';
import { useTvStore } from '@/stores/tv';

const tvStore = useTvStore();

const props = defineProps({
    tvId: {
        type: Number,
        required: true,
    },
});

onMounted(async () => {
    await tvStore.getTvDetail(props.tvId);
});
</script>

<template>

    <div class="main">
        <div class="content">
            <img :src="`https://image.tmdb.org/t/p/w185${tvStore.currentTv.poster_path}`"
                :alt="tvStore.currentTv.name" />

            <div class="details">
                <h1>Série: {{ tvStore.currentTv.name }}</h1>
                <p>{{ tvStore.currentTv.tagline }}</p>
                <p>{{ tvStore.currentTv.overview }}</p>
                <p>Status: {{ tvStore.currentTv.status }}</p>
                <p>Avaliação: {{ tvStore.currentTv.vote_average }}</p>
                <p>Gêneros:
                    <span v-for="(genre, index) in tvStore.currentTv.genres" :key="genre.id">
                        {{ genre.name }}<span v-if="index < tvStore.currentTv.genres.length - 1">, </span>
                    </span>
                </p>
            </div>
        </div>
    </div>

    <p>Produtoras</p>
    <div class="companies">
        <template v-for="company in tvStore.currentTv.production_companies" :key="company.id">
            <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
                :alt="company.name" />
            <p v-else>{{ company.name }}</p>
        </template>
    </div>

</template>

<style scoped>
.companies {
    display: flex;
    flex-direction: row;
    column-gap: 3rem;
    align-items: center;
    margin-bottom: 2rem;
}

.details {
    max-width: 500px;
}

.details h1 {
    font-size: 2rem;
    font-weight: bold;
}

.details p {
    font-size: 1rem;
    margin-bottom: 1rem;
}
</style>
