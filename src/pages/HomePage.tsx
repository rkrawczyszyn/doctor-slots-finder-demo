import React, { useEffect, useState } from "react";
import { Filters } from "../components/SearchFilter";
import { useDoctorSlots } from "../hooks/useDoctorSlots";
import { doctorDetails } from "../data/doctorDetails";
import { Header } from "../components/Header";
import { Alert, Button, Container, Spinner } from "react-bootstrap";
import SlotList from "../components/SlotList";

export const HomePage: React.FC = () => {
  const [doctorNameFilter, setDoctorNameFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [afterSeventeen, setAfterSeventeen] = useState(false);
  const [afterEighteen, setAfterEighteen] = useState(false);

  const { data, loadSlots, loading, error } = useDoctorSlots();

  useEffect(() => {
    const setup = async () => {
      await loadSlots();
    };

    setup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleSortOrder = () => setSortAsc(!sortAsc);
  const toggleFilterSeventeen = () => setAfterSeventeen(!afterSeventeen);
  const toggleFilterEighteen = () => setAfterEighteen(!afterEighteen);

  const filteredSlots = data?.slots
    .filter((slot) => {
      const fulfillsDate = slot.start.includes(startDate);
      const doctorNameMatches = doctorDetails
        .find((doc) => doc.id === slot.doctor_id)
        ?.displayName.toLowerCase()
        .includes(doctorNameFilter.toLowerCase());
      const notBooked = !slot.booked;
      const time = slot.start.split("T")[1]; // split datetime and pick time part
      const after17Condition = afterSeventeen ? time >= "17:00:00" : true;
      const after18Condition = afterEighteen ? time >= "18:00:00" : true;

      return (
        fulfillsDate &&
        doctorNameMatches &&
        notBooked &&
        after17Condition &&
        after18Condition
      );
    })
    .sort((a, b) =>
      sortAsc
        ? new Date(a.start).getTime() - new Date(b.start).getTime()
        : new Date(b.start).getTime() - new Date(a.start).getTime()
    );

  const displaySlots = filteredSlots?.map((fs) => {
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
        <Button onClick={toggleFilterSeventeen}>
          {afterSeventeen ? "Show All Times" : "Filter Slots After 17:00"}
        </Button>
        <Button onClick={toggleFilterEighteen} className="ms-2">
          {afterEighteen ? "Show All Times" : "Filter Slots After 18:00"}
        </Button>
        {loading && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {error && <Alert variant="danger">Error: {error}</Alert>}
        {displaySlots && (
          <SlotList slots={displaySlots} metadata={data?.metadata} />
        )}
      </Container>
    </>
  );
};
