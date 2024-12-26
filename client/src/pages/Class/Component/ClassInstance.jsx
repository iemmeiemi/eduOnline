import React from "react";
import { GrStatusGoodSmall } from "react-icons/gr";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const ClassInstance = ({ classInstance }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Time Slots</th>
            <th>Pending</th>
            <th>Accepted</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {classInstance.length > 0 ? (
            classInstance.map((instance, i) => (
              <tr key={instance._id}>
                <th>{i + 1}</th>
                <td>{instance.name}</td>
                <td>
                  {instance.timeSlots.length > 0 ? (
                    instance.timeSlots.map((t, index) => (
                      <div key={index} className="mb-2">
                        <span className="text-dark-blue font-bold">
                          {t.day}
                        </span>{" "}
                        {t.startTime} - {t.endTime}
                      </div>
                    ))
                  ) : (
                    <div>There is no Time Slot Available</div>
                  )}
                </td>
                <td>
                  {instance.pendingStudents
                    ? instance.pendingStudents.length
                    : 0}
                </td>
                <td>{instance.students ? instance.students.length : 0}</td>
                <td>
                  <GrStatusGoodSmall
                    className={
                      instance.status ? "text-green-400" : "text-red-600"
                    }
                  />
                </td>
                <td>
                  <Link
                    to={`/class/instance/${instance._id}`}
                    state= {instance}
                    className="btn bg-light-blue" > Detail
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center text-red-600">
                There is no class open
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const ClassInstanceView = ({ classInstance, classDetail }) => {
  const { userRoleInfo, userInfo } = useAuth();
  const request = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleRegisterToInstance = (id) => {
    console.log("userRole :", userRoleInfo?._id);
    const idClass = classDetail._id;
    const packageData = {
      idClass: classDetail._id,
      idStudent: userRoleInfo?._id, // Chú ý dấu phẩy sau mỗi cặp khóa-giá trị
    };

    request("POST", "/api/class/join/" + id, packageData)
      .then((res) => {
        toast.success("Join Successfully!");
        navigate("/class/" + classDetail._id, { replace: true });
      })
      .catch((error) => {
        console.error("Error join class:", error.message);
        toast.error("Failed to join class: " + error.message);
      });
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Time Slots</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {classInstance.length > 0 ? (
            classInstance.map((instance, i) => (
              <tr key={instance._id}>
                <th>{i + 1}</th>
                <td>{instance.name}</td>
                <td>
                  {instance.timeSlots.length > 0 ? (
                    instance.timeSlots.map((t, index) => (
                      <div key={index} className="mb-2">
                        <span className="text-dark-blue font-bold">
                          {t.day}
                        </span>{" "}
                        {t.startTime} - {t.endTime}
                      </div>
                    ))
                  ) : (
                    <div>There is no Time Slot Available</div>
                  )}
                </td>
                <td>
                  <GrStatusGoodSmall
                    className={
                      instance.status ? "text-green-400" : "text-red-600"
                    }
                  />
                </td>
                <td>
                  {userRoleInfo?._id !== 0 &&
                  instance.pendingStudents?.includes(userInfo?._id) ? (
                    <button className="btn bg-gray-200">Registered</button>
                  ) : instance.students?.includes(userInfo?._id) ? (
                    <a className="btn btn-orange text-white" href="">
                      View
                    </a>
                  ) : (
                    // Nếu không, hiển thị nút Đăng Ký
                    <button
                      className="btn bg-light-blue"
                      onClick={() => handleRegisterToInstance(instance._id)}
                    >
                      Register
                    </button>
                  )}
                  {console.log("pending: ", instance)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center text-red-600">
                There is no Class opening
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClassInstance;
export { ClassInstanceView };
