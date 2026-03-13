import { useState, useReducer, useEffect, useMemo, useCallback } from "react";
import useFetchPhotos from "../hooks/useFetchPhotos";
import { favouriteReducer } from "../reducers/favouriteReducer";

export default function Gallery() {

    const { photos, loading, error } = useFetchPhotos();

    const [search, setSearch] = useState("");

    const [favourites, dispatch] = useReducer(
        favouriteReducer,
        JSON.parse(localStorage.getItem("favourites")) || []
    );

    useEffect(() => {
        localStorage.setItem("favourites", JSON.stringify(favourites));
    }, [favourites]);

    const handleSearch = useCallback((e) => {
        setSearch(e.target.value);
    }, []);

    const filteredPhotos = useMemo(() => {
        return photos.filter(photo =>
            photo.author.toLowerCase().includes(search.toLowerCase())
        );
    }, [photos, search]);

    if (loading) {
        return (
            <div className="flex justify-center mt-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
                
                <p className="mt-3 text-gray-600"> loading photos...</p>

            </div>
        );
    }

    if (error) {
        return (
            <p className="text-red-500 text-center mt-10">
                {error}
            </p>
        );
    }

    return (
        <div className="p-6">

            <input
                type="text"
                placeholder="Search by author"
                className="border p-2 w-full mb-6 rounded"
                value={search}
                onChange={handleSearch}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {filteredPhotos.map(photo => (

                    <div key={photo.id} className="border rounded-lg overflow-hidden">

                        <img
                            src={`https://picsum.photos/id/${photo.id}/500/300`}
                            alt={photo.author}
                            className="w-full h-48 object-cover"
                        />

                        <div className="flex justify-between items-center p-2">

                            <p className="text-sm font-medium">
                                {photo.author}
                            </p>

                            <button
                                onClick={() =>
                                    dispatch({
                                        type: "TOGGLE_FAV",
                                        payload: photo.id
                                    })
                                }
                            >
                                {favourites.includes(photo.id) ? "❤️" : "🤍"}
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            {filteredPhotos.length === 0 && (
                <p className="text-center mt-10 text-gray-500">
                    No photos found
                </p>
            )}

        </div>
    );
}