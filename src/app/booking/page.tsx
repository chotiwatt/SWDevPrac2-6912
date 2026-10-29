"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Select, MenuItem, Button, InputLabel, FormControl } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { AppDispatch } from "@/redux/store";
import { addBooking } from "@/redux/features/bookSlice";

export default function Booking() {
  const dispatch = useDispatch<AppDispatch>();

  // state ของแต่ละช่องในฟอร์ม
  const [nameLastname, setNameLastname] = useState("");
  const [tel, setTel] = useState("");
  const [venue, setVenue] = useState("Bloom");
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);

  const makeBooking = () => {
    if (!nameLastname || !tel || !venue || !bookDate) {
      alert("Please fill in all fields");
      return;
    }
    const item: BookingItem = {
      nameLastname,
      tel,
      venue,
      bookDate: bookDate.format("YYYY/MM/DD"),
    };
    dispatch(addBooking(item));
    alert("Booking saved! See it in My Booking");
  };

  return (
    <main className="w-[100%] flex flex-col items-center space-y-4 pt-10">
      <div className="text-2xl font-medium">Venue Booking</div>

      <div className="bg-slate-100 rounded-lg p-6 w-[80%] max-w-lg flex flex-col space-y-4">
        <TextField
          variant="standard"
          name="Name-Lastname"
          label="Name-Lastname"
          value={nameLastname}
          onChange={(e) => setNameLastname(e.target.value)}
        />
        <TextField
          variant="standard"
          name="Contact-Number"
          label="Contact-Number"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
        />
        <FormControl variant="standard">
          <InputLabel id="venue-label">Venue</InputLabel>
          <Select
            id="venue"
            labelId="venue-label"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          >
            <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
            <MenuItem value="Spark">Spark Space</MenuItem>
            <MenuItem value="GrandTable">The Grand Table</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Booking Date"
            value={bookDate}
            onChange={(value) => setBookDate(value)}
          />
        </LocalizationProvider>
        <Button variant="contained" name="Book Venue" onClick={makeBooking}>
          Book Venue
        </Button>
      </div>
    </main>
  );
}
