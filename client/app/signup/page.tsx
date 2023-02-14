"use client";
import Link from "next/link";
import Head from "next/head";
import {
  ChangeEvent,
  FocusEventHandler,
  FormEvent,
  useReducer,
  useState,
} from "react";
import axios from "axios";
import validator from "./validator";
import { useRouter } from "next/router";
import { TextField, Dropdown, Button } from "@/ui";
import { User } from "@/type";

interface UserSignUpType extends User {
  passwordConfirm: string;
}

const monthDataSet = [
  { label: "Tháng 1", value: 1 },
  { label: "Tháng 2", value: 2 },
  { label: "Tháng 3", value: 3 },
  { label: "Tháng 4", value: 4 },
  { label: "Tháng 5", value: 5 },
  { label: "Tháng 6", value: 6 },
  { label: "Tháng 7", value: 7 },
  { label: "Tháng 8", value: 8 },
  { label: "Tháng 9", value: 9 },
  { label: "Tháng 10", value: 10 },
  { label: "Tháng 11", value: 11 },
  { label: "Tháng 12", value: 12 },
];

const rules = {
  firstName: [{ type: "isRequired", errorMessage: "Hãy nhập tên" }],
  lastName: [{ type: "isRequired", errorMessage: "Hãy nhập họ" }],
  email: [
    { type: "isRequired", errorMessage: "Nhập một địa chỉ email" },
    { type: "isEmail", errorMessage: "Địa chỉ email này không hợp lệ" },
  ],
  password: [
    { type: "isRequired", errorMessage: "Nhập mật khẩu" },
    {
      type: "minLength",
      min: 8,
      errorMessage: "Sử dụng 8 ký tự trở lên cho mật khẩu của bạn",
    },
  ],
  passwordConfirm: [
    { type: "isRequired", errorMessage: "Xác nhận mật khẩu của bạn" },
    {
      type: "isConfirmed",
      errorMessage: "Mật khẩu đã nhập không khớp",
    },
  ],
  day: [
    { type: "isRequired", errorMessage: "Hãy nhập ngày" },
    {
      type: "isTrueDay",
      errorMessage: "Ngày không hợp lệ",
    },
  ],
  month: [{ type: "isRequired", errorMessage: "Hãy chọn tháng" }],
  year: [{ type: "isRequired", errorMessage: "Hãy nhập năm" }],
  gender: [{ type: "isRequired", errorMessage: "Hãy chọn giới tính" }],
};

const formReducer = (
  state: UserSignUpType,
  action: { type: string; data: { name: string; value: string } }
) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        [action.data.name]: action.data.value,
      };
    case "VALIDATE":
      return {
        ...state,
        [action.data.name]: action.data.value,
      };
    default:
      return state;
  }
};

