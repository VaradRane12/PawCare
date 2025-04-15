import React, { useEffect, useState } from "react";

const VolunteerPage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://pawcare-zgpy.onrender.com/volunteers")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch volunteers");
        return res.json();
      })
      .then((data) => {
        setVolunteers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading volunteers...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Volunteer List</h1>
      <ul className="space-y-4">
        {volunteers.map((volunteer) => (
          <li
            key={volunteer.id}
            className="border rounded-lg p-4 shadow-sm bg-white"
          >
            <p><strong>Name:</strong> {volunteer.name}</p>
            <p><strong>Email:</strong> {volunteer.email}</p>
            <p><strong>Location:</strong> {volunteer.location}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VolunteerPage;
