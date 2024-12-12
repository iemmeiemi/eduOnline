/* eslint-disable react/prop-types */
import React, { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  deleteUser,
  updateProfile,
} from "firebase/auth";
import app from "../services/firebase.config";
import useAxios from "../hooks/useAxios";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const [loading, setLoading] = useState(true);
  const request = useAxios();

  const signUpWithEmailAndPassword = async (email, password, name) => {
    setLoading(true);
    try {
      // Tạo tài khoản với email và password trên Firebase Authentication
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userObj = {
        email: result.user.email,
        name: name,
        photoURL: null, // Hoặc để trống nếu không có ảnh đại diện
      };

      // Gửi thông tin người dùng đến backend
      const response = await request("POST", "api/auth/register", userObj);

      if (response.status === 201) {
        return "Successfully signed up with Email!";
      } else {
        throw new Error(response.data.message || "Failed to register user.");
      }
    } catch (error) {
      const user = auth.currentUser;
      if (user) {
        try {
          await deleteUser(user); // Xóa tài khoản trên Firebase nếu có lỗi
          console.log("User account deleted successfully on Firebase.");
        } catch (deleteError) {
          console.error(
            "Error deleting Firebase account: ",
            deleteError.message
          );
        }
      }
      throw new Error("Error signing up with Email: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  //logup
  const signUpWithGmail = async (data) => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userInfo = {
        email: result.user.email,
        name: result.user.displayName,
        photoURL: result.user.photoURL,
        authMethod: "gg",
      };
      const response = await request(
        "POST",
        "api/auth/register-google",
        userInfo
      );
      setUserInfo(response.data);
      return "Done!";
    } catch (error) {
      const user = auth.currentUser;
      if (response.status === 500 && response.message == "db") {
        if (user) {
          try {
            await deleteUser(user); // Xóa tài khoản Firebase
            console.log("User account deleted successfully on Firebase.");
          } catch (deleteError) {
            console.error(
              "Error deleting Firebase account: ",
              deleteError.message
            );
          }
        }
      } else if (response.status === 500 && response.message == "method") {
        throw new Error("Email already register with another method!");
      } else {
        throw new Error(response.message || "Failed to register user.");
      }
    } finally {
      setLoading(false);
    }
  };

  //login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    localStorage.removeItem("access-token");
    setUserInfo(null);
    return signOut(auth);
  };

  // update your profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userInfo = { email: currentUser.email };
        try {
          // Gọi API bất đồng bộ để làm mới access token
          const response = await request(
            "POST",
            "api/auth/refresh-access-token",
            userInfo
          );
          console.log("access: " + response.data.accessToken);
          if (response.data && response.data.accessToken) {
            localStorage.setItem("access-token", response.data.accessToken);
          }
        } catch (error) {
          localStorage.removeItem("access-token");
        }
      } else {
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return () => {
      unsubscribe(); // Hủy đăng ký khi component bị unmount
    };
  }, [auth]);

  const authInfo = {
    user,
    loading,
    signUpWithEmailAndPassword,
    login,
    logOut,
    signUpWithGmail,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
