import React, { useState, useEffect } from "react";
import axios from "axios";

const FilterSemester = () => {
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/semester`);
        const data = response.data.data;
        setSemesters(data);
      } catch (error) {
        console.error("Error fetching semesters:", error);
      }
    };

    fetchSemesters();
  }, []);

  return (
    <div>
      <label htmlFor="semester">Semester:</label>
      <select id="semester">
        {semesters.map((semester) => (
          <option key={semester.id} value={semester.id}>
            {semester.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSemester;
