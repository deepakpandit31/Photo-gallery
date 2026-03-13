import { useState, useEffect } from "react";

export default function useFetchPhotos() {

  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const fetchPhotos = async () => {

      try {

        // small delay so loading state is visible in demo
        await new Promise(resolve => setTimeout(resolve, 1200));

        const response = await fetch(
          "https://picsum.photos/v2/list?limit=30"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }

        const data = await response.json();

        setPhotos(data);

      } catch (err) {

        setError(err.message);

      } finally {

        setLoading(false);

      }

    };

    fetchPhotos();

  }, []);

  return { photos, loading, error };

}