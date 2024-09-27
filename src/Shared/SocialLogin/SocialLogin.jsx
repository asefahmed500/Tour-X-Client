import { FaGoogle } from 'react-icons/fa';
import useAuth from './../../Hooks/useAuth';
import { useToast } from '../../Hooks/useToast';
import { useNavigate } from 'react-router-dom';
import useAxiosPublic from './../../Hooks/useAxiosPublic';

const SocialLogin = ({ type }) => {
    const { googlesignin } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    const  axiosPublic =   useAxiosPublic();

    const handlegooglesignin = () => {
        googlesignin()
        .then(result => {
            console.log(result.user);
            const userinfo = {
                email : result.user?.email,
                name : result.user?.displayName

            }

            axiosPublic.post("/users" , userinfo)
            .then(res => {
                console.log(res.data)
                navigate("/")
            })
            const successMessage = type === 'login' ? "User logged in successfully" : "User signed up successfully";
            showToast(successMessage);
          
        })
        .catch(error => {
            console.error("error", error);
            const errorMessage = type === 'login' ? "Login failed" : "Signup failed";
            showToast(errorMessage);
        });
    };

    return (
        <div className='my-3'>
            <div className="divider">OR</div>
            <button
                onClick={handlegooglesignin}
                className="btn btn-wide sm:btn-sm md:btn-md lg:btn-lg">
                <FaGoogle /> Google
            </button>
        </div>
    );
};

export default SocialLogin;
