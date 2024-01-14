import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBookingDetails } from "@/utils/resource";
import ErrorPage from "@/app/components/error/error";
import { sendEmail } from "@/utils/resource";
import Navbar from "@/Navbar";

const BookUser = () => {
  const [schedules, setSchedules] = useState([]);
  const [timezone, setTimezone] = useState("");
  const [error, setError] = useState(false);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [duration, setDuration] = useState("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useParams();

  //👇🏻 logs the user's details to the console
  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(email, fullName, message);
    sendEmail({receiverEmail, email, fullName, message, duration});
    setFullName("");
    setMessage("");
  };

  useEffect(() => {
    fetchBookingDetails(
     { user,
      setError,
      setTimezone,
      setSchedules,
      setReceiverEmail}
    );
  }, [user]);

  if (error) {
    return <ErrorPage error="User doesn't exist" />;
  }

  return (
    <>
      <Navbar />
      <div className="w-full min-h-[100vh] flex items-center justify-center flex-col p-[30px]">
        <h2 className="mb-7 font-[#c58940] text-2xl">
          Book a session with <span className="font-bold">{user}</span>{" "}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center flex-col w-[90%] p-10 mx-0 my-auto border-2 "
        >
          <label htmlFor="fullName" className="font-semibold">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className=" border-2 border-gray-600 rounded-md"
          />
          <label htmlFor="email" className="font-semibold">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-gray-600 rounded-md"
          />

          <label htmlFor="message" className="font-semibold">
            Any important note? (optional)
          </label>
          <textarea
            rows={5}
            name="message"
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className=" border-2 border-gray-600 rounded-md"
          />

          <label htmlFor="session">
            Select your preferred session -{" "}
            <span className="font-semibold">{timezone}</span>
          </label>
          <select
            name="duration"
            onChange={(e) => setDuration(e.target.value)}
            className=" border-2 border-gray-600 rounded-md p-3"
          >
            {schedules.map((schedule) => (
              <option
                value={`${schedule.day} - ${schedule.startTime} : ${schedule.endTime}`}
                key={schedule.day}
              >{`${schedule.day} - ${schedule.startTime} : ${schedule.endTime}`}</option>
            ))}
          </select>

          <button className="mt-[20px] bg-[#c58940] text-white border-2 border-black rounded-md text-lg font-bold transition duration-500 ease-in-out hover:bg-[#5c4223] hover:text-white">
            SEND
          </button>
        </form>
      </div>
    </>
  );
};

export default BookUser;
