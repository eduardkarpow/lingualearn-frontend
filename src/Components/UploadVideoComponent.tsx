import React, { useState } from "react";
import styles from './styles/UploadVideo.module.css';

const UploadVideoComponent = () => {
    const [videoUploadDisabled, setVideoUploadDisabled] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [videoFile, setVideoFile] = useState(null);

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];

        // Basic validation to ensure it's a video
        if (file && file.type.startsWith('video/')) {
            setVideoFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            alert("Please select a valid video file.");
        }
    };

    const handleUpload = async () => {
        if (!videoFile) return;

        setVideoUploadDisabled(true);
    
        // Prepare the form data for the API
        const formData = new FormData();
        formData.append('video', videoFile);

        try {
            // Replace with your actual API endpoint
            const response = await fetch('http://localhost:8000/api/v1/video', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert("Upload successful!");
            } else {
                alert("Upload failed.");
            }
        } catch (error) {
            console.error("Error uploading video:", error);
        } finally {
            setVideoUploadDisabled(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.uploadVideoForm}>
                <input type="file" accept="video/*" disabled={videoUploadDisabled} onChange={handleFileChange}/>
                <button onClick={handleUpload}>Send</button>
            </div>
        </div>
    )
}

export default UploadVideoComponent;