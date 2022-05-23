import {http_client} from "@/plugins/http_client";

const login = async (body) => await http_client('/api/v1/login', body, 'post')
const changeEmail = async (body) => await http_client(`/api/v1/users/update/email`, body, 'put')

export default {
    login,
    changeEmail
}