import axios from 'axios';

export const api = axios.create({
    baseURL: "https://daily-planner-ochre.vercel.app/api"
})