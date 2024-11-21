import { useScroll } from "framer-motion";
import React, { useState } from "react";
import { constant } from "../../baseData/globalData";
import { _sendController } from "../../sendcontroller";
import { useNavigate } from "react-router-dom"; 

export default function SignIn({ isOpen, onClose, createAccount }) {
  const [forgetPassword, setForgetPasssword] = useState(false);
  const [userEmail, setUseEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();


  if (!isOpen) return null; // Don't render if not open

  const handleForgetPassword = () => {
    setForgetPasssword(true);
  };

  const loginUser = () => {
    if (userEmail !== '' && userPassword !== '' ) {
      _sendController([constant.LOTIN_USER, userEmail, userPassword], (response) => {
        console.log(response, 16)
        if (response !== constant.FORBIDDEN_USER) {
          sessionStorage.setItem('authUserToken', response);
          navigate("/Tickets");
        } else {  alert(constant.FORBIDDEN_USER_LOGIN_MSG);  }
      });
    } else {
      alert(constant.NOTICE_FULL_INPUT_VALUE_MSG);
    }
  }

  return (
    <div
      className="z-1000 fixed left-0 top-0 flex h-[100%] w-[100%] items-center justify-center bg-[#000000aa]"
      style={{ display: "" }}
    >
      <div className="relative h-[35rem] w-[30rem] overflow-hidden rounded-2xl bg-[#232626]">
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
            {!forgetPassword ? (
              <div
                className="relative flex flex-col overflow-y-auto overflow-x-hidden p-0"
                style={{ flex: "1 1 0%" }}
              >
                <div className="flex h-full w-full bg-[#232626]">
                  <div className="relative h-full w-full flex-none px-6 py-5">
                    <div className="flex h-8 w-full items-center justify-between">
                      <p className="text-xl font-extrabold">Sign In</p>
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

                    <form>
                      <div
                        className="text0-white mt-10 flex h-[2.5rem] items-center bg-[#1e2121] pl-[0.5rem] pr-[0.1875rem]"
                        style={{
                          borderRadius: "0.5rem",
                          border: "1px solid #3a4142",
                          gap: "0.5rem",
                        }}
                      >
                        <input
                          required=""
                          placeholder="Email / Phone Number"
                          onChange={(e) => setUseEmail(e.target.value)}
                          style={{
                            backgroundColor: "transparent",
                            outline: "none",
                            flex: "1 1 0px",
                            width: "8rem",
                          }}
                        />
                      </div>
                      <div
                        className="mt-3 flex h-[2.5rem] items-center bg-[#1e2121] pl-[0.5rem] pr-2 text-white"
                        style={{
                          borderRadius: "0.5rem",
                          border: "1px solid #3a4142",
                          gap: "0.5rem",
                          appearance: "none",
                        }}
                      >
                        <input
                          required=""
                          type="password"
                          onChange={(e) => setUserPassword(e.target.value)}
                          autoComplete="new-password"
                          placeholder="Password"
                          aria-autocomplete="list"
                          className=""
                          style={{
                            backgroundColor: "transparent",
                            outline: "none",
                            flex: "1 1 0px",
                            width: "8rem",
                            appearance: "none",
                            outline: "none",
                          }}
                        />

                        <div className="mr-[-0.25rem] flex h-8 w-8 cursor-pointer items-center justify-center">
                          <svg
                            className="h-6 w-6 fill-[#849194] text-[#849194]"
                            viewBox="0 0 32 32"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.667 16.003c0-2.522 5.968-8.08 13.333-8.08s13.333 5.453 13.333 8.08S23.365 24.077 16 24.077 2.667 18.525 2.667 16.003Zm13.326 5.942H16a5.94 5.94 0 0 0 5.941-5.94v-.008a5.948 5.948 0 1 0-5.948 5.948Zm.63-9.133a1.765 1.765 0 0 0-.274.94v.012A1.768 1.768 0 0 0 19.376 15l-.007-.023a3.195 3.195 0 1 1-3.021-2.159h.27l.005-.007Z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <a
                        replace="true"
                        href="#"
                        className="inactive mt-4 flex justify-end font-extrabold text-[#b3bec1]"
                        link=""
                        onClick={handleForgetPassword}
                      >
                        <span>Forgot your password?</span>
                      </a>
                      <button
                        submit="true"
                        className="mt-6 flex h-[2.5rem] w-full cursor-pointer items-center justify-center pl-[0.5rem] pr-[0.5rem] font-[800] text-black"
                        type="button"
                        onClick={() => loginUser()}
                        style={{
                          touchAction: "manipulation",
                          userSelect: "none",
                          borderRadius: "0.25rem",
                          backgroundImage:
                            "linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))",
                          boxShadow:
                            "rgba(35, 238, 136, 0.3) 0px 0px 12px, rgb(29, 202, 106) 0px -2px inset",
                        }}
                      >
                        <span>Sign In</span>
                      </button>
                      <div className="mt-6 flex h-6 items-center">
                        <span className="font-[800]">
                          New to Crypto Wonderland
                        </span>
                        <a
                          replace="true"
                          href="#"
                          className="inactive ml-2 font-extrabold text-[#24ee89]"
                          link=""
                          onClick={createAccount}
                        >
                          Create account
                        </a>
                      </div>
                      <div className="absolute bottom-5 left-0 w-full px-6">
                        <div className="flex h-4 w-full items-center">
                          <div
                            className="h-[1px] bg-[#e4eaf019]"
                            style={{ flex: "1 1 0%" }}
                          ></div>
                          <p
                            className="mx-3 text-[#b3bec1]"
                            style={{ flex: "0 0 auto" }}
                          >
                            Log in directly with
                          </p>
                          <div
                            className="h-[1px] bg-[#e4eaf019]"
                            style={{ flex: "1 1 auto" }}
                          ></div>
                        </div>

                        <div className="third-group-wrap mt-6 flex h-11 w-full items-center justify-center">
                          <button
                            id="gg_login"
                            className="mx-2 flex size-11 cursor-pointer items-center justify-center rounded-lg border border-solid border-[#e4eaf019] p-0"
                            type="button"
                          >
                            <svg
                              className="icon h-5 w-5 fill-[#b3bec1] text-[#b3bec1]"
                              viewBox="0 0 32 32"
                            >
                              <path d="M21.14 10.407c-1.306-1.21-3.084-1.883-4.89-1.856-3.334 0-6.14 2.151-7.168 5.083l-4.223-3.173c2.167-4.168 6.557-6.804 11.391-6.804 3.167-0.027 6.223 1.103 8.529 3.2l-3.64 3.55z"></path>
                              <path d="M9.078 18.366c-0.528-1.533-0.528-3.2 0-4.733l-4.223-3.173c-1.806 3.496-1.806 7.611-0 11.080 2.167 4.168 6.557 6.804 11.391 6.804 3.436 0 6.319-1.097 8.429-2.97l0.017 0.013c2.417-2.179 3.806-5.352 3.806-9.090 0-0.834-0.083-1.694-0.222-2.501h-12.030v4.76h6.89c-0.278 1.533-1.194 2.877-2.555 3.738-1.139 0.753-2.612 1.183-4.334 1.183-3.334 0-6.14-2.178-7.168-5.082l-4.217 3.141 4.216-3.168z"></path>
                            </svg>
                          </button>
                          <button
                            id="tg_login"
                            className="border-third mx-2 flex size-11 items-center justify-center rounded-lg border border-solid border-[#e4eaf019] p-0"
                            type="button"
                          >
                            <svg
                              className="icon h-5 w-5 fill-[#b3bec1] text-[#b3bec1]"
                              viewBox="0 0 32 32"
                            >
                              <path d="M3.796 15.259l22.448-10.314c0.85-0.39 1.843 0.010 2.218 0.893 0.134 0.313 0.175 0.66 0.12 0.998l-3.013 18.616c-0.185 1.144-1.227 1.915-2.326 1.723-0.314-0.055-0.611-0.186-0.866-0.383l-7.592-5.849c-0.747-0.575-0.904-1.67-0.351-2.447 0.063-0.089 0.135-0.172 0.214-0.248l7.612-7.264c0.069-0.066 0.073-0.176 0.010-0.248-0.055-0.061-0.143-0.074-0.213-0.030l-11.551 7.44c-0.42 0.269-0.932 0.335-1.402 0.178l-5.244-1.759c-0.354-0.119-0.548-0.514-0.434-0.881 0.059-0.189 0.193-0.345 0.368-0.425l0 0z"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="relative flex flex-col overflow-y-auto overflow-x-hidden p-0"
                style={{ flex: "1 1 0%" }}
              >
                <div className="flex h-full w-full bg-[#232626]">
                  <div className="relative h-full w-full flex-none px-6 py-5">
                    <div className="flex h-8 w-full items-center justify-between">
                      <p className="text-xl font-extrabold">Reset Password</p>
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

                    <form>
                      <div
                        className="text0-white mt-10 flex h-[2.5rem] items-center bg-[#1e2121] pl-[0.5rem] pr-[0.1875rem]"
                        style={{
                          borderRadius: "0.5rem",
                          border: "1px solid #3a4142",
                          gap: "0.5rem",
                        }}
                      >
                        <input
                          required=""
                          placeholder="Email / Phone Number"
                          style={{
                            backgroundColor: "transparent",
                            outline: "none",
                            flex: "1 1 0px",
                            width: "8rem",
                          }}
                        />
                      </div>

                      <button
                        submit="true"
                        className="mt-6 flex h-[2.5rem] w-full cursor-pointer items-center justify-center pl-[0.5rem] pr-[0.5rem] font-[800] text-black"
                        type="submit"
                        style={{
                          touchAction: "manipulation",
                          userSelect: "none",
                          borderRadius: "0.25rem",
                          backgroundImage:
                            "linear-gradient(90deg, rgb(36, 238, 137), rgb(159, 232, 113))",
                          boxShadow:
                            "rgba(35, 238, 136, 0.3) 0px 0px 12px, rgb(29, 202, 106) 0px -2px inset",
                        }}
                      >
                        <span>Reset Password</span>
                      </button>
                      <div className="mt-6 flex h-6 justify-center items-center cursor-pointer" onClick={() => setForgetPasssword(false)}>
                        <svg className="icon size-4.5 text-[#b3bec1] fill-[#b3bec1] mr-1" viewBox="0 0 32 32">
                          <path d="M20.1912 6.1001L9.79119 16.5001L20.1912 26.9001L23.2088 23.8825L15.8264 16.5001L23.2088 9.1177L20.1912 6.1001Z"></path>
                        </svg>
                        <span className="font-[800]">Back to Login</span>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
