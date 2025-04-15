import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import QuickActionButton from './QuickActionButtons';

const Faq = () => {
    const [image, setImage] = useState(null);
    const [breed, setBreed] = useState(null);
    const [info, setInfo] = useState(null);
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
            const response = await fetch('https://pawcare-zgpy.onrender.com/upload', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            setBreed(result.breed);
            setInfo(result.info);
            setSuccessMessage('Image uploaded successfully!');

            // Hide message after 3 seconds
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    return (
        <div className="faq-page-container">
            <Navbar />
            <QuickActionButton />

            {/* Success Message Popup */}
            {successMessage && (
                <div className="faq-success-message">
                    {successMessage}
                </div>
            )}

            <div className="faq-form-wrapper">
                <h1 className="faq-title">AI Based Breed Identification</h1>

                {/* Image Upload Section */}
                <form onSubmit={handleImageUpload} className="faq-upload-form">
                    <label className="faq-label">
                        Upload Image:
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            className="faq-file-input"
                        />
                    </label>
                    <button
                        type="submit"
                        className="faq-upload-btn"
                    >
                        Upload
                    </button>
                </form>

                {/* Display Detected Breed */}
                {breed && (
                    <div className="faq-breed-info">
                        <h2 className="faq-subtitle">Detected Breed:</h2>
                        <p className="faq-breed-name">{breed}</p>
                        <img src={URL.createObjectURL(image)} alt="Uploaded Preview" className="your-custom-classes" />
                        </div>
                )}

                {info && (
                    <div className="faq-detail-box">
                        <h2 className="faq-detail-title">{info.name}</h2>
                        <p><strong>Bred For:</strong> {info.bred_for}</p>
                        <p><strong>Group:</strong> {info.breed_group}</p>
                        <p><strong>Life Span:</strong> {info.life_span}</p>
                        <p><strong>Temperament:</strong> {info.temperament}</p>
                        <p>
                            <strong>Height:</strong> {info.height.imperial} in / {info.height.metric} cm
                        </p>
                        <p>
                            <strong>Weight:</strong> {info.weight.imperial} lbs / {info.weight.metric} kg
                        </p>
                        {info.reference_image_id && (
                            <img
                                src={`https://cdn2.thedogapi.com/images/${info.reference_image_id}.jpg`}
                                alt={info.name}
                                className="faq-breed-image"
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
