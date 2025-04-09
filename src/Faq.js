import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import QuickActionButton from './QuickActionButtons';

const Faq = () => {
    const [image, setImage] = useState(null);
    const [breed, setBreed] = useState(null);
    const [info,setinfo] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');



    const handleImageUpload = async (e) => {
        e.preventDefault();
        if (!image) {
            alert('Please select an image first.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('http://127.0.0.1:5000/upload', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            setBreed(result.breed);
            setinfo(result.info)
            setSuccessMessage('Image uploaded successfully!');

            // Hide message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div>
            <div className="space-y-4">
                <Navbar />
                <QuickActionButton />
            </div>

            {/* Success Message Popup */}
            {successMessage && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md max-w-2xl mx-auto mt-4">
                    {successMessage}
                </div>
            )}

            <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">FAQ Page</h1>

                {/* Image Upload Section */}
                <form onSubmit={handleImageUpload} className="mb-8 space-y-4">
                    <label className="block text-gray-700 font-semibold">
                        Upload Image:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="mt-2 block w-full text-sm text-gray-600
                                       file:mr-4 file:py-2 file:px-4
                                       file:rounded-full file:border-0
                                       file:text-sm file:font-semibold
                                       file:bg-blue-50 file:text-blue-700
                                       hover:file:bg-blue-100"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                        Upload
                    </button>
                </form>

                {/* Display Detected Breed */}
                {breed && (
                    <div className="bg-yellow-100 p-4 rounded-md mt-4 border border-yellow-400">
                        <h2 className="text-xl font-semibold text-yellow-800">Detected Breed:</h2>
                        <p className="text-gray-800 text-lg">{breed}</p>
                    </div>
                )}
                {info && (
                    <div className="mt-6 p-4 bg-yellow-100 rounded-lg shadow">
                    <h2 className="text-2xl font-bold text-yellow-800 mb-2">{info.name}</h2>
                    <p><strong>Bred For:</strong> {info.bred_for}</p>
                    <p><strong>Group:</strong> {info.breed_group}</p>
                    <p><strong>Life Span:</strong> {info.life_span}</p>
                    <p><strong>Temperament:</strong> {info.temperament}</p>
                    <p><strong>Height:</strong> {info.height.imperial} in / {info.height.metric} cm</p>
                    <p><strong>Weight:</strong> {info.weight.imperial} lbs / {info.weight.metric} kg</p>
                    {info.reference_image_id && (
                        <img
                        src={`https://cdn2.thedogapi.com/images/${info.reference_image_id}.jpg`}
                        alt={info.name}
                        className="mt-4 rounded-md w-64 h-auto"
                        />
                    )}
                    </div>
                )}
  


                
            </div>
            <Footer />
        </div>
    );
};

export default Faq;
 