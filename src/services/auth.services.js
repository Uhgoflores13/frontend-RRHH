import {http_client} from "@/plugins/http_client";

const login = async (body = {}) => await http_client('/api/v1/login', body, 'post')

export default {
    login
}