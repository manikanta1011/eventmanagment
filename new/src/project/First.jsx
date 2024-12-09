import React, { useState } from "react";
import "./index.css";
 
const First = () => {
 
  const mockEvents = [
    {
      id: 1,
      name: "React Workshop",
      date: "2024-12-15",
      location: "New Delhi",
      description: "Learn React from scratch.",
      category: "Workshop",
      capacity: 10,
      attendees: [],
    },
    {
      id: 2,
      name: "Tech Conference",
      date: "2024-12-20",
      location: "Mumbai",
      description: "Explore tech trends and innovations.",
      category: "Conference",
      capacity: 5,
      attendees: [],
    },
    {
      id: 3,
      name: "Sports Conference",
      date: "2024-12-26",
      location: "Hyderabad",
      description: "All Sports meeting.",
      category: "Conference",
      capacity: 5,
      attendees: [],
    },
    {
      id: 4,
      name: "Css Workshop",
      date: "2024-12-27",
      location: "Chennai",
      description: "Learning About css.",
      category: "",
      capacity: 5,
      attendees: [],
    },
  ];
 
 
  const [events, setEvents] = useState(mockEvents);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [filters, setFilters] = useState({ category: "", location: "", date: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    category: "",
    capacity: "",
  });
 
 
  const handleRegister = (id) => {
    setEvents((prev) =>
      prev.map((event) =>
        event.id === id && event.attendees.length < event.capacity
          ? { ...event, attendees: [...event.attendees, "User"] }
          : event
      )
    );
    const eventToRegister = events.find((e) => e.id === id);
    if (eventToRegister && !registeredEvents.includes(eventToRegister)) {
      setRegisteredEvents([...registeredEvents, eventToRegister]);
    }
  };
 
 
  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.date || !newEvent.location || !newEvent.capacity) {
      alert("Please fill in all required fields!");
      return;
    }
    const newEventData = {
      ...newEvent,
      id: events.length + 1,
      capacity: parseInt(newEvent.capacity, 10),
      attendees: [],
    };
    setEvents([...events, newEventData]);
    setFilters({ category: "", location: "", date: "" }); // Reset filters to include the new event
    setSearchQuery(""); // Reset search query
    setNewEvent({
      name: "",
      date: "",
      location: "",
      description: "",
      category: "",
      capacity: "",
    });
    alert("Event added successfully!");
  };
 
 
  const filteredEvents = events.filter((event) => {
    const matchesCategory = filters.category ? event.category === filters.category : true;
    const matchesLocation = filters.location ? event.location.includes(filters.location) : true;
    const matchesDate = filters.date ? event.date === filters.date : true;
    const matchesSearch = searchQuery ? event.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesCategory && matchesLocation && matchesDate && matchesSearch;
  });
 
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Event Management System</h1>
 
      {/* Add New Event */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Add New Event</h2>
        <input
          type="text"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
        />
        <input
          type="date"
          value={newEvent.date}
          onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category (e.g., Workshop, Conference)"
          value={newEvent.category}
          onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Capacity"
          value={newEvent.capacity}
          onChange={(e) => setNewEvent({ ...newEvent, capacity: e.target.value })}
        />
        <button onClick={handleAddEvent}>Add Event</button>
      </div>
 
      {/* Filter and Search */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ marginRight: "10px" }}
        />
        <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">All Categories</option>
          <option value="Workshop">Workshop</option>
          <option value="Conference">Conference</option>
        </select>
        <input
          type="text"
          placeholder="Filter by location"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          style={{ marginLeft: "10px", marginRight: "10px" }}
        />
        <input type="date" onChange={(e) => setFilters({ ...filters, date: e.target.value })} />
      </div>
 
    
     
        )}
      </div>
    </div>
  );
};
 
export default First;