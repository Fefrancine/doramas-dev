<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/plugins/axios';

const route = useRoute();
const tvShowId = route.params.tvShowId;
const tvShowDetails = ref(null);
const isLoading = ref(true);

onMounted(async () => {
    try {
        const response = await api.get(`tv/${tvShowId}`, {
            params: { language: 'pt-BR' },
        });
        tvShowDetails.value = response.data;
    } catch (error) {
        console.error('Erro ao carregar detalhes da série:', error);
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <div v-if="isLoading">
        <p>Carregando detalhes...</p>
    </div>
    <div v-else>
        <div class="main">
            <div class="content">
                <!-- Imagem da série -->
                <img :src="`https://image.tmdb.org/t/p/w500${tvShowDetails.poster_path}`" :alt="tvShowDetails.name"
                    class="tv-img" />

                <div class="tv-info">
                    <h1>{{ tvShowDetails.name }}</h1>
                    <p class="tagline">{{ tvShowDetails.tagline || 'Sem tagline disponível' }}</p>
                    <p class="overview">{{ tvShowDetails.overview || 'Sinopse não disponível.' }}</p>
                    <p class="status">Status: <span>{{ tvShowDetails.status || 'Status não disponível' }}</span></p>
                    <p class="rating">Avaliação: <span>{{ tvShowDetails.vote_average || 'Não avaliado' }}</span></p>
                    <p class="first-air-date">Data de Estreia: <span>{{ tvShowDetails.first_air_date || 'Data desconhecida' }}</span></p>
                    <p class="seasons">Número de Temporadas: <span>{{ tvShowDetails.number_of_seasons || 'Informação não disponível' }}</span></p>
                    <p class="episodes">Número de Episódios: <span>{{ tvShowDetails.number_of_episodes || 'Informação não disponível' }}</span></p>
                    <p class="episode-duration">Duração média dos episódios: <span>{{ tvShowDetails.episode_run_time ? tvShowDetails.episode_run_time[0] + ' minutos' : 'Duração desconhecida' }}</span></p>

                    <!-- Gêneros -->
                    <p><strong>Gêneros:</strong>
                        <span v-for="genre in tvShowDetails.genres" :key="genre.id">
                            {{ genre.name }}
                        </span>
                    </p>
                </div>
            </div>

            <h2 class="companies-title">Produtoras</h2>
            <div class="companies">
                <template v-for="company in tvShowDetails.production_companies" :key="company.id">
                    <img v-if="company.logo_path" :src="`https://image.tmdb.org/t/p/w92${company.logo_path}`"
                        :alt="company.name" class="company-logo" />
                    <p v-else class="company-name">{{ company.name }}</p>
                </template>
            </div>
        </div>
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

.tv-img {
    margin-left: 9vh;
    width: 220px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.tv-info {
    flex: 1;
    max-width: 700px;
}

.tv-info h1 {
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

.status,
.rating,
.first-air-date,
.seasons,
.episodes,
.episode-duration {
    font-size: 1.1rem;
    color: #333;
}

.status span,
.rating span,
.first-air-date span,
.seasons span,
.episodes span,
.episode-duration span {
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
