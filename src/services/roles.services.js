import {http_client} from "../plugins/http_client";

const getRoles = async () => http_client('/api/v1/roles')

export default {
    getRoles
}