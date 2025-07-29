"use client";

import { useAppContext } from "@/context/AppContext";
import { logout } from "@/api-services/api";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useEffect } from "react";

export enum SPACE_FILTER_OPTIONS {
  FROM_OTHERS = "From Others",
  FROM_ME = "From Me",
}

interface HeaderProps {
  activeFilters: string[];
  toggleFilter: (filter: string) => void;
}

export function Header({ activeFilters, toggleFilter }: HeaderProps) {
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
    <section className="w-full h-[85px] flex items-center justify-between py-4">
      {/* left side: User info and auth */}
      <div className="flex items-center">
        {user && (
          <>
            <Link href="">
              <button
                type="reset"
                className="border px-4 py-2 bg-gray-200 text-black"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </Link>
            <h3 className="text-2xl ml-4">Hello, {user?.firstName}</h3>
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
      </div>

      {/* Right: Filter Menu */}
      <div className="flex items-center space-x-4">
        {Object.values(SPACE_FILTER_OPTIONS).map((filter) => (
          <button
            key={filter}
            onClick={() => toggleFilter(filter)}
            className={`px-4 py-2 border rounded ${
              activeFilters.includes(filter)
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-black"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </section>
  );
}
