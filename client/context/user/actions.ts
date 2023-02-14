import { User } from "@/type";

// export const LoginStart = (userCredentials) => ({
//   type: "LOGIN_START",
// });

export const LoginSuccess = (user: User) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const Logout = () => ({
  type: "LOGOUT",
});

// export const UpdateStart = (userCredentials) => ({
//   type: "UPDATE_START",
// });

export const UpdateSuccess = (user: User) => ({
  type: "UPDATE_SUCCESS",
  payload: user,
});

export const UpdateFailure = () => ({
  type: "UPDATE_FAILURE",
});
