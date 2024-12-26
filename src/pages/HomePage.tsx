import React, { useState } from "react";
import { Filters } from "../components/SearchFilter";
import { useDoctorSlots } from "../hooks/useDoctorSlots";
import { doctorDetails } from "../data/doctorDetails";
import { Header } from "../components/Header";
import { Alert, Button, Container, Spinner } from "react-bootstrap";
import SlotList, { Slot } from "../components/SlotList";

export const HomePage: React.FC = () => {
  const [doctorNameFilter, setDoctorNameFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const { slots, loadSlots, loading, error } = useDoctorSlots(doctorDetails);

  const toggleSortOrder = () => setSortAsc(!sortAsc);

  const filteredSlots = slots
    .filter(
      (slot) =>
        slot.start.includes(startDate) &&
        doctorDetails
          .find((doc) => doc.id === slot.doctor_id)
          ?.displayName.toLowerCase()
          .includes(doctorNameFilter.toLowerCase())
    )
    .sort((a, b) =>
      sortAsc
        ? new Date(a.start).getTime() - new Date(b.start).getTime()
        : new Date(b.start).getTime() - new Date(a.start).getTime()
    );

  const displaySlots = filteredSlots.map((fs) => {
    const [date, time] = fs.start.split("T");
    return {
      date,
      time,
      doctorName:
        doctorDetails.find((x) => x.id === fs.doctor_id)?.displayName ||
        "Unknown Doctor",
    };
  });

  return (
    <>
      <Header />
      <Container className="mt-4">
        <h1 className="mb-4">Doctor Slot Finder</h1>
        <Filters
          doctorNameFilter={doctorNameFilter}
          setDoctorNameFilter={setDoctorNameFilter}
          startDate={startDate}
          setStartDate={setStartDate}
          sortAsc={sortAsc}
          toggleSortOrder={toggleSortOrder}
        />
        <div className="my-3">
          <Button onClick={loadSlots} variant="primary">
            Fetch Data
          </Button>
        </div>
        {loading && (
          <div className="text-center my-3">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        {error && <Alert variant="danger">Error: {error}</Alert>}
        <SlotList slots={displaySlots} />
      </Container>
    </>
  );
};
