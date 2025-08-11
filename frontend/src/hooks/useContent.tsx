import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { Content } from "../types"; // Import the type

export function useContent() {
  const [contents, setContents] = useState<Content[]>([]); // 🛠️ Typed array

  function refresh() {
    axios
      .get(`${BACKEND_URL}/api/v1/content`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      })
      .then((response) => {
        setContents(response.data.content); // TS now knows the type of each item
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  }

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, []);

  return { contents, refresh };
}
