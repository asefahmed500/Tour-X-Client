import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";


import { useToast } from "../../Hooks/useToast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";

import useAxiosPublic from './../../Hooks/useAxiosPublic';



const SignUp = () => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm();
    const { createuser, updateuserprofile } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const { showToast } = useToast();

    const onSubmit = data => {
        createuser(data.email, data.password)
            .then(result => {
                const user = result.user;
                // showToast(" User Has been created");
              

                console.log("User created", user);

                updateuserprofile(data.name, data.PhotoUrl)
                    .then(() => {
                        console.log("User profile Has been Updated")
                        // showToast(" User profile Has been Updated");

                        const userInfo = {
                            name: data.name,
                            email: data.email
                        };

                        axiosPublic.post('/users', userInfo)
                        .then(res => {
                            if(res.data.insertedId) {
                                showToast("Sign Up Successful", "Your account has been created successfully!", "success");
                                navigate(from, { replace: true });
                                reset();

                            }
                            else{
                                showToast("Sign Up Error", "Failed to save user information.", "error");
                            }
                        })

                        .catch(error => {
                            console.error("Error saving user information:", error);
                            showToast("Sign Up Error", "Failed to save user information.", "error")


                        })






                    })
                    .catch(error => {
                        console.log("User profile  Update failed", error)
                        showToast(" User profile  Update failed");

                    })
            })
            .catch(error => {
                showToast("User sign up failed", {
                    type: "error", // Optional: Customize the toast for error
                });
                console.error("Sign-up error", error);
            });
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="name"
                                    {...register("name", { required: true })}
                                    placeholder="name"
                                    className="input input-bordered"
                                />
                                {errors.name?.type === "required" && (
                                    <p className="text-red-500" role="alert"> Name is required</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", { required: true })}
                                    placeholder="email"
                                    className="input input-bordered"
                                />
                                {errors.email?.type === "required" && (
                                    <p className="text-red-500" role="alert">Email is required</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("PhotoUrl", { required: true })}
                                    placeholder="Enter Your Photo Url"
                                    className="input input-bordered"
                                />
                                {errors.PhotoUrl?.type === "required" && (
                                    <p className="text-red-500" role="alert">Photo Url is required</p>
                                )}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    {...register("password", { required: true })}
                                    placeholder="password"
                                    className="input input-bordered"
                                />
                                {errors.password?.type === "required" && (
                                    <p className="text-red-500" role="alert"> Password is required</p>
                                )}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Sign Up</button>
                            </div>
                            <div>
                                <p className="text-center">Already have an Account on Tour X ? <Link className="text-blue-500 font-bold" to="/login">log in </Link></p>
                            </div>
                            <div className="flex justify-evenly">
                                <SocialLogin type={"signup"}></SocialLogin>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
