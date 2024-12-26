import React, { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MdOutlineVideoCall } from "react-icons/md";

const ClassInstanceDetail = () => {
  const { userInfo } = useAuth();
  const request = useAxios();
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [classDetail, setClassDetail] = useState(null);
  const [classInstance, setClassInstance] = useState(null);
  const [instructor, setInstructor] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    const fetchClassDetail = async () => {
      try {
        const response = await request("GET", `/api/class/instance/${id}`);
        
        setClassInstance(response.data.data.classInstance);
        
      } catch (err) {
        console.error(err);
      }
    };

    fetchClassDetail();
  }, [id, request]);

  const handleAcceptStudent = async (id) => {
    try {
      const idClassInstance = classInstance._id;
      const response = await request("PUT", `/api/class/accept`, {
        idStudent: id,
        idClassInstance,
      });

      if (response.data) {
        console.log("Student accepted:", response.data);
      } else {
        console.error("Failed to accept student:", response.data.message);
        navigate("/class/instance/" + classInstance._id, { replace: true });
      }
    } catch (error) {
      console.error("Error accepting student:", error);
      toast.error("Failed to accept student: " + error.message);
    }
  };

  const handleDenyStudent = async (id) => {
    try {
      const idClassInstance = classInstance._id;
      const response = await request("PUT", `/api/class/deny`, {
        idStudent: id,
        idClassInstance,
      });

      if (response.data) {
        console.log("Student denied:", response.data);
      } else {
        console.error("Failed to deny student:", response.data.message);
        navigate("/class/instance/" + classInstance._id, { replace: true });
      }
    } catch (error) {
      console.error("Error denying student:", error);
      toast.error("Failed to deny student: " + error.message);
    }
  };

  const handleStartCall = () => {
    // Thực hiện logic bắt đầu cuộc gọi ở đây
  };

  return (
    <div className="flex flex-col justify-stretch items-center gap-8 py-20 home-container">
      { userInfo?.role && userInfo?.role === "instructor" ? (
        <>
          <div>
            <h1 className="text-5xl font-bold">{location.state?.name}</h1>
            <p className="py-6">{location.state?.des}</p>
            <button className="btn bg-orange" onClick={handleStartCall}>
              Start <MdOutlineVideoCall className="text-xl" />
            </button>
          </div>

          {/* List of Pending Students */}
          <div className="flex flex-col lg:flex-row items-start gap-7">
            <div>
              <h2 className="text-xl font-bold">Pending Students</h2>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Gender</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {classInstance?.pendingStudents.length > 0 ? (
                      classInstance.pendingStudents.map((st, i) => (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>
                            <Link
                              to={`/profile/${st._id}`}
                              className="text-dark-blue"
                            >
                              {st.name}
                            </Link>
                          </td>
                          <td>{st.gender}</td>
                          <td>
                            <button
                              className="btn bg-light-blue"
                              onClick={() => handleAcceptStudent(st._id)}
                            >
                              Accept
                            </button>
                            <button
                              className="btn bg-red-500"
                              onClick={() => handleDenyStudent(st._id)}
                            >
                              Deny
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="text-center">
                          There are no Pending Students
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Accepted Students */}
            <div>
              <h2 className="text-xl font-bold">Accepted Students</h2>
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Gender</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classInstance?.students.length > 0 ? (
                      classInstance.students.map((st, i) => (
                        <tr key={i}>
                          <th>{i + 1}</th>
                          <td>
                            <Link
                              to={`/profile/${st._id}`}
                              className="text-dark-blue"
                            >
                              {st.name}
                            </Link>
                          </td>
                          <td>{st.gender}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          There are no Accepted Students
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      ) : (
        <button className="btn bg-orange" onClick={handleStartCall}>
          Start <MdOutlineVideoCall className="text-xl" />
        </button>
      )}
    </div>
  );
};

export default ClassInstanceDetail;
