import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import QuickActionButton from './QuickActionButtons';

const Faq = () => {
    const [image, setImage] = useState(null);
    const [data, setData] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/data');
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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
            alert('Image uploaded successfully!');
            console.log(result);
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
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
                    
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

            {/* Fetch Data Section */}
            <div className="mb-4">
                <button
                    onClick={fetchData}
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                >
                    Fetch Data
                </button>
            </div>

            {data && (
                <div className="bg-gray-100 p-4 rounded-md mt-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Data from Backend:</h2>
                    <pre className="text-sm text-gray-700 overflow-auto whitespace-pre-wrap">
                        {JSON.stringify(data, null, 2)}
                    </pre>
                </div>
            )}
        </div></div>
    );
};
<Footer />
export default Faq;
