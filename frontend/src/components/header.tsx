"use client";

import { useAppContext } from "@/context/AppContext";
import { IUser, logout } from "@/api-services/api";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";

export function Header() {
  const { user } = useAppContext();

  const handleLogout = async () => {
    const res = await logout(
      JSON.parse((await getCookie("payload")) as string).accessToken || ""
    );
    if (res.code !== 500) {
      deleteCookie("payload");
      window.location.href = "/login";
    }
  };
  return (
    <section className="w-full h-[85px] flex items-center justify-end py-4">
      {user && (
        <>
          <h3 className="text-2xl mr-4">Hello, {user?.firstName}</h3>
          <Link href="">
            <button
              type="reset"
              className="border px-4 py-2 bg-gray-200 text-black"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          </Link>
        </>
      )}

      {!user && (
        <>
          <Link href="/login">
            <button
              type="reset"
              className="border px-4 py-2 bg-gray-200 text-black"
            >
              Login
            </button>
          </Link>
        </>
      )}
    </section>
  );
}
