import { useAuthStore } from "@/store/useAuthStore";
import * as React from "react";
import {
  LuCircleUser,
  LuLogOut,
  LuMessageSquare,
  LuSettings,
} from "react-icons/lu";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className=" border-b fixed w-full top-0 z-40 backdrop-blur-lg"
      style={{ backgroundColor: "rgb(30, 21, 20)" }}
    >
      <div className="container mx-auto h-16" style={{ paddingInline: "30px" }}>
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center justify-center gap-2.5 hover:opacity-80 transition-all"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: "rgb(66, 45, 25)" }}
              >
                <LuMessageSquare size={25} color="rgb(200, 115, 60)" />
              </div>
              <h1 className="bold">YoChat</h1>
            </Link>
          </div>

          <div className="flex w-fit gap-6">
            <Link className="flex items-center gap-2" to="/settings">
              <LuSettings className="w-4 h-4 text-2xl" />
              <span style={{ fontSize: "13px" }}>Settings</span>
            </Link>

            {authUser && (
              <>
                <Link className="flex items-center gap-2" to="/profile">
                  <LuCircleUser style={{ fontSize: "20px" }} />
                  <span style={{ fontSize: "13px" }}>Profile</span>
                </Link>

                <div onClick={logout} className="flex items-center gap-2 cursor-pointer">
                  <LuLogOut />
                  <span style={{ fontSize: "13px" }}>Log out</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
