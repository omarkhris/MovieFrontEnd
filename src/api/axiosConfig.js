import axios from "axios";

export default axios.create({
    baseURL: 'http://ec2-44-204-10-250.compute-1.amazonaws.com',
    headers:{"Authorization":"true"}
});

