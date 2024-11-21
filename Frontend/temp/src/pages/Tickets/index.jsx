import React, { useEffect, useState,useMemo ,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { constant } from "../../baseData/globalData";
import { jwtDecode } from 'jwt-decode';
import { _sendController } from "../../sendcontroller";
import Lottery from "../../Assets/images/lottery.png";
import SignIn from "../Sign/SignIn";
import SignUp from "../Sign/SignUp";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import LiveChat from "../../components/LiveChat";
import Ticket from "../../components/Ticket";
import Bracket from "../../components/Bracket";

var current_lottery_game_date = '', loginUserId = 0, totalTicCount = '?', selected_ticketType = 0, visited = false, baseTicketArray = [], allowBuyTic = 0;

const filterTickets = (pattern, tickets) => {
  if (!Array.isArray(tickets)) {
    console.error('Tickets is not an array');
    return [];
  }
  return baseTicketArray.filter(ticket => {
    const ticketNum = ticket.ticket;
    if (!ticketNum) return false;  
    let isMatch = true;
    for (let i = 0; i < pattern.length; i++) {
      const patternChar = pattern[i];
      const ticketChar = ticketNum[i];
      if (patternChar === '*') {
        continue;
      }
      if (patternChar !== ticketChar) {
        isMatch = false;
        break;
      }
    }
    return isMatch;
  });
};

const TicketSearch = () => {

  const navigate = useNavigate();
  const [sidebarWidth, setSidebarWidth] = useState("15rem");
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isbBracketModalOpen, setIsBracketModalOpen] = useState(false);
  const [allowTic, setAllowTic] = useState(0);
  const [myTic, setMyTic] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(100);
  const [totalTickets, setTotalTickets] = useState(0);
  const [totalFlag, setTotalFlag] = useState(0);
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const [firstSearchKey, setFirstSearchKey] = useState('*');
  const [secondSearchKey, setSecondSearchKey] = useState('*');
  const [thirdSearchKey, setThirdSearchKey] = useState('*');
  const [forthSearchKey, setForthSearchKey] = useState('*');
  const [fifthSearchKey, setFifthSearchKey] = useState('*');

  const filteredTickets = useMemo(() => {
    const searchPattern = `${firstSearchKey}${secondSearchKey}${thirdSearchKey}${forthSearchKey}${fifthSearchKey}`;
    return filterTickets(searchPattern, tickets);
  }, [firstSearchKey, secondSearchKey, thirdSearchKey, forthSearchKey, fifthSearchKey, tickets]);

  
  const formatSearchKey = () => {
    setFirstSearchKey('*');  setSecondSearchKey('*'); setThirdSearchKey('*'); setForthSearchKey('*'); setFifthSearchKey('*');
  }

  useEffect(() => {
    if(visited === true) {
      setCurrentPage(1);
      setTotalTickets(filteredTickets.length);
      setTickets(filteredTickets);
      visited = false;
    }
  }, [filteredTickets])

  // useEffect(() => {
  //   if (sessionStorage.getItem('authUserToken')) {
  //     const user = jwtDecode(sessionStorage.getItem('authUserToken'));
  //     _sendController([constant.GET_TICKETS, user.user_id], (response) => {
  //       if (response !== constant.FORBIDDEN_USER) {
  //         current_lottery_game_date = response[2];
  //         loginUserId = user.user_id;
  //         totalTicCount = response[1].length;
  //         setCurrentPage(1);
  //         setAllowTic(response[0][0].allowTic);
  //         setMyTic(response[0][0].myTic);
  //         allowBuyTic = response[0][0].myTic;
  //         baseTicketArray = response[1];
  //         setTickets(response[1]);  
  //         setTotalTickets(response[1].length);
  //       } else {
  //         alert(constant.FORBIDDEN_USER_LOGIN_MSG);
  //       }
  //       return;
  //     });
  //     return;
  //   } else {
  //     // navigate("/");
  //   }
  // }, [totalFlag]);

  useEffect(() => {
      const user = jwtDecode(sessionStorage.getItem('authUserToken'));
      console.log("hi ticket page")
      _sendController([constant.GET_TICKETS, user.user_id], (response) => {
        console.log(response, 1114)
        if (response !== constant.FORBIDDEN_USER) {
          current_lottery_game_date = response[2];
          loginUserId = user.user_id;
          totalTicCount = response[1].length;
          setCurrentPage(1);
          setAllowTic(response[0][0].allowTic);
          setMyTic(response[0][0].myTic);
          allowBuyTic = response[0][0].myTic;
          baseTicketArray = response[1];
          setTickets(response[1]);  
          setTotalTickets(response[1].length);
        } else {
          alert(constant.FORBIDDEN_USER_LOGIN_MSG);
        }
        return;
      });
      return;
  }, [totalFlag]);

  const handleSidebarCollapse = () => {
    if (sidebarWidth == "15rem") setSidebarWidth("72px");
    else setSidebarWidth("15rem");
  };

  const show_selected_option_value = (e) => {
    if (e === constant.FIRST_KEY) {
      selected_ticketType = 0;
      formatSearchKey();
      setTotalFlag(totalFlag + 1);
    }
    else if (e === constant.SECOND_KEY) {
      selected_ticketType = 1;
      formatSearchKey();
      _sendController([constant.GET_NEW_TICKETS, current_lottery_game_date], (response) => {
        if (response !== constant.FORBIDDEN_USER) {
          setTickets(response[1]); setTotalTickets(response[1].length); setCurrentPage(1);
          baseTicketArray = response[1];
        } else { alert(constant.FORBIDDEN_USER_LOGIN_MSG); } return;
      }); return;
    }
    else {
      if (myTic > 0) {
        formatSearchKey();
        selected_ticketType = 2;
        _sendController([constant.GET_MY_TICKETS, current_lottery_game_date, loginUserId], (response) => {
          if (response !== constant.FORBIDDEN_USER) {
            allowBuyTic = response[1].length;
            setAllowTic(response[0][0].allowTic); setMyTic(response[1].length); setTickets(response[1]); setTotalTickets(response[1].length);setCurrentPage(1);
            baseTicketArray = response[1];
          } else { alert(constant.FORBIDDEN_USER_LOGIN_MSG); } return;
        }); return;
      }
    }
  }

  const setSearchValue = (keyLocation, keyType) => {
    const updateKey = (key, setKey) => {
      visited = true;
      if (keyType === 1) {
        if (key === '*') {
          setKey('0');
        } else if (Number(key) === 9) {
          setKey('*');
        } else {
          setKey(String(Number(key) + 1));
        }
      } else {
        if (key === '*') {
          setKey('9');
        } else if (Number(key) === 0) {
          setKey('*');
        } else {
          setKey(String(Number(key) - 1));
        }
      }
    };

    switch (keyLocation) {
      case 1:
        updateKey(firstSearchKey, setFirstSearchKey);
        break;
      case 2:
        updateKey(secondSearchKey, setSecondSearchKey);
        break;
      case 3:
        updateKey(thirdSearchKey, setThirdSearchKey);
        break;
      case 4:
        updateKey(forthSearchKey, setForthSearchKey);
        break;
      case 5:
        updateKey(fifthSearchKey, setFifthSearchKey);
        break;
      default:
        console.error(`Invalid keyLocation: ${keyLocation}`);
    }
 
  };

  const toggleSignInModal = () => {
    setIsSignInModalOpen((prev) => !prev);
  };

  const toggleSignUpModal = () => {
    setIsSignUpModalOpen((prev) => !prev);
  };

  const handleCreateAccount = () => {
    setIsSignUpModalOpen(true);
    setIsSignInModalOpen(false);
  };

  const handleSignIn = () => {
    setIsSignUpModalOpen(false);
    setIsSignInModalOpen(true);
  };

  const handleBuyTicket = () => {
    setIsBracketModalOpen(true);
  }

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalTickets / ticketsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(Math.ceil(totalTickets / ticketsPerPage));
  };

  const handlePageInputChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setCurrentPage("");
    } else {
      const pageNumber = Number(value);
      if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= Math.ceil(totalTickets / ticketsPerPage)) {
        setCurrentPage(pageNumber);
      } else {
        setCurrentPage(currentPage);
      }
    }
  };

  const totalPages = Math.ceil(totalTickets / ticketsPerPage);

  return (
    <div style={{ marginLeft: `${sidebarWidth == "15rem" ? "240px" : "0px"}` }}>
      <div className="mx-auto w-full max-w-[1348px] px-4 pb-18 pt-18 sm:px-6 sm:pb-6 sm:pt-[84px]">
        <div className="relative -mx-4 -mt-18 pt-18 sm:mx-0 sm:mt-0 sm:pt-0">
          <div className="my-5 flex justify-between">
            <div className="flex items-center text-[1.3rem] font-[800]">
              <svg
                width="40"
                height="40"
                className="flex-none"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="botton_menu/lottery_default">
                  <g id="Group 1556234962">
                    <path
                      id="Vector"
                      d="M27.8034 11.033C27.8408 11.1116 27.8818 11.2082 27.9262 11.321L28.0704 11.7129L28.2359 12.2076C28.453 12.8495 28.2955 13.5953 27.88 14.2462C26.3976 16.5692 24.246 19.2551 21.9299 21.7911C19.0727 24.9185 16.2369 27.3164 13.4892 28.9622C12.6617 29.4579 11.5726 29.4489 10.738 28.9857L10.5351 28.8602L9.58033 28.1921L8.79018 27.627C8.46452 27.3922 8.38355 26.9291 8.61044 26.5914C8.81154 26.2917 9.18704 26.1924 9.49669 26.3386L9.6088 26.4045L10.6134 27.1214L11.3261 27.6179C11.7401 27.8933 12.3529 27.924 12.7712 27.673C17.2531 24.988 22.3534 19.8654 26.7713 13.4346C26.8353 13.3416 26.8798 13.1249 26.8834 12.9542L26.8781 12.8378L26.8514 12.7186L26.62 12.0839C26.5221 11.6722 26.564 11.386 26.8665 11.061C27.2366 10.6629 27.6166 10.6349 27.8043 11.0312L27.8034 11.033ZM8.74569 21.3722L8.98416 21.5266L9.19682 21.6819C9.51537 21.9265 9.58122 22.3933 9.34453 22.7228C9.10784 23.0523 8.65849 23.121 8.34083 22.8763C7.19388 21.9933 6.03803 22.1197 4.67663 23.2979C4.50134 23.4496 4.27 23.5038 4.05022 23.4496L3.9203 23.4044L3.8073 23.3385L1.9752 22.0204C1.64953 21.7857 1.56856 21.3225 1.79546 20.9849C1.96897 20.7258 2.27773 20.6129 2.56158 20.6887L2.68704 20.7357L2.79382 20.7989L4.15432 21.8362L4.21839 21.7866C5.76486 20.6481 7.31134 20.5028 8.74569 21.3722Z"
                      className="fill-[#24ee89]"
                    ></path>
                    <path
                      id="Vector_2"
                      d="M17.6073 2.8454L19.128 3.86921C19.063 3.94414 19.0025 4.0254 18.9465 4.11116C18.0593 5.46089 18.1554 7.27376 19.8033 8.48896C21.4513 9.70416 23.4756 9.46401 24.4739 8.23797C24.61 8.07095 24.7142 7.88497 24.7889 7.68545L26.3932 8.76703C26.8728 9.09295 27.0009 9.75111 26.6788 10.2377C26.6717 10.2486 26.6637 10.2594 26.6566 10.2702C24.0949 13.8256 21.5562 16.8915 19.039 19.4664C16.5965 21.9663 14.2323 23.9291 11.9482 25.3564C11.4837 25.648 10.8893 25.6155 10.4578 25.2752L8.96557 24.088C9.09459 24.0022 9.20759 23.9083 9.30102 23.8072C10.1383 22.9062 10.3118 20.8911 8.61232 19.5486C6.9128 18.2061 5.02909 18.4706 3.82341 19.3617C3.68282 19.4655 3.56715 19.5874 3.4755 19.7246L1.99398 18.5482C1.65319 18.2774 1.59446 17.7772 1.86229 17.4314C1.91212 17.3664 1.97262 17.3105 2.04025 17.2644C4.96502 15.2692 7.57303 13.1096 9.86427 10.7848C12.1555 8.46007 14.2572 5.90598 16.1703 3.12167C16.4951 2.64769 17.1339 2.5249 17.6073 2.8454ZM10.5966 17.2328C10.1428 17.3737 9.89185 17.8765 10.036 18.355C10.1801 18.8335 10.6651 19.108 11.1198 18.9671C11.5736 18.8263 11.8245 18.3234 11.6804 17.8449C11.5362 17.3664 11.0513 17.092 10.5966 17.2328ZM15.9114 11.099L15.825 11.1451L14.2216 12.261L12.3593 11.5486C12.2658 11.5125 12.1626 11.5116 12.0683 11.5459C11.8797 11.6145 11.7684 11.8041 11.7898 11.9982L11.812 12.0948L12.4598 13.9402L11.2942 15.4552C11.239 15.5265 11.2079 15.6131 11.2052 15.7043C11.1981 15.9075 11.3315 16.0826 11.5166 16.1341L11.6136 16.1485L13.6397 16.2226L14.8249 17.9036C14.8783 17.9804 14.9557 18.0363 15.0438 18.0643C15.2351 18.1248 15.4371 18.0399 15.5341 17.872L15.5732 17.7817L16.1311 15.9553L17.9766 15.4768C18.0718 15.4524 18.1554 15.3947 18.2133 15.3143C18.3316 15.15 18.3183 14.9297 18.1928 14.7816L18.1207 14.7148L16.4915 13.5078L16.4897 11.5017C16.4897 11.415 16.4639 11.3311 16.4159 11.2597C16.3029 11.0918 16.0929 11.0313 15.914 11.1017L15.9114 11.099ZM18.0718 9.6536C17.618 9.79444 17.3671 10.2973 17.5112 10.7758C17.6554 11.2543 18.1403 11.5288 18.595 11.3879C19.0488 11.2471 19.2997 10.7442 19.1556 10.2657C19.0114 9.78722 18.5265 9.51276 18.0718 9.6536Z"
                      className="fill-[#b3bec1]"
                    ></path>
                  </g>
                </g>
              </svg>
              <span className="mx-2">Lottery Jackpot</span>
            </div>
            <div className="flex">
              <button className="mx-2 flex items-center rounded-lg bg-[#3a4142] px-2 font-[700] text-white">
                <svg
                  fill="currentColor"
                  className="h-4 h-4 w-4 w-4 fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M9.08404 6.9274H13.4745C13.7167 6.9274 13.9136 7.12382 13.9136 7.36654V7.43529C13.9136 7.67754 13.7172 7.87442 13.4745 7.87442H9.08404C8.84179 7.87442 8.64491 7.678 8.64491 7.43529V7.36654C8.64491 7.12429 8.84133 6.9274 9.08404 6.9274ZM9.08404 2.66699H13.4745C13.7167 2.66699 13.9136 2.86341 13.9136 3.10613V3.17487C13.9136 3.41712 13.7172 3.61401 13.4745 3.61401H9.08404C8.84179 3.61401 8.64491 3.41759 8.64491 3.17487V3.10613C8.64491 2.86388 8.84133 2.66699 9.08404 2.66699ZM2.49841 6.9274H6.88883C7.13108 6.9274 7.32797 7.12382 7.32797 7.36654V7.43529C7.32797 7.67754 7.13155 7.87442 6.88883 7.87442H2.49841C2.25616 7.87442 2.05927 7.678 2.05927 7.43529V7.36654C2.05927 7.12429 2.25569 6.9274 2.49841 6.9274ZM9.08404 5.50758H13.4745C13.7167 5.50758 13.9136 5.704 13.9136 5.94671V6.01546C13.9136 6.25771 13.7172 6.4546 13.4745 6.4546H9.08404C8.84179 6.4546 8.64491 6.25818 8.64491 6.01546V5.94671C8.64491 5.70446 8.84133 5.50758 9.08404 5.50758ZM2.49841 5.50758H6.88883C7.13108 5.50758 7.32797 5.704 7.32797 5.94671V6.01546C7.32797 6.25771 7.13155 6.4546 6.88883 6.4546H2.49841C2.25616 6.4546 2.05927 6.25818 2.05927 6.01546V5.94671C2.05927 5.70446 2.25569 5.50758 2.49841 5.50758ZM9.08404 4.08729H13.4745C13.7167 4.08729 13.9136 4.2837 13.9136 4.52642V4.59517C13.9136 4.83742 13.7172 5.0343 13.4745 5.0343H9.08404C8.84179 5.0343 8.64491 4.83788 8.64491 4.59517V4.52642C8.64491 4.28417 8.84133 4.08729 9.08404 4.08729ZM2.49841 4.08729H6.88883C7.13108 4.08729 7.32797 4.2837 7.32797 4.52642V4.59517C7.32797 4.83742 7.13155 5.0343 6.88883 5.0343H2.49841C2.25616 5.0343 2.05927 4.83788 2.05927 4.59517V4.52642C2.05927 4.28417 2.25569 4.08729 2.49841 4.08729ZM1.62061 8.82097H14.3527C14.3527 9.34382 13.929 9.76752 13.4062 9.76752H2.56762C2.04478 9.76752 1.62061 9.34382 1.62061 8.82097ZM8.32923 10.1959L10.2691 12.6189C10.4206 12.8083 10.3902 13.0847 10.2008 13.2362C10.1232 13.2984 10.0264 13.3325 9.9263 13.3325H6.04657C5.80432 13.3325 5.60743 13.1361 5.60743 12.8934C5.60743 12.7938 5.64157 12.697 5.70377 12.6189L7.64364 10.1959C7.79516 10.0065 8.07155 9.9761 8.26095 10.1276C8.28621 10.1477 8.30912 10.1706 8.32923 10.1959Z"></path>
                </svg>
                <span className="mx-1">Provably Fair</span>
              </button>
              <button className="mx-2 flex items-center rounded-lg bg-[#3a4142] px-2 font-[700] text-white">
                <svg
                  fill="currentColor"
                  className="h-4 h-4 w-4 w-4 fill-current"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.00024 2C11.3141 2 14.0005 4.6864 14.0005 8.00024C14.0005 11.3141 11.3141 14.0005 8.00024 14.0005C4.6864 14.0005 2 11.3141 2 8.00024C2 4.6864 4.6864 2 8.00024 2ZM7.91967 10.1286C7.72166 10.1286 7.55965 10.1916 7.42465 10.3176C7.28964 10.4436 7.22664 10.6056 7.22664 10.8036C7.22664 11.0017 7.28964 11.1637 7.42465 11.2897C7.55965 11.4157 7.72166 11.4877 7.91967 11.4877C8.11768 11.4877 8.27968 11.4247 8.41469 11.2987C8.54969 11.1727 8.6217 11.0017 8.6217 10.8036C8.6217 10.6056 8.5497 10.4436 8.42369 10.3176C8.28868 10.1916 8.11768 10.1286 7.91967 10.1286ZM7.89995 4.3701C7.88838 4.3701 7.87681 4.37053 7.86567 4.37095C7.41565 4.38981 7.06635 4.76997 7.08564 5.21999L7.25064 9.12529H8.53255L8.7117 5.21956C8.71213 5.20713 8.71256 5.1947 8.71256 5.18227C8.71256 4.73354 8.34869 4.3701 7.90038 4.3701H7.89995Z"></path>
                </svg>
                <span className="mx-1">How to play?</span>
              </button>
            </div>
          </div>

          <div className="mb-10 mt-2 flex justify-between">
            <div className="flex flex-col">
              <div className="mb-5 mt-10 font-[700] text-white">
                Next Draw Time 11/19/2024, 1:55:00 AM
              </div>
              <div className="font-[700] text-white">
                Next Draw Starts in 00d:00h:20m:34s
              </div>
            </div>
            <div>
              <img
                src={Lottery}
                style={{ width: "200px", height: "auto" }}
                alt=""
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="market-wrap relative min-h-230 rounded-xl bg-[#323738] p-4 sm:flex-1">
              <div className="relative flex  justify-between p-2 pt-6">
                <select
                  name=""
                  id=""
                  className="h-10 items-center rounded-lg border-[#232626] bg-[#292d2e] p-3 font-[700] text-white shadow-8"
                  onChange={(e) => show_selected_option_value(e.target.value)}
                >
                  <option value="total_ticket">Total Ticket : {totalTicCount}</option>
                  <option value="remain_ticket">Remain Ticket : {allowTic}</option>
                  <option value="my_ticket">My Ticket : {myTic}</option>
                </select>
                
                <div className="absolute bottom-[-40px] left-1/2 flex -translate-x-1/2 transform space-x-4">

                    <div
                      className="relative flex h-17 w-17 rotate-45 transform items-center justify-center bg-[#232626] shadow-lg"
                      style={{
                        boxShadow:
                          "0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="absolute flex h-full -rotate-45 transform flex-col items-center justify-between">
                        <button
                          className="triangle-up hover:bg-gray-800 h-3.5 w-6 bg-[#323738]"
                          style={{
                            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                          }}
                          onClick={() => setSearchValue(1, 1)}
                        ></button>
                        <input
                          type="text"
                          className="text-gray-900 w-10 rounded border border-[#232626] bg-[#292d2e] text-center text-lg font-bold focus:outline-none"
                          value={firstSearchKey}
                          onChange={(e) => setFirstSearchKey(e.target.value)}
                        />
                        <button
                          className="triangle-down hover:bg-gray-800 h-3.5 w-6 bg-[#323738]"
                          style={{
                            clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                          }}
                          onClick={() => setSearchValue(1, 2)}
                        ></button>
                      </div>
                    </div>

                    <div
                      className="relative flex h-17 w-17 rotate-45 transform items-center justify-center bg-[#232626] shadow-lg"
                      style={{
                        boxShadow:
                          "0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="absolute flex h-full -rotate-45 transform flex-col items-center justify-between">
                        <button
                          className="triangle-up hover:bg-gray-800 h-3.5 w-6 bg-[#323738]"
                          style={{
                            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                          }}
                          onClick={() => setSearchValue(2, 1)}
                        ></button>
                        <input
                          type="text"
                          className="text-gray-900 w-10 rounded border border-[#232626] bg-[#292d2e] text-center text-lg font-bold focus:outline-none"
                          value={secondSearchKey}
                          onChange={(e) => setSecondSearchKey(e.target.value)}
                        />
                        <button
                          className="triangle-down hover:bg-gray-800 h-3.5 w-6 bg-[#323738]"
                          style={{
                            clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                          }}
                          onClick={() => setSearchValue(2, 2)}
                        ></button>
                      </div>
                    </div>

                    <div
                      className="relative flex h-17 w-17 rotate-45 transform items-center justify-center bg-[#232626] shadow-lg"
                      style={{
                        boxShadow:
                          "0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="absolute flex h-full -rotate-45 transform flex-col items-center justify-between">
                        <button
                          className="triangle-up hover:bg-gray-800 h-3.5 w-6 bg-[#323738]"
                          style={{
                            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                          }}
                          onClick={() => setSearchValue(3, 1)}
                        ></button>
                        <input
                          type="text"
                          className="text-gray-900 w-10 rounded border border-[#232626] bg-[#292d2e] text-center text-lg font-bold focus:outline-none"
                          value={thirdSearchKey}
                          onChange={(e) => setThirdSearchKey(e.target.value)}
                        />
                        <button
                          className="triangle-down hover:bg-gray-800 h-3.5 w-6 bg-[#323738]"
                          style={{
                            clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                          }}
                          onClick={() => setSearchValue(3, 2)}
                        ></button>
                      </div>
                    </div>

                    <div
                      className="relative flex h-17 w-17 rotate-45 transform items-center justify-center bg-[#232626] shadow-lg"
                      style={{
                        boxShadow:
                          "0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="absolute flex h-full -rotate-45 transform flex-col items-center justify-between">
                        <button
                          className="triangle-up hover:bg-gray-800 h-3.5 w-6 bg-[#323738]"
                          style={{
                            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                          }}
                          onClick={() => setSearchValue(4, 1)}
                        ></button>
                        <input
                          type="text"
                          className="text-gray-900 w-10 rounded border border-[#232626] bg-[#292d2e] text-center text-lg font-bold focus:outline-none"
                          value={forthSearchKey}
                          onChange={(e) => setForthSearchKey(e.target.value)}
                        />
                        <button
                          className="triangle-down hover:bg-gray-800 h-3.5 w-6 bg-[#323738]"
                          style={{
                            clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                          }}
                          onClick={() => setSearchValue(4, 2)}
                        ></button>
                      </div>
                    </div>

                    <div
                      className="relative flex h-17 w-17 rotate-45 transform items-center justify-center bg-[#232626] shadow-lg"
                      style={{
                        boxShadow:
                          "0 10px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div className="absolute flex h-full -rotate-45 transform flex-col items-center justify-between">
                        <button
                          className="triangle-up hover:bg-gray-800 h-3.5 w-6 bg-[#323738]"
                          style={{
                            clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                          }}
                          onClick={() => setSearchValue(5, 1)}
                        ></button>
                        <input
                          type="text"
                          className="text-gray-900 w-10 rounded border border-[#232626] bg-[#292d2e] text-center text-lg font-bold focus:outline-none"
                          value={fifthSearchKey}
                          onChange={(e) => setFifthSearchKey(e.target.value)}
                        />
                        <button
                          className="triangle-down hover:bg-gray-800 h-3.5 w-6 bg-[#323738]"
                          style={{
                            clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
                          }}
                          onClick={() => setSearchValue(5, 2)}
                        ></button>
                      </div>
                    </div>

                </div>
                <div>
                  <button className="" onClick={handleBuyTicket}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="h-[80vh] min-h-[80vh] overflow-auto">
                <div className="mt-[8rem] flex flex-wrap gap-7">
                  {
                    currentTickets.map((data, index) => {
                      return (
                        <Ticket key={index} ticketNum={data.ticket} wallet_address={data.wallet_address} userId={loginUserId} curOrder = {current_lottery_game_date} boughtTicCount = {allowBuyTic}/>
                      )
                    })
                  }
                </div>
              </div>

              <div className="flex justify-center">
                <button
                  className="rounded-full bg-[#232626] p-1 mx-1 shadow-xl"
                  onClick={handleFirstPage}
                  disabled={currentPage === 1}
                >
                  <svg className="inline-block h-[2rem] w-[2rem] cursor-pointer fill-white font-[2rem]">
                    <path d="M18.41 16.59 13.82 12l4.59-4.59L17 6l-6 6 6 6zM6 6h2v12H6z"></path>
                  </svg>
                </button>
                <button
                  className="rounded-full bg-[#232626] p-1 mx-1 shadow-xl"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <svg className="inline-block h-[2rem] w-[2rem] cursor-pointer fill-white font-[2rem]">
                    <path d="M15.41 16.59 10.83 12l4.58-4.59L14 6l-6 6 6 6z"></path>
                  </svg>
                </button>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-[50px] h-[40px] mx-2 text-black text-center outline-none"
                    value={currentPage || ""}
                    min={1}
                    max={totalPages}
                    onChange={handlePageInputChange}
                    placeholder="Page"
                  />
                    / 
                  <input
                    type="text"
                    className="w-[50px] h-[40px] mx-2 text-black text-center outline-none"
                    value={totalPages}
                    placeholder="Page"
                  />
                </div>
                <button
                  className="rounded-full bg-[#232626] p-1 mx-1 shadow-xl"
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <svg className="inline-block h-[2rem] w-[2rem] cursor-pointer fill-white font-[2rem]">
                    <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z"></path>
                  </svg>
                </button>

                <button
                  className="rounded-full bg-[#232626] p-1 mx-1 shadow-xl"
                  onClick={handleLastPage}
                  disabled={currentPage === totalPages}
                >
                  <svg className="inline-block h-[2rem] w-[2rem] cursor-pointer fill-white font-[2rem]">
                    <path d="M5.59 7.41 10.18 12l-4.59 4.59L7 18l6-6-6-6zM16 6h2v12h-2z"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="mb-2 rounded-xl bg-[#323738] p-4 sm:w-90">
              <div className="font-[800] text-white text-[1.3rem]">Recent History</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <LiveChat />
      <Header
        handleSidebarCollapse={handleSidebarCollapse}
        toggleSignInModal={toggleSignInModal}
        toggleSignUpModal={toggleSignUpModal}
      />
      <Sidebar sidebarWidth={sidebarWidth} />
      <SignIn
        isOpen={isSignInModalOpen}
        onClose={toggleSignInModal}
        createAccount={handleCreateAccount}
      />
      <SignUp
        isOpen={isSignUpModalOpen}
        onClose={toggleSignUpModal}
        handleSignIn={handleSignIn}
      />
      <Bracket isOpen={isbBracketModalOpen} onClose={() => setIsBracketModalOpen(false)} />
    </div>
  );
};

export default TicketSearch;
