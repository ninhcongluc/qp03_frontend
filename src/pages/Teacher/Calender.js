import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import React, { useEffect, useState } from "react";
import ApiInstance from "../../axios";
import MenuComponent from "../../components/LeftMenu/Menu";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import "./styles/Calender.css";

function Calendar() {
  const [popupActive, setPopupActive] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editStartDateTime, setEditStartDateTime] = useState("");
  const [editEndDateTime, setEditEndDateTime] = useState("");
  const [events, setEvents] = useState([]);

  const fetchData = async () => {
    ApiInstance.get(`/quiz/schedular/exam`)
      .then((response) => {
        console.log("data", response.data.data);
        const mappedData = response.data.data.map((item) => ({
          id: item.id,
          title: item.name,
          start: item.startDate,
          end: item.endDate,
        }));
        setEvents(mappedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEventClick = ({ event }) => {
    setSelectedEvent(event);
    setEditStartDateTime(formatDateTimeLocal(event.start));
    setEditEndDateTime(formatDateTimeLocal(event.end));
    setPopupActive(true);
  };

  const formatDateTimeLocal = (date) => {
    const d = new Date(date);
    const pad = (n) => (n < 10 ? `0${n}` : n);
    const formattedDate = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
      d.getDate()
    )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
    return formattedDate;
  };

  const closePopup = () => {
    setPopupActive(false);
    setSelectedEvent(null);
    setEditStartDateTime("");
    setEditEndDateTime("");
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    const updatedEvent = {
      ...selectedEvent,
      start: new Date(editStartDateTime).toISOString(),
      end: new Date(editEndDateTime).toISOString(),
    };

    ApiInstance.put(`/quiz/${selectedEvent.id}/schedular`, {
      startDate: updatedEvent.start,
      endDate: updatedEvent.end,
    })
      .then(() => {
        fetchData();
        closePopup();
        toast.success("Update schedular successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="calendar-container">
      <MenuComponent role="teacher" />
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"90vh"}
        events={events}
eventClick={handleEventClick}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true} // allow "more" link when too many events
      />
      {popupActive && (
        <>
          <div className="popup-overlay active" onClick={closePopup} />
          <div className="popup active">
            {selectedEvent && (
              <>
                <Link
                  to={`/teacher/quiz/${selectedEvent.id}/question-list`}
                  className="setup-now"
                >
                  Set Up Now
                </Link>
                <h3>Edit Exam Details</h3>
                <form onSubmit={handleUpdate}>
                  <p>
                    <strong>Exam Name:</strong> {selectedEvent.title}
                  </p>
                  <label>
                    Start Date and Time:
                    <input
                      type="datetime-local"
                      value={editStartDateTime}
                      onChange={(e) => setEditStartDateTime(e.target.value)}
                    />
                  </label>
                  <label>
                    End Date and Time:
                    <input
                      type="datetime-local"
                      value={editEndDateTime}
                      onChange={(e) => setEditEndDateTime(e.target.value)}
                    />
                  </label>
                  <button type="submit" className="update-button">
                    Update
                  </button>
                </form>
                <button onClick={closePopup} className="close-button">
                  Close
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Calendar;
