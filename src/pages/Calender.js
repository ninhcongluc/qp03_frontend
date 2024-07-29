import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import MenuComponent from "../components/LeftMenu/Menu";
import "./Calendar.css";

function Calendar() {
  const [popupActive, setPopupActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setSelectedEvent(null);
    setPopupActive(true);
  };

  const handleEventClick = ({ event }) => {
    setSelectedEvent(event);
    setPopupActive(true);
  };

  const closePopup = () => {
    setPopupActive(false);
    setSelectedDate(null);
    setSelectedEvent(null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const examName = event.target.examName.value;
    const startTime = event.target.startTime.value;
    const endTime = event.target.endTime.value;

    const newEvent = {
      title: examName,
      start: `${selectedDate}T${startTime}:00`,
      end: `${selectedDate}T${endTime}:00`,
    };

    setEvents([...events, newEvent]);
    closePopup();
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
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true} // allow "more" link when too many events
      />
      {popupActive && (
        <>
          <div className="popup-overlay active" onClick={closePopup} />
          <div className="popup active">
            {selectedEvent ? (
              <>
                <h3>Exam Details</h3>
                <p>Exam Name: {selectedEvent.title}</p>
                <p>
                  Start Time: {new Date(selectedEvent.start).toLocaleString()}
                </p>
                <p>End Time: {new Date(selectedEvent.end).toLocaleString()}</p>
                <button onClick={closePopup}>Close</button>
              </>
            ) : (
              <>
                <h3>Schedule Exam</h3>
                <p>Selected Date: {selectedDate}</p>
                <form onSubmit={handleSubmit}>
                  <label>
                    Exam Name:
                    <input type="text" name="examName" required />
                  </label>
                  <br />
                  <label>
                    Start Time:
                    <input type="time" name="startTime" required />
                  </label>
                  <br />
                  <label>
                    End Time:
                    <input type="time" name="endTime" required />
                  </label>
                  <br />
                  <button type="submit">Schedule</button>
                </form>
                <button onClick={closePopup}>Close</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Calendar;
