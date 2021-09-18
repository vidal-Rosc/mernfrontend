import axiosClient from './axios';

const authToken = token => {
    token ? axiosClient.defaults.headers.common['x-auth-token'] = token
          : delete axiosClient.defaults.headers.common['x-auth-token']
}

export default authToken;