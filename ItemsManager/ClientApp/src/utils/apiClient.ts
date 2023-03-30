import axios from 'axios'
import { deleteTokens, getAccessToken } from './authUtils'
import { apiUrl } from '../store/config'

const createAxiosInstance = (baseUrl: string) => {
    const axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })

    axiosInstance.interceptors.request.use(
        axiosConfig => {
            const accessToken = getAccessToken()

            if (accessToken && axiosConfig !== undefined && axiosConfig.headers !== undefined) {
                axiosConfig.headers.Authorization = `Bearer ${accessToken}`
            }

            return axiosConfig
        },
        error => {
            return Promise.reject(error)
        }
    )

    axiosInstance.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 401) {
                deleteTokens()
                window.location.reload()
            }

            return Promise.reject(error)
        }
    )

    return axiosInstance
}

const apiClient = createAxiosInstance(apiUrl)
export default apiClient