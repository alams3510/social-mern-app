import axios from 'axios'

export const axiosInstance=axios.create({
    baseURL:"https://socialmern.onrender.com/api/"
})