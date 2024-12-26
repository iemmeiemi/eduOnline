import React from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";
import avatarImg from "/images/avatar.jpg";

const OwnerProfile = () => {
  const { user, userInfo } = useAuth();
  if ( !user || !userInfo) {
    return <div>Loading...</div>; // Hoặc một thông báo khác phù hợp
  }
  return (
    <div className=" flex flex-col justify-stretch items-center gap-8 py-20 home-container">
      <div className="w-1/2 flex flex-col justify-center items-center">
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row">
            {user.photoURL ? (
              <img
                alt=""
                src={user.photoURL}
                className="max-w-sm rounded-lg shadow-2xl"
              />
            ) : (
              <img
                alt=""
                src={avatarImg}
                className="max-w-sm rounded-lg shadow-2xl"
              />
            )}
            <div>
              <h1 className="text-5xl font-bold">{user.displayName}</h1>
              <div className="overflow-x-auto">
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Email</td>
                      <td>{userInfo.email}</td>
                    </tr>
                    <tr>
                      <td>Birthday</td>
                      <td>{userInfo.birthdate}</td>
                      
                    </tr>
                    {/* row 3 */}
                    <tr>
                      <td>Gender</td>
                      <td>{userInfo.gender}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{userInfo.phone}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button className="btn btn-primary">Edit Profile</button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-center items-center"></div>
    </div>
  );
};

export default OwnerProfile;
