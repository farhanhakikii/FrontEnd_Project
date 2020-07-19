import Axios from "axios";
import { API_URL } from "../../constants/API";
import Cookie from "universal-cookie";
import swal from 'sweetalert';

const cookieObj = new Cookie();

export const loginHandler = (userData) => {
  return (dispatch) => {
    const { username, password } = userData;

    Axios.get(`${API_URL}/users/un`, {
      params: {
        username,
      },
    })
      .then((res) => {
        if (res.data == null) {
          swal("Username Tidak Terdaftar.");
          dispatch({
            type: "ON_LOGIN_FAIL",
            payload: "Username Tidak Terdaftar.",
          });
        } else {
          Axios.get(`${API_URL}/users/login`, {
            params: {
              username,
              password
            }
          })
          .then((res) => {
            swal("Berhasil Login")
            dispatch({
              type: "ON_LOGIN_SUCCESS",
              payload: res.data,
            })
          })
          .catch((err) => {
            swal("Password Salah")
            console.log(err)
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const userKeepLogin = (userData) => {
  return (dispatch) => {
    Axios.get(`${API_URL}/users/kl`, {
      params: {
        id: userData.id,
      },
    })
      .then((res) => {
        if (res.data != null) {
          dispatch({
            type: "ON_LOGIN_SUCCESS",
            payload: res.data,
          });
        } else {
          dispatch({
            type: "ON_LOGIN_FAIL",
            payload: "Username atau password salah",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const logoutHandler = () => {
  cookieObj.remove("authData", { path: "/" });
  swal("Berhasil Logout")
  return {
    type: "ON_LOGOUT_SUCCESS",
  };
};

export const registerHandler = (userData) => {
  return (dispatch) => {
    if(userData.fullName === "" || userData.username === "" || userData.email === "" || userData.password === "" || userData.role == "") {
      swal("Mohon Lengkapi Form")
    } else {
        Axios.get(`${API_URL}/users/un`, {
          params: {
            username: userData.username,
          },
        })
        .then((res) => {
          console.log(res)
          if (res.data != null) {
            swal("Username Sudah Terdaftar");
            dispatch({
              type: "ON_REGISTER_FAIL",
              payload: "Username sudah digunakan",
            });
          } else {
            Axios.get(`${API_URL}/users/em`, {
              params: {
                email: userData.email
              }
            })
            .then((res) => {
              if(res.data != null){
                swal("Email Sudah Terdaftar.")
                dispatch({
                  type: "ON_REGISTER_FAIL",
                  payload: "Username sudah digunakan",
                });    
              } else {
                Axios.post(`${API_URL}/users`, { ...userData })
                .then((res) => {
                  swal("Registrasi Berhasil. Cek Email Untuk Melakukan Verifikasi Akun")
                  dispatch({
                    type: "ON_LOGIN_SUCCESS",
                    payload: res.data,
                  });
                })
                .catch((err) => {
                  console.log(err);
                });  
              }
            })
            .catch((err) => {
              swal("gagal")
              console.log(err);
            })
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};

export const cookieChecker = () => {
  return {
    type: "COOKIE_CHECK",
  };
};