import {http_client} from "@/plugins/http_client";
const url='/api/v1/rutas'
const getPaths = async (params = {}) => await http_client(url, params, 'get')
const storePaths = async (body = {}) => await http_client(url, body, 'post')
const getPath = async (params = {}) => await http_client(url, params, 'get')
const updatePath = async (params = {}) => await http_client(url, params, 'get')

export default {
    getPaths,
    storePaths,
    getPath,
    updatePath
}