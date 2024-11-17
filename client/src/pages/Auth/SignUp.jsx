import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match.", // Thêm thông báo lỗi vào confirmPassword
      });
      return; // Ngừng xử lý nếu mật khẩu không khớp
    }

    // Nếu mật khẩu khớp, thực hiện logic đăng ký tại đây
    console.log("Registration successful!", data);
  };

  const handleRegister = () => {
    // Logic đăng ký với Google, Facebook, GitHub
  };

  return (
    <div className="max-w-lg bg-white shadow w-full mx-auto flex items-center justify-center my-10">
      <div className="mb-5">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Please Create An Account!</h3>
          
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password Fields in One Row */}
          <div className="flex space-x-4">
            {/* Password */}
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </div>

            {/* Password Again */}
            <div className="form-control flex-1">
              <label className="label">
                <span className="label-text">Password Again</span>
              </label>
              <input
                type="password"
                placeholder="confirm password"
                className="input input-bordered"
                {...register("confirmPassword", { required: "Please confirm your password" })}
              />
              {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn bg-orange text-white"
              value="Sign up"
            />
          </div>

          <div className="text-center my-2">
            Have an account?
            <Link to="/login">
              <button className="ml-2 underline">Login here</button>
            </Link>
          </div>
        </form>

        {/* Social Media Buttons */}
        <div className="text-center space-x-3">
          <button
            onClick={handleRegister}
            className="btn btn-circle hover:bg-orange hover:text-white"
          >
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-orange hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-orange hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;