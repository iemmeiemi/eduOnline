import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

const CreateInstanceModal = ({classDetail}) => {
  const { userInfo } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  //react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {

  };

  return (
    <dialog id="my_modal_5" className="modal modal-middle sm:modal-middle">
      <div className="modal-box">
        <div className="modal-action flex-col justify-center mt-0">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Please Login!</h3>

            {/* Instance name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Instance's Name</span>
              </label>
              <input
                type="instanceName"
                placeholder="Instance's Name"
                defaultValue={classDetail.name}
                className="input input-bordered"
                {...register("instanceName")}
              />
            </div>

            {/* description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Instance's Description</span>
              </label>
              <input
                type="instamceDes"
                placeholder="instamceDes"
                defaultValue={classDetail.des}
                className="input input-bordered"
                {...register("instamceDes", { required: true })}
              />
            </div>
            
            {/* description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Instance's Description</span>
              </label>
              <input
                type="instamceDes"
                placeholder="instamceDes"
                defaultValue={classDetail.des}
                className="input input-bordered"
                {...register("instamceDes", { required: true })}
              />
            </div>

            {/* show errors */}
            {errorMessage ? (
              <p className="text-red text-xs italic">
                Provide a correct username & password.
              </p>
            ) : (
              ""
            )}

            {/* submit btn */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-orange text-white"
                value="Create"
              />
            </div>

            {/* close btn */}
            <div
              htmlFor="my_modal_5"
              className="btn btn-sm btn-circle btn-ghost absolute hover:bg-orange right-2 top-2"
              onClick={() => document.getElementById("my_modal_5").close()}
            >
              ✕
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default CreateInstanceModal;
