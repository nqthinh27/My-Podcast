import axios from 'axios'
import { BASE_URL } from './config';

/**
 * 
 * PUBLIC DATA
 * @returns 
 */
export const getPublicDataAPI = async (url) => {
    const res = await axios.get(`${BASE_URL}/${url}`)
    return res;
}

export const postPublicDataAPI = async (url, post) => {
    const res = await axios.post(`${BASE_URL}/${url}`, post)
    return res;
}

export const putPublicDataAPI = async (url, post) => {
    const res = await axios.put(`${BASE_URL}/${url}`, post)
    return res;
}

export const patchPublicDataAPI = async (url, post) => {
    const res = await axios.patch(`${BASE_URL}/${url}`, post)
    return res;
}

export const deletePublicDataAPI = async (url) => {
    const res = await axios.delete(`${BASE_URL}/${url}`)
    return res;
}

/**
 * 
 * PRIVATE DATA
 * @returns 
 */

export const getDataAPI = async (url, token) => {
    const res = await axios.get(`${BASE_URL}/${url}`, {
        headers: { token: token}
    })
    return res;
}

export const postDataAPI = async (url, post, token) => {
    const res = await axios.post(`${BASE_URL}/${url}`, post, {
        headers: { token: token}
    })
    return res;
}

export const putDataAPI = async (url, post, token) => {
    const res = await axios.put(`${BASE_URL}/${url}`, post, {
        headers: { token: token}
    })
    return res;
}

export const patchDataAPI = async (url, post, token) => {
    const res = await axios.patch(`${BASE_URL}/${url}`, post, {
        headers: { token: token}
    })
    return res;
}

export const deleteDataAPI = async (url, token) => {
    const res = await axios.delete(`${BASE_URL}/${url}`, {
        headers: { token: token}
    })
    return res;
}