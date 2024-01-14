"use client"
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import TimezoneSelect from "react-timezone-select";
import { useNavigate } from "react-router-dom";
import { time } from "@/utils/resource";
import { toast } from "react-toastify";
import { handleCreateSchedule } from "@/utils/resource";
import Navbar from "@/Navbar";

const Dashboard = () => {
  const [schedule, setSchedule] = useState([
    { day: "Sun", startTime: "", endTime: "" },
    { day: "Mon", startTime: "", endTime: "" },
    { day: "Tue", startTime: "", endTime: "" },
    { day: "Wed", startTime: "", endTime: "" },
    { day: "Thu", startTime: "", endTime: "" },
    { day: "Fri", startTime: "", endTime: "" },
    { day: "Sat", startTime: "", endTime: "" },
  ]);
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const navigate = useNavigate();

  //👇🏻 Runs when a user sign out
  const handleLogout = () => {
    localStorage.removeItem("_id");
    localStorage.removeItem("_myEmail");
    navigate("/");
  };
  //👇🏻 This updates the schedule array with the start and end time.
  const handleTimeChange = ({e, id}:any) => {
    const { name, value } = e.target;
    if (value === "Select") return;
    const list = [...schedule];
    // list[id][name] = value;
    // setSchedule(list);
  };
  //👇🏻 Logs the user's schedule to the console after setting the availability
  const handleSaveSchedules = () => {
    if (JSON.stringify(selectedTimezone) !== "{}") {
      console.log(schedule);
      handleCreateSchedule({selectedTimezone, schedule, navigate});
    } else {
      toast.error("Select your timezone");
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("_id")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />
      <main className="p-[20px] flex flex-col items-center">
        <h2 className="font-bold text-2xl my-7 mb-[25px]">
          Select your availability
        </h2>
        {/* <div className=""> */}
        <div className="w-[50%] p-2 border-2 rounded-xl border-gray-400 flex flex-col items-center justify-center">
          <p className="font-bold px-2">Pick your timezone</p>
          <TimezoneSelect
            className="w-[80%] m-2 border-2 border-gray-700 rounded-md"
            value={selectedTimezone}
            onChange={setSelectedTimezone}
          />

          {schedule.map((sch, id) => (
            <div
              className="w-full flex flex-row items-center justify-center mt-[30px]"
              key={id}
            >
              <p className="text-lg font-semibold mr-5">{sch.day}</p>
              <div className="flex items-center border-2 border-gray-400 rounded-md">
                <div className="flex items-end m-[15px]">
                  <label htmlFor="startTime">Start Time</label>
                  <select
                    name="startTime"
                    id="startTime"
                    className="p-[5px] ml-3 mr-10 min-w-[150px] border-2 border-black rounded-sm"
                    onChange={(e) => handleTimeChange(e, id)}
                  >
                    {time.map((t) => (
                      <option key={t.id} value={t.t} id={t.id}>
                        {t.t}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end m-[15px]">
                  <label htmlFor="endTime">End Time</label>
                  <select
                    name="endTime"
                    id="endTime"
                    onChange={(e) => handleTimeChange(e, id)}
                    className="p-[5px] ml-3 min-w-[150px] border-2 border-black rounded-sm"
                  >
                    {time.map((t) => (
                      <option key={t.id} value={t.t} id={t.id}>
                        {t.t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full p-[30px] flex items-center justify-center">
          <button
            onClick={handleSaveSchedules}
            className="bg-[#f9d4ac] rounded-md px-8 py-2 text-slate-800 font-bold border-2 border-gray-500 transition duration-500 ease-in-out hover:bg-[#5c4223] hover:text-white"
          >
            SAVE SCHEDULES
          </button>
        </div>
        {/* </div> */}
      </main>
    </>
  );
};

export default Dashboard;
