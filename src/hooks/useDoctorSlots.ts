import { useState } from "react";
import { DoctorDetail, DoctorSlot } from "../types";
import { API_BASE_URL, fetchDoctorSlots } from "../services/api";

const filterDateStart = "2024-12-25";
const filterDateEnd = "2025-01-24";

export const useDoctorSlots = (doctorDetails: DoctorDetail[]) => {
  const [slots, setSlots] = useState<DoctorSlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadSlots = async () => {
    try {
      setLoading(true);
      setError("");
      const doctorUrls = doctorDetails.map(
        (doctor) =>
          `${API_BASE_URL}/doctors/${doctor.id}/addresses/${doctor.addressId}/slots?start=${filterDateStart}T00%3A00%3A00%2B01%3A00&end=${filterDateEnd}T23%3A59%3A59%2B01%3A00`
      );
      const data = await fetchDoctorSlots(doctorUrls);
      setSlots(data);
    } catch (err) {
      setError("Failed to fetch doctor slots.");
    } finally {
      setLoading(false);
    }
  };

  return { slots, loadSlots, loading, error };
};
