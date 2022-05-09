import {http_client} from "../plugins/http_client";

const getProfiles = async () => await http_client('/api/v1/perfiles')

export default {
    getProfiles
}