import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

interface FiltersProps {
  doctorNameFilter: string;
  setDoctorNameFilter: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  sortAsc: boolean;
  toggleSortOrder: () => void;
}

export const Filters: React.FC<FiltersProps> = ({
  doctorNameFilter,
  setDoctorNameFilter,
  startDate,
  setStartDate,
  sortAsc,
  toggleSortOrder,
}) => {
  return (
    <Form className="mb-4">
      <Row className="align-items-end">
        <Col md={6}>
          <Form.Group controlId="doctorNameFilter">
            <Form.Label>Search by Doctor Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter doctor name"
              value={doctorNameFilter}
              onChange={(e) => setDoctorNameFilter(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId="startDateFilter">
            <Form.Label>Filter by Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={2} className="text-end">
          <Button
            variant="secondary"
            onClick={toggleSortOrder}
            className="w-100"
          >
            {sortAsc ? "Sort: Ascending" : "Sort: Descending"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
