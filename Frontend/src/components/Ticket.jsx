import React from "react";

export default function Ticket({
  ticketNum,
  wallet_address,
  userId,
  curOrder,
  boughtTicCount,
}) {
  let first_w_address = "",
    end_w_address = "";
  if (wallet_address) {
    first_w_address = wallet_address.slice(0, 4) + "...";
    end_w_address = wallet_address.slice(wallet_address.length - 4);
  }

  const select_ticket = (ticketId) => {
    const storeName = `${curOrder}_${userId}`;
    let storedTickets = localStorage.getItem(storeName);
    console.log(storedTickets, 13);
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
    <div id="raffle-red" class="entry raffle">
      <div class="no-scale">
        <span className="flex justify-center pt-1 text-[2rem] font-[800]">  
          30000
        </span>
        <span className="flex justify-center text-[0.9rem] font-[600]">
          0xBE...f06E
        </span>
      </div>
    </div>
  );
}