const RegisterForm = () => {
  const [formData, dispatch] = useReducer(formReducer, {} as UserSignUpType);
  const [user, setUser] = useState<UserSignUpType>({} as UserSignUpType);

  const [errorMessage, setErrorMsg] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
    day: "",
    month: "",
    year: "",
    gender: "",
  });

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    dispatch({
      type: "UPDATE",
      data: { name: event.target.name, value: event.target.value },
    });
  };

  const handleBlur = (e: FocusEventHandler<HTMLInputElement>) => {
    // let name = ;
    // console.log(e.target.name);
    // const msg = validator()
    // setErrorMsg((errorMessage) => ({ ...errorMessage, [event.target.name]: msg.msg }));
    // return !msg.error;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    let isFormValid = true;

    // for (let key in rules) {
    //   let isValid = checkValid(key);
    //   if (!isValid) {
    //     isFormValid = false;
    //   }
    // }
    // console.log(isFormValid);
    // if (isFormValid) {
    //   axios.post(`${process.env.NEXT_PUBLIC_HOST}/users/register`, user);
    // }
  };

  // const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
  //   setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  // };

  // console.log(formData);
  return (
    <>
      <Head>
        <title>Tạo một tài khoản</title>
      </Head>
      <div className="md:my-14 w-full rounded-2xl shadow-2xl bg-white">
        <div className="p-3 text-center font-medium">Đăng ký tài khoản</div>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-6 w-full gap-x-4 border-t px-3 py-5"
        >
          <TextField
            className="col-span-3"
            id="firstName"
            type="text"
            label="Tên"
            onChange={handleChange}
            value={user.firstName}
            errorMessage={errorMessage.firstName}
            // onBlur={handleBlur}
            // checkValid={checkValid}
          />
          <TextField
            id="lastName"
            className="col-span-3"
            type="text"
            label="Họ"
            onChange={handleChange}
            value={user.lastName}
            errorMessage={errorMessage.lastName}
            // checkValid={checkValid}
          />
          <TextField
            className="col-span-full mt-4"
            id="email"
            type="text"
            label="Địa chỉ email của bạn"
            onChange={handleChange}
            errorMessage={errorMessage.email}
            // checkValid={checkValid}
            value={user.email}
          />
          <TextField
            className="col-span-3 mt-4"
            id="password"
            type="password"
            label="Mật khẩu"
            onChange={handleChange}
            errorMessage={errorMessage.password}
            // checkValid={checkValid}
            value={user.password}
          />

          <TextField
            className="col-span-3 mt-4"
            id="passwordConfirm"
            type="password"
            label="Xác nhận"
            onChange={handleChange}
            errorMessage={errorMessage.passwordConfirm}
            // checkValid={checkValid}
            value={user.passwordConfirm}
          />
          <span className="col-span-full mt-4 mb-1 text-sm">Ngày sinh</span>

          <TextField
            className="col-span-2"
            id="day"
            type="tel"
            label="Ngày"
            onChange={handleChange}
            errorMessage={errorMessage.day}
            // checkValid={checkValid}
            value={user.day}
          />
          <Dropdown
            className="col-span-2"
            id="month"
            label="Tháng"
            options={monthDataSet}
            value={user.month}
            errorMessage={errorMessage.month}
            // checkValid={checkValid}
            // onChange={handleChange}
          />
          <TextField
            className="col-span-2"
            id="year"
            type="tel"
            label="Năm"
            onChange={handleChange}
            errorMessage={errorMessage.year}
            // checkValid={checkValid}
            value={user.year}
          />
          <Dropdown
            className="col-span-full mt-4"
            id="gender"
            label="Giới tính"
            options={[
              { label: "Nam", value: 1 },
              { label: "Nữ", value: 2 },
              { label: "Không  muốn trả lời", value: 3 },
            ]}
            // onChange={handleChange}
            value={user.gender}
            errorMessage={errorMessage.gender}
            // checkValid={checkValid}
          />
          <span className="col-span-full text-sm mt-8">
            Bằng cách nhấp vào Đăng ký, bạn đồng ý với Điều khoản, Chính sách
            quyền riêng tư và Chính sách cookie của chúng tôi.
          </span>
          <Button type="submit">Đăng ký</Button>
          <Link
            className="flex justify-center mt-4 col-span-full font-medium"
            href="/login"
          >
            Bạn đã có tài khoản?
          </Link>
        </form>
      </div>
    </>
  );
};

const RegisterSuccess = () => {
  const router = useRouter();
  return (
    <div className="mt-6 w-64 h-64 flex flex-col relative justify-center items-center bg-white border rounded-2xl">
      <div className="font-semibold absolute top-2">Thông báo</div>
      <span>Bạn đã đăng ký thành công</span>
      <button
        className="bg-black absolute text-white px-4 py-2 rounded-full bottom-4"
        onClick={() => {
          router.push(`/login`);
        }}
      >
        Quay lại đăng nhập
      </button>
    </div>
  );
};

export default function Signup() {
  const [isRegister, setIsRegister] = useState(true);
  const toggle = () => {
    setIsRegister(!isRegister);
  };
  return (
    <>
      <Head>
        <title>Đăng ký tài khoản</title>
      </Head>
      <div className="md:max-w-sm flex flex-col items-center mx-auto">
        {isRegister ? (
          <RegisterForm />
        ) : (
          <div className="fixed z-50 top-0 left-0 w-full h-full bg-black/50 backdrop-blur-lg flex justify-center items-center">
            <RegisterSuccess />
          </div>
        )}
      </div>
    </>
  );
}

// Signup.getLayout = function getLayout(signup) {
//   return <Layout navbar={false}>{signup}</Layout>;
// };
