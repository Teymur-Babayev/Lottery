import React from "react";

export default function Bracket({ isOpen, onClose }) {
  if (!isOpen) return null; // Don't render if not open
  return (
    <div
      className="z-1000 fixed left-0 top-0 flex h-[100%] w-[100%] items-center justify-center bg-[#000000aa]"
      style={{ display: "" }}
    >
      <div className="relative h-[35rem] w-[80rem] overflow-hidden rounded-2xl bg-[#232626]">
        <div
          className=" z-1000 absolute left-0 top-0 h-[100%] w-[100%] overflow-hidden bg-[#232626]"
          style={{ zIndex: "1006", display: "block" }}
        >
          <div className="absolute left-0 top-0 z-0 flex h-[100%] w-[100%] w-full flex-col bg-[#232626] p-0">
            <div
              className="z-100 absolute left-0 right-0 top-0 h-[3rem] bg-[#323738] text-[1rem] font-[800]"
              style={{ lineHeight: "2rem", flex: "0 0 auto" }}
            >
              <div className="absolute right-[1rem] top-0 ml-auto flex h-full items-center">
                <button className="button-m z-11 ml-2 flex cursor-pointer items-center justify-center rounded-md bg-[#464f50] px-[0.5rem] text-[#b3bec1]">
                  <svg className="icon" viewBox="0 0 32 32">
                    <path d="M6.32321 9.23054L13.0927 16L6.32321 22.7694L9.23051 25.6767L15.9998 18.9074L22.7695 25.6771L25.6768 22.7698L18.9073 16.0004L25.6768 9.23095L22.7695 6.32365L16.0002 13.0929L9.23051 6.32324L6.32321 9.23054Z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <div
              className="relative flex flex-col overflow-y-auto overflow-x-hidden p-0"
              style={{ flex: "1 1 0%" }}
            >
              <div className="flex h-full w-full bg-[#232626]">
                <div className="relative h-full w-full flex-none px-6 py-5">
                  <div className="flex h-8 w-full items-center justify-between">
                    <p className="text-xl font-extrabold">My Bracket</p>
                    <button
                      className="button button-m bg-white_alpha5 flex h-[2rem] w-[2rem] items-center justify-center rounded-lg bg-[#ffffff0d] px-[0.5rem]"
                      type="button"
                      style={{ userSelect: "none" }}
                      onClick={onClose}
                    >
                      <svg className="icon fill-white" viewBox="0 0 32 32">
                        <path d="M6.32321 9.23054L13.0927 16L6.32321 22.7694L9.23051 25.6767L15.9998 18.9074L22.7695 25.6771L25.6768 22.7698L18.9073 16.0004L25.6768 9.23095L22.7695 6.32365L16.0002 13.0929L9.23051 6.32324L6.32321 9.23054Z"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
