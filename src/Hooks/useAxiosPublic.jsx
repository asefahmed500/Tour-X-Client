import axios from "axios";
const axiosPublic = axios.create({
    baseURL: 'https://tour-x-server.onrender.com'
})

const useAxiosPublic = () => {

    return axiosPublic;
};

export default useAxiosPublic;