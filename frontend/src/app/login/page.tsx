"use client";
import { useAppContext } from "@/context/AppContext";
import { login } from "@/utils/api";
import { getCookie, setCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";

function Login() {
  const { setUser } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const phoneNumber = formData.get("phoneNumber") as string;
    const password = formData.get("password") as string;
    const res = await login(phoneNumber, password);
    setLoading(false);
    if (res.code == 500) {
      setErrorMsg(res.message);
    } else {
      setErrorMsg("");
      setUser(res.data.user);
      setCookie("payload", res, {
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const userPayload = await getCookie("payload");
      if (userPayload) {
        setUser(JSON.parse(userPayload).data.user);
        window.location.href = "/";
      }
    };
    checkIfLoggedIn();
  }, []);

  return (
    <main className="h-screen flex items-center justify-center">
      <div className="w-[80%] max-w-[450px] mx-auto border px-10 py-8">
        <h1 className="text-2xl mb-8">Login</h1>
        <form onSubmit={handleLogin} method="post">
          <div className="mb-4 flex items-center justify-between">
            <label htmlFor="phoneNumber">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone Number"
              className="border p-2 text-black"
            />
          </div>
          <div className="mb-8 flex items-center justify-between">
            <label htmlFor="password" className="w-[300px">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className="border p-2 text-black"
            />
          </div>
          {errorMsg && <p className="text-red-500 mb-2">{errorMsg}</p>}
          <p>
            Don't have an account? <Link href="/register">Register</Link>
          </p>
          <p>
            <Link href="/">Explore as guest</Link>
          </p>
          <div className="mt-8 flex items-center justify-end">
            <button
              type="reset"
              className="border px-4 py-2 bg-gray-200 text-black"
            >
              Reset
            </button>
            <button type="submit" className="border ml-2 px-4 py-2">
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
