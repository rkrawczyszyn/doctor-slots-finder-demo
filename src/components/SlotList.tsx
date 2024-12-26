import React from "react";
import { Table } from "react-bootstrap";

export interface Slot {
  doctorName: string;
  date: string;
  time: string;
}

interface SlotListProps {
  slots: Slot[];
}

const SlotList: React.FC<SlotListProps> = ({ slots }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Doctor Name</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {slots.map((slot, index) => (
          <tr key={index}>
            <td>{slot.doctorName}</td>
            <td>{slot.date}</td>
            <td>{slot.time}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SlotList;
