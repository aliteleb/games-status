import axios from "axios";

const token = () => {
    let token = document.getElementsByTagName('meta')[1].getAttribute('content');
    document.getElementsByTagName('meta')[1].setAttribute('content', btoa(token).slice(0, 64));
    return btoa(token);
}

const instance = () => {
    return axios.create({
        baseURL: 'https://games-status.test/api',
        headers: {
            'Accept': 'application/json',
            'token': token(),
        }
    });
}

export default instance;
