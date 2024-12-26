import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm, Controller } from "react-hook-form";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import { FaPlusCircle } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";

const CreateInstanceModal = ({ classDetail }) => {
  const request = useAxios();

  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDay, setSelectedDay] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeSlot, setTimeSlot] = useState([]);

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  //react hook form
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // In ra dữ liệu khi form được submit
    const name = data.name;
    const des = data.des;
    const timeSlots = timeSlot;
    const instance = { name, des, timeSlots };
    const idClass = classDetail._id;
    const dataPackage = { instance, idClass };

    request("POST", "/api/class/instance", dataPackage)
      .then((res) => {
        toast.success("Class Instance created successfully!");
        navigate("/class/" + classDetail._id, { replace: true });
      })
      .catch((error) => {
        console.error("Error creating class:", error.message);
        toast.error("Failed to create class: " + error.message);
      });
  };

  const handleAddTimeSlot = () => {
    const day = selectedDay;
    const endtime = endTime;
    const starttime = startTime;

    const newTimeSlot = {
      day: day,
      startTime: starttime,
      endTime: endtime,
    };
    setTimeSlot((prevTimeSlots) => [...prevTimeSlots, newTimeSlot]);
  };

  const handleRemoveTimeSlot = (index) => {
    setTimeSlot((prevTimeSlots) => prevTimeSlots.filter((_, i) => i !== index));
  };

  return (
    <dialog id="my_modal_4" className="modal modal-middle sm:modal-middle">
      <div className="modal-box w-full max-w-5xl">
        <div className="modal-action flex-col justify-center mt-0">
          <form
            className="card-body"
            method="dialog"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h3 className="font-bold text-lg">Create Instance</h3>

            {/* Instance name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Instance's Name</span>
              </label>
              <input
                type="text"
                placeholder="Instance's Name"
                defaultValue={classDetail.name}
                className="input input-bordered"
                {...register("instanceName")}
              />
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Instance's Description</span>
              </label>
              <input
                type="text"
                placeholder="Instance Description"
                defaultValue={classDetail.des}
                className="input input-bordered"
                {...register("instamceDes", { required: true })}
              />
            </div>

            {/* time SLots */}
            <div className="flex flex-col">
              {/* day */}
              <div className="form-control flex flex-row">
                <select
                  className="select select-bordered w-full max-w-xs"
                  value={selectedDay}
                  onChange={handleDayChange}
                >
                  <option disabled value="">
                    Choose day
                  </option>
                  <option>Monday</option>
                  <option>Tuesday</option>
                  <option>Wednesday</option>
                  <option>Thursday</option>
                  <option>Friday</option>
                  <option>Saturday</option>
                  <option>Sunday</option>
                </select>
              </div>

              <div className="flex flex-row gap-5">
                {/* Start time */}
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text">Start Time</span>
                  </label>
                  <TimePicker onChange={setStartTime} value={startTime} />
                </div>

                {/* End time */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">End Time</span>
                  </label>
                  <TimePicker onChange={setEndTime} value={endTime} />
                </div>
                <button onClick={handleAddTimeSlot}>
                  Add{" "}
                  <FaPlusCircle className="hover:text-super-light-gray text-lg text-center" />
                </button>
              </div>
            </div>
            <div>
              {timeSlot.length > 0 ? (
                timeSlot.map((t, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <span className="text-dark-blue font-bold">{t.day}</span>{" "}
                      {t.startTime} - {t.endTime}
                    </div>
                    <button
                      className="btn btn-sm btn-circle btn-ghost text-red-500"
                      onClick={() => handleRemoveTimeSlot(index)}
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-red-500">Please Pick Time Slot!</p>
              )}
            </div>

            {/* Error message */}
            {errorMessage && (
              <p className="text-red text-xs italic">{errorMessage}</p>
            )}

            {/* Submit button */}
            <div className="form-control mt-4">
              <input
                type="submit"
                className="btn bg-orange text-white"
                value="Create"
              />
            </div>

            {/* Close button */}
            <div
              htmlFor="my_modal_4"
              className="btn btn-sm btn-circle btn-ghost absolute hover:bg-orange right-2 top-2"
              onClick={() => document.getElementById("my_modal_4").close()}
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
