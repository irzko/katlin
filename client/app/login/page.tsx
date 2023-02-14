"use client";
import Link from "next/link";
import { TextField, Button } from "@/ui";
import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/user/context";
import { useContext } from "react";
import axios from "axios";
import clsx from "clsx";

const Warning = ({ warn, className }: { warn: string; className: string }) => {
  return <div className={clsx("text-red-600", className)}>{warn}</div>;
};

export default function Login() {
  const router = useRouter();
  const [loginFailure, setLoginFailure] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [state, userDispatch] = useContext(UserContext);

  const changeInputValue = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((user) => ({ ...user, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    userDispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/auth`,
        user
      );
      userDispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      router.push("/");
    } catch (err) {
      userDispatch({ type: "LOGIN_FAILURE" });
      setLoginFailure(true);
    }
  };

  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <h1 className="pt-3 text-5xl font-medium text-center">irzko</h1>
      <div className="md:max-w-sm flex flex-col items-center mx-auto">
        <div className="my-14 w-full rounded-2xl bg-white shadow-2xl">
          <div className="p-3 text-center font-bold">Đăng nhập</div>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-6 w-full gap-4 border-t px-3 py-5"
          >
            <TextField
              id="email"
              type="text"
              className="col-span-full"
              label="Email hoặc tên người dùng"
              onChange={changeInputValue}
              value={user.email}
              errorMessage={""}
            />
            <TextField
              id="password"
              className="col-span-full"
              type="password"
              label="Mật khẩu"
              onChange={changeInputValue}
              value={user.password}
              errorMessage={""}
            />
            {loginFailure ? (
              <Warning
                warn="Thông tin đăng nhập không hợp lệ"
                className="col-span-full"
              ></Warning>
            ) : (
              <></>
            )}
            <Button type="submit">Đăng nhập</Button>
            <div className="col-span-full flex justify-center">
              <a href="#">Quên mật khẩu?</a>
            </div>
            <Link
              className="mt-12 col-span-full border border-black h-10 rounded-md flex justify-center items-center font-medium"
              href="/signup"
            >
              Tạo một tài khoản
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
