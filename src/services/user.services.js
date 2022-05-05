import {http_client} from "@/plugins/http_client";

const getUsers = async (params = {}) => await http_client('/api/v1/users', params)
const deleteUser = async (idUser) => await http_client(`/api/v1/users/${idUser}`, {}, 'delete')
const createUser = async (body) => await http_client('api/v1/users', body, 'post')

export default {
    getUsers,
    deleteUser,
    createUser
}