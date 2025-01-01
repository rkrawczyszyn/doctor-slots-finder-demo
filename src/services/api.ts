import axios from "axios";
import { Result } from "../types";

export const fetchDoctorSlots = async (): Promise<Result> => {
  const response = await axios.get(
    "https://raw.githubusercontent.com/rkrawczyszyn/demos/refs/heads/main/dist/response.json"
  );

  return response.data;
};
