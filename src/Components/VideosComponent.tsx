import React, { useEffect, useState } from "react";
import styles from "./styles/Videos.module.css";
import { Link } from "react-router-dom";

const VideosComponent = () => {
    type vid = {
        title: string,
        id: number,
        thumbnail_url: string,
        duration: number
    }
    const [videos, setVideos] = useState<Array<vid>>([]);

    const formatDuration = (totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = Math.floor(totalSeconds % 60);
        const parts = [
            m.toString().padStart(2, '0'),
            s.toString().padStart(2, '0')
        ];
        if (h > 0) {
            parts.unshift(h.toString().padStart(2, '0'));
        }

        return parts.join(':');
    };

    useEffect(() => {
        const response = fetch('http://localhost:8000/api/v1/videos').then(res => {
            return res.json();
        }).then(data => {
            setVideos(data);
            console.log(data);
        });


    }, [])

    return (
        <div className={styles.container}>
            {videos.map(video => {
                return <Link className={styles.video} key={video.id} to={`/video/${video.id}`}>
                    <div className={styles.image}><img src={video.thumbnail_url.replace('minio', 'localhost')} alt={video.title}/></div>
                    <h4>{formatDuration(video.duration)}</h4>
                    <h5>{video.title}</h5>
                </Link>
            })}
        </div>
    )
}

export default VideosComponent;