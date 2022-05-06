import {http_client} from "@/plugins/http_client";

const getUsers = async (params = {}) => await http_client('/api/v1/users', params)
const createUser = async (body) => await http_client('/api/v1/users', body, 'post')
const showUser = async (idUser) => await http_client(`/api/v1/users/${idUser}`)
const editUser = async (idUser, body) => await http_client(`/api/v1/users/${idUser}`, body, 'put')
const deleteUser = async (idUser) => await http_client(`/api/v1/users/${idUser}`, {}, 'delete')

export default {
    getUsers,
    createUser,
    showUser,
    editUser,
    deleteUser
}