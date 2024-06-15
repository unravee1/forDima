import React, { useState, useEffect } from 'react';

const SchedulePage = () => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const response = await fetch('/api/schedule');
      const data = await response.json();
      setSchedule(data);
    };

    fetchSchedule();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Class Schedule</h2>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2">Group</th>
              <th className="py-2">Class</th>
              <th className="py-2">Time</th>
              <th className="py-2">Day</th>
              <th className="py-2">Trainer</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((classItem) => (
              <tr key={classItem._id}>
                <td className="py-2">{classItem.groupName}</td>
                <td className="py-2">{classItem.className}</td>
                <td className="py-2">{classItem.time}</td>
                <td className="py-2">{classItem.day}</td>
                <td className="py-2">{classItem.trainerName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SchedulePage;
