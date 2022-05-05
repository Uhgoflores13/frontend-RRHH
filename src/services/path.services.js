import {http_client} from "@/plugins/http_client";

const getPaths = async (params = {}) => await http_client('/api/v1/rutas', params, 'get')
const storePaths = async (body = {}) => await http_client('/api/v1/rutas', body, 'post')
const getPath = async (params = {}) => await http_client('/api/v1/rutas', params, 'get')
const updatePath = async (params = {}) => await http_client('/api/v1/rutas', params, 'get')

export default {
    getPaths,
    storePaths,
    getPath,
    updatePath
}