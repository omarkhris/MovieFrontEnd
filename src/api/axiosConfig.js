import axios from "axios";

export default axios.create({
    baseURL: 'https://d1ahaskoqeppwz.cloudfront.net/',
    headers:{"Authorization":"true"}
});

