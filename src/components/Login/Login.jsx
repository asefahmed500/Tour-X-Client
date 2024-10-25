import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";

import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../../Hooks/useToast";
import SocialLogin from "../../Shared/SocialLogin/SocialLogin";


const Login = () => {
    const { handleSubmit, register, formState: { errors } } = useForm();
    const { signinuser } = useAuth();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const onSubmit = data => {
        signinuser(data.email, data.password)
            .then(result => {
                const user = result.user;
                showToast(" User logged in SuccessFully"); // Trigger toast
                navigate("/");
                console.log("User logged in SuccessFully ", user);
            })
            .catch(error => {
                showToast(" User logged in  failed", {
                    type: "error", // Optional: Customize the toast for error
                });
                console.error("login error", error);
            });
    };

    return (
        <div>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Login  now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">

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

                            </div>
                            <label className="label">
                                <Link to="/forgetpassword" className="label-text-alt link link-hover">
                                    Forgot password?
                                </Link>
                            </label>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <div>
                                <p className="text-center">New to Tour X ? <Link className="text-blue-500 font-bold" to="/signup">Sign Up </Link></p>
                            </div>
                            <div className="flex justify-evenly">
                                <SocialLogin type={"login"}></SocialLogin>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;