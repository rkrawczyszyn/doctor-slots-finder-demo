import React from "react";
import { Table } from "react-bootstrap";
import { Metadata } from "../types";

export interface Slot {
  doctorName: string;
  date: string;
  time: string;
}

interface SlotListProps {
  slots: Slot[];
  metadata: Metadata | undefined;
}

const SlotList: React.FC<SlotListProps> = ({ slots, metadata }) => {
  return (
    <>
      {metadata?.updatedOn && (
        <h3>
          Last updated at:{" "}
          {new Date(metadata?.updatedOn).toLocaleTimeString("pl")}
        </h3>
      )}
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
    </>
  );
};

export default SlotList;
