"use client";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { removeBooking } from "@/redux/features/bookSlice";

export default function BookingList() {
  const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
  const dispatch = useDispatch<AppDispatch>();

  if (bookItems.length === 0) {
    return <div className="text-center text-lg text-gray-500 mt-10">No Venue Booking</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-4 mt-5">
      {bookItems.map((item) => (
        <div
          key={item.venue + item.bookDate}
          className="bg-slate-100 rounded-lg p-5 w-[80%] max-w-lg"
        >
          <div className="text-xl font-bold">{item.nameLastname}</div>
          <div>Contact Number: {item.tel}</div>
          <div>Venue: {item.venue}</div>
          <div>Booking Date: {item.bookDate}</div>
          <button
            className="mt-3 rounded-md bg-red-600 hover:bg-red-700 px-3 py-1 text-white"
            onClick={() => dispatch(removeBooking(item))}
          >
            Cancel Booking
          </button>
        </div>
      ))}
    </div>
  );
}
