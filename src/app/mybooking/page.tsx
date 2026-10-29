import BookingList from "@/components/BookingList";

export default function MyBookingPage() {
  return (
    <main className="w-[100%] flex flex-col items-center pt-10">
      <div className="text-2xl font-medium">My Booking</div>
      <BookingList />
    </main>
  );
}
