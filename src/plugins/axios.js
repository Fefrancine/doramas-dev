import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2Y4ZDBkNDkzYjE4MjFiYWQ5YTliZGRjMTFkZDZhZiIsIm5iZiI6MTczMTk1NDc0Mi41NTY5ODc4LCJzdWIiOiI2NzNiODZkNTdkYzkyZmI2ZjZmNzc0NTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.xxR_JcELP2eQZAi2XNpTHsQaA9g0aKnDuu2clBpVJKY`,
  },
});

export default api;