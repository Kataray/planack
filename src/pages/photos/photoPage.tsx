"use client";

import { useState, useEffect } from "react";
import Sidebar from "src/components/Navbar/Sidebar";
import AddCard from "src/components/ui/addCard";

interface PhotoCard {
    id: number;
    imageBase64: string;
    caption?: string;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB (adjust as needed)

export default function PhotoBoard() {
    const [photos, setPhotos] = useState<PhotoCard[]>(() => {
        const saved = localStorage.getItem("photoCards");
        return saved ? JSON.parse(saved) : [];
    });

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [captionInput, setCaptionInput] = useState("");
    const [selectedPhoto, setSelectedPhoto] = useState<PhotoCard | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        localStorage.setItem("photoCards", JSON.stringify(photos));
    }, [photos]);

    const openPopup = () => {
        setSelectedFile(null);
        setCaptionInput("");
        setErrorMessage("");
        setIsPopupOpen(true);
    };

    const closePopup = () => {
        setIsPopupOpen(false);
    };

    const fileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    const createPhotoCard = async () => {
        if (!selectedFile) return;

        // Check file size
        if (selectedFile.size > MAX_FILE_SIZE) {
            setErrorMessage("File is too large. Please upload a file under 5MB.");
            return;
        }

        try {
            const base64 = await fileToBase64(selectedFile);
            const newCard: PhotoCard = {
                id: Date.now(),
                imageBase64: base64,
                caption: captionInput.trim(),
            };

            setPhotos([...photos, newCard]);
            closePopup();
        } catch (error) {
            setErrorMessage("An error occurred while uploading the photo.");
        }
    };

    const handlePhotoClick = (photo: PhotoCard) => {
        setSelectedPhoto(photo);
        setCaptionInput(photo.caption || "");
    };

    const handleSaveCaption = () => {
        if (selectedPhoto) {
            const updated = photos.map((p) =>
                p.id === selectedPhoto.id ? { ...p, caption: captionInput } : p
            );
            setPhotos(updated);
            setSelectedPhoto(null);
        }
    };

    return (
        <div className="flex min-h-screen w-screen bg-black text-white">
            <Sidebar />
            <div className="flex-1 mr-10">
                <h1 className="font-cal text-[4vh] ml-10 mt-7">Photo Gallery</h1>
                <h2 className="font-cal text-[2.5vh] ml-10 -mt-2">
                    Upload and manage photos from your device
                </h2>

                <div className="flex flex-wrap gap-6 ml-10 mt-8">
                    {[...photos, { id: -1, imageBase64: "", caption: "" }].map((photo) => (
                        <div
                            key={photo.id}
                            className="w-64 h-64 bg-[#19191c] p-4 rounded-xl shadow-xl text-white flex flex-col justify-between cursor-pointer overflow-hidden"
                            onClick={() => {
                                if (photo.id === -1) return;
                                handlePhotoClick(photo);
                            }}
                        >
                            {photo.id === -1 ? (
                                <AddCard onClick={openPopup} />
                            ) : (
                                <>
                                    <img
                                        src={photo.imageBase64}
                                        alt="Uploaded"
                                        className="w-full h-40 object-cover rounded mb-2"
                                    />
                                    <p className="text-center text-white text-sm break-words">
                                        {photo.caption || "Click to add caption..."}
                                    </p>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* File Upload Popup */}
                {isPopupOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#19191c] p-6 rounded-lg shadow-lg w-full max-w-md text-white">
                            <h2 className="text-xl font-bold mb-4">Add Photo</h2>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                className="w-full mb-4 p-2 border rounded bg-[#2a2a2f] text-white"
                            />

                            <input
                                className="w-full border rounded p-2 mb-4 text-white bg-[#2a2a2f]"
                                placeholder="Caption (optional)"
                                value={captionInput}
                                onChange={(e) => setCaptionInput(e.target.value)}
                            />

                            {errorMessage && (
                                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                            )}

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    className="px-4 py-2 border !bg-[#19191c] !text-white rounded hover:bg-neutral-900"
                                    onClick={closePopup}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 border !bg-[#19191c] !text-white rounded hover:bg-neutral-900"
                                    onClick={createPhotoCard}
                                >
                                    Add Photo
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Caption Popup */}
                {selectedPhoto && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-[#19191c] p-6 rounded-lg shadow-lg w-full max-w-md text-white">
                            <h2 className="text-xl font-bold mb-4">Edit Caption</h2>
                            <textarea
                                className="w-full h-24 p-2 border rounded bg-[#2a2a2f] text-white resize-none"
                                value={captionInput}
                                onChange={(e) => setCaptionInput(e.target.value)}
                            />
                            <div className="flex justify-between mt-6">
                                <button
                                    className="px-4 py-2 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white"
                                    onClick={() => {
                                        setPhotos(photos.filter((p) => p.id !== selectedPhoto.id));
                                        setSelectedPhoto(null);
                                    }}
                                >
                                    Delete
                                </button>
                                <div className="flex gap-2">
                                    <button
                                        className="px-4 py-2 border !bg-[#19191c] !text-white rounded hover:bg-neutral-900"
                                        onClick={() => setSelectedPhoto(null)}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="px-4 py-2 border !bg-[#19191c] !text-white rounded hover:bg-neutral-900"
                                        onClick={handleSaveCaption}
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
