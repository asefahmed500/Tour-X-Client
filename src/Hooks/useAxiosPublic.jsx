import axios from "axios";
const axiosPublic = axios.create({
    baseURL: 'https://tourist-guide-server-navy.vercel.app'
})

const useAxiosPublic = () => {

    return axiosPublic;
};

export default useAxiosPublic;