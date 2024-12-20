import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import api from '@/plugins/axios';

export const useTvStore = defineStore('tv', () => {
    // Estado reativo
    const state = reactive({
        currentTv: {
            id: null,
            name: '',
            overview: '',
            genres: [],
            poster_path: '',
            first_air_date: '',
        }, // Detalhes da série atual
        tvByGenre: [], // Séries filtradas por gênero
        error: null,    // Mensagem de erro
    });

    // Computed properties para acessar o estado
    const currentTv = computed(() => state.currentTv);
    const tvByGenre = computed(() => state.tvByGenre);
    const error = computed(() => state.error);

    // Método para buscar detalhes de uma série por ID
    const fetchTvDetail = async (tvId) => {
        try {
            const response = await api.get(`tv/${tvId}`, {
                params: { language: 'pt-BR' },
            });
            state.currentTv = response.data;
            state.error = null; // Limpa erros anteriores
        } catch (error) {
            console.error('Erro ao buscar detalhes do programa de TV:', error);
            state.error = 'Erro ao buscar detalhes do programa de TV.';
        }
    };

    // Método para buscar séries filtradas por gênero
    const fetchTvByGenre = async (genreIds, page = 1) => {
        if (!Array.isArray(genreIds) || genreIds.length === 0) {
            console.error('O parâmetro genreIds deve ser um array não vazio.');
            state.error = 'Parâmetros inválidos para a busca.';
            return;
        }
        try {
            const response = await api.get('discover/tv', {
                params: {
                    with_genres: genreIds.join(','),
                    page,
                    language: 'pt-BR',
                },
            });
            state.tvByGenre = response.data.results;
            state.error = null; // Limpa erros anteriores
        } catch (error) {
            console.error('Erro ao buscar programas de TV por gênero:', error);
            state.error = 'Erro ao buscar programas de TV por gênero.';
        }
    };

    // Retorno dos métodos e estados
    return {
        currentTv,
        tvByGenre,
        error,
        fetchTvDetail,
        fetchTvByGenre,
    };
});
