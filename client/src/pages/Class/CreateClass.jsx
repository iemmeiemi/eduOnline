import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TimePicker from 'react-time-picker';


import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import useCategory from "../../hooks/useCategory";

import { toast } from "react-toastify";

const CreateClass = () => {
  const { userInfo } = useAuth();
  const { categories, isLoading } = useCategory();
  const request = useAxios();

  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]); // State cho preview

  const navigate = useNavigate();
  const location = useLocation();
  const animatedComponents = makeAnimated();

  const categoriesOptions =
    !isLoading && categories
      ? categories.map((category) => ({
          value: category._id,
          label: category.name,
        }))
      : [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const instructor = userInfo._id;
    const formData = new FormData();
    formData.append("name", data.className);
    formData.append("des", data.des);
    formData.append("expectedDuration", data.expectedDuration);
    formData.append("category", JSON.stringify(data.category.map((item) => item.value)));
    formData.append("instructor", instructor);

    selectedImages.forEach((file) => {
      formData.append("images", file); // Append file thực tế
    });

    request("POST", "/api/class", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        toast.success("Class created successfully!");
        navigate("/class/"+response.data.data._id, { replace: true });
      })
      .catch((error) => {
        console.error("Error creating class:", error.message);
        toast.error("Failed to create class: " + error.message);
      });
  };

  const onImageChange = (event) => {
    const files = Array.from(event.target.files);

    // Kiểm tra nếu tổng số ảnh vượt quá 3
    if (selectedImages.length + files.length > 3) {
      toast.error("You can only upload up to 3 images.");
      return;
    }

    const newFiles = [];
    const newPreviews = [];

    files.forEach((file) => {
      newFiles.push(file); // Lưu file thực tế

      // Tạo Data URL cho preview
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        newPreviews.push(reader.result); // Lưu Data URL
        setImagePreviews((prev) => [...prev, reader.result]); // Cập nhật preview
      };
    });

    setSelectedImages((prevImages) => [...prevImages, ...newFiles]); // Cập nhật files
  };

  return (
    <div className="flex flex-col justify-stretch items-center gap-8 py-20 home-container">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <form className="card-body w-full" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Create New Class</h3>
          
          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Class name"
              className="input input-bordered"
              {...register("className", { required: "Name is required" })}
            />
            {errors.className && <p className="text-red-500">{errors.className.message}</p>}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              placeholder="Description"
              rows="5"
              className="textarea textarea-bordered"
              {...register("des", { required: "Description is required" })}
            ></textarea>
            {errors.des && <p style={{ color: "red" }}>{errors.des.message}</p>}
          </div>

          {/* Category */}
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                closeMenuOnSelect={false}
                components={animatedComponents}
                isMulti
                options={categoriesOptions}
                onChange={(selectedOption) => field.onChange(selectedOption)}
              />
            )}
          />

          {/* Expected Duration */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Expected Duration</span>
            </label>
            <input
              type="text"
              placeholder="Expected Duration"
              className="input input-bordered"
              {...register("expectedDuration", { required: "Expected Duration is required" })}
            />
            {errors.expectedDuration && <p style={{ color: "red" }}>{errors.expectedDuration.message}</p>}
          </div>

          {/* Photos */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photos (maximum 3)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="file-input w-full max-w-xs"
              onChange={onImageChange}
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4 mt-4">
            {imagePreviews.map((preview, index) => (
              <div key={index} className="relative">
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-full h-32 object-cover rounded"
                />
                <button
                  onClick={() => {
                    setSelectedImages((prevImages) =>
                      prevImages.filter((_, i) => i !== index)
                    );
                    setImagePreviews((prevPreviews) =>
                      prevPreviews.filter((_, i) => i !== index)
                    );
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              className="btn bg-orange text-white"
              value="Create"
            />
          </div>
        </form>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center"></div>
    </div>
  );
};

export default CreateClass;