import React from "react";
import { GrStatusGoodSmall } from "react-icons/gr";

const ex = [
  {
    name: "Lớp học Toán",
    des: "Lớp học cho học sinh cấp 2",
    pendingStudents: [],
    students: [],
    timeSlots: [
      {
        day: "Monday",
        startTime: "10:00",
        endTime: "12:00",
      },
      {
        day: "Wednesday",
        startTime: "10:00",
        endTime: "12:00",
      },
    ],
    status: 1,
    createdAt: "2024-12-26T00:00:00Z",
    endedAt: null,
    deletedAt: null,
  },
  {
    name: "Lớp học Lý",
    des: "Lớp học cho học sinh cấp 3",
    pendingStudents: [],
    students: [],
    timeSlots: [
      {
        day: "Tuesday",
        startTime: "10:00",
        endTime: "12:00",
      },
      {
        day: "Thursday",
        startTime: "10:00",
        endTime: "12:00",
      },
    ],
    status: 1,
    createdAt: "2024-12-26T00:00:00Z",
    endedAt: null,
    deletedAt: null,
  },
];

const ClassInstance = ({ classInstance }) => {
  return (
    <div className="overflow-x-auto  w-full ">
      <table className="table w-full ">
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
          {classInstance.length > 0 ? classInstance.map((instance, i) => {
            return (
              // Thêm return ở đây
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{instance.name}</td>
                <td>
                  {instance.timeSlots.length > 0 ? ( // Kiểm tra độ dài mảng
                    instance.timeSlots.map((t, index) => (
                      <div key={index}>
                        {" "}
                        {/* Thêm key cho từng phần tử */}
                        <p>
                          <span className="text-dark-blue font-bold">
                            {t.day}
                          </span>{" "}
                          {t.startTime} - {t.endTime}
                        </p>
                        <br />
                      </div>
                    ))
                  ) : (
                    <p>There is no Time Slot Available</p>
                  )}
                </td>
                <td>{instance.pendingStudents.length}</td>
                <td>{instance.students.length}</td>
                <td>
                  <GrStatusGoodSmall
                    className={
                      instance.status ? "text-green-400" : "text-red-600"
                    }
                  />
                </td>
                <td>
                  <a href="" className="btn bg-light-blue">Detail</a>
                </td>
              </tr>
            );
          }) : <p className="text-center text-red-600">There is no class open</p> }
        </tbody>
      </table>
    </div>
  );
};

const ClassInstanceView = ({ classInstance }) => {
  return (
    <div className="overflow-x-auto  w-full ">
      <table className="table w-full ">
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
          {classInstance.length > 0 ? (classInstance.map((instance, i) => {
            return (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>{instance.name}</td>
                <td>
                  {instance.timeSlots.length > 0 ? ( // Kiểm tra độ dài mảng
                    instance.timeSlots.map((t, index) => (
                      <div key={index}>
                        {" "}
                        <p>
                          <span className="text-dark-blue font-bold">
                            {t.day}
                          </span>{" "}
                          {t.startTime} - {t.endTime}
                        </p>
                        <br />
                      </div>
                    ))
                  ) : (
                    <p>There is no Time Slot Available</p>
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
                  <a href="" className="btn bg-light-blue ">Register</a>
                </td>
              </tr>
            );
          })): <p className="text-center text-red-600">There is no Class opening</p> }
        </tbody>
      </table>
    </div>
  );
};

export default ClassInstance;
export { ClassInstanceView };
