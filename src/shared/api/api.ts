import axios from 'axios';

export const $api = axios.create({
    headers: {
        'User-Agent': 'Github-Repos',
        Authorization: `Bearer ${__GITHUB_KEY__}`,
    },
    baseURL: __API_URL__,
});
