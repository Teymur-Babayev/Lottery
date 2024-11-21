import React from "react";

export default function Ticket({ ticketNum, wallet_address, userId, curOrder, boughtTicCount}) {
  let first_w_address = "", end_w_address = "";
  if (wallet_address) {
    first_w_address = wallet_address.slice(0, 4) + "...";
    end_w_address = wallet_address.slice(wallet_address.length - 4);
  }

  const select_ticket = (ticketId) => {
    const storeName = `${curOrder}_${userId}`;
    let storedTickets = localStorage.getItem(storeName);
    console.log(storedTickets, 13)
    storedTickets = storedTickets ? JSON.parse(storedTickets) : [];

    if (storedTickets.includes(ticketId)) {
      storedTickets = storedTickets.filter((id) => id !== ticketId);
    } else {
      if (storedTickets.length < 10 - Number(boughtTicCount)) {
        storedTickets.push(ticketId);
      } else {
        alert("You can select up to 10 tickets only.");
      }
    }
    localStorage.setItem(storeName, JSON.stringify(storedTickets));
  };

  return (
    <div
      className="relative w-30 rounded-xl border-2 border-dashed border-[#4f595a] bg-[#323738] p-4 shadow-lg cursor-pointer"
      onClick={() => select_ticket(ticketNum)}
    >
      <div className="border-none absolute -top-3 left-1/2 -translate-x-1/2 transform rounded-full border bg-[#232626] px-3 py-1 text-xs font-semibold shadow-md">
        {first_w_address}
        {end_w_address}
      </div>
      <div className="flex h-2 flex-col items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 font-bold tracking-wide"></p>
          <div className="bg-red-500 my-2 h-1 w-32"></div>
        </div>
      </div>
      <div className="border-none absolute -bottom-3 left-1/2 -translate-x-1/2 transform rounded-full border bg-[#232626] px-3 py-1 text-center text-xs font-semibold shadow-md">
        <span className="text-[1.1rem] font-[800]">{ticketNum}</span>
      </div>
    </div>
  );
}
