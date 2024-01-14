/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/Navbar";

const Profile = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [timezone, setTimezone] = useState("");

  //👇🏻 The ID is the URL parameter for fetching the user's details.
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("_id")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    function getUserDetails() {
      if (id) {
        fetch(`http://localhost:5000/schedules/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setUsername(data.username);
            setSchedules(data.schedules);
            setTimezone(data.timezone.label);
            setLoading(false);
          })
          .catch((err) => console.error(err));
      }
    }
    getUserDetails();
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="min-h-[90vh] w-full flex flex-col items-center justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-2xl mb-6">
              Hey, <span className="font-bold">{username}</span>
            </h2>
            <p className="text-base mb-3">
              Here is your schedule: -{" "}
              <span className="font-semibold">{timezone}</span>{" "}
            </p>
            <table className="border-2 border-gray-500 w-full border-collapse">
              <tbody>
                {schedules.map((sch) => (
                  <tr
                    className="border-2 border-gray-300 p-[20px]"
                    key={sch.day}
                  >
                    <td className="font-bold border-2 border-gray-300 p-[20px]">
                      {sch.day.toUpperCase()}
                    </td>
                    <td className="border-2 border-gray-300 p-[20px]">
                      {sch.startTime || "Unavailable"}
                    </td>
                    <td className="border-2 border-gray-300 p-[20px]">
                      {sch.endTime || "Unavailable"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </>
  );
};

export default Profile;
