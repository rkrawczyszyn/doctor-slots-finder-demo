import { useState } from "react";
import { Result } from "../types";
import { fetchDoctorSlots } from "../services/api";

export const useDoctorSlots = () => {
  const [data, setData] = useState<Result>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadSlots = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchDoctorSlots();
      setData(data);
    } catch (err) {
      setError("Failed to fetch doctor slots.");
    } finally {
      setLoading(false);
    }
  };

  return { data, loadSlots, loading, error };
};
