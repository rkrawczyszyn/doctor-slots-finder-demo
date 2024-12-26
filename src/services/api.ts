import axios from "axios";
import { DoctorSlot } from "../types";

export const API_BASE_URL = "https://www.znanylekarz.pl/api/v3";
// export const API_BASE_URL = "http://localhost:3001/api/v3";

export const fetchDoctorSlots = async (
  doctorUrls: string[]
): Promise<DoctorSlot[]> => {
  const allSlots = await Promise.all(
    doctorUrls.map((url) =>
      axios.get(url, {
        headers: {
          accept: "application/json",
          authorization:
            "Bearer OWJhYTZmNmRkZjQ5Y2JjYTUzNDgzZjA5YTNkYjdmNmUzOGVmOGJmYzhlOGQyOGY1OGY2M2FjZTc1ZjU5ZDI5YQ",
          "sec-ch-ua-platform": '"Windows"',
          // Referer: "http://localhost:3000/",
          // "User-Agent":
          //   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
          // "sec-ch-ua":
          //   '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          // "sec-ch-ua-mobile": "?0",
        },
      })
    )
  );
  return allSlots.flatMap((response) => response.data._items);
};
