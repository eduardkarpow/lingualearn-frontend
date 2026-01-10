import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import styles from "./styles/Video.module.css";
import SubtitlesComponent from "./SubtitlesComponent";

const VideoComponent = () => {
    const {id} = useParams();
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);

    type UrlResponse = {
        url: string;
    }

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = videoRef.current;
            if(!videoElement) return;
            const response = fetch(`http://localhost:8000/api/v1/videos/${id}/stream`).then(res =>  res.json()).then((data: UrlResponse) => {
            //@ts-ignore
                const player = playerRef.current = videojs(videoElement, {
                    autoplay: false,
                    controls: true,
                    responsive: true,
                    fluid: true,
                    sources: [{
                        src: data.url.replace('minio', 'localhost'),
                        type: 'video/mp4'
                    }]
                });
            });
        }
    }, [])
    
    
    return (
        <div className={styles.container}>
            <video 
                ref={videoRef} 
                className={`video-js vjs-default-skin ${styles.player}`}
                onTimeUpdate={e => {
                    //@ts-ignore
                    setCurrentTime(Math.floor(e.target.currentTime))
                }}
                />
            <SubtitlesComponent videoId={id ?? ''} currentTime={currentTime}/>
        </div>
    )
}

export default VideoComponent;