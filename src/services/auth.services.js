import {http_client} from "@/plugins/http_client";

const login = async (body) => await http_client('/api/v1/login', body, 'post');
const changeEmail = async (body) => await http_client(`/api/v1/users/update/email`, body, 'put');
const changePassword = async (body) => await http_client(`/api/v1/users/update/password`, body, 'put');
const verifyAccount = async (token) => await http_client(`/api/v1/verification/account/${token}`);

export default {
    login,
    changeEmail,
    changePassword,
    verifyAccount
}