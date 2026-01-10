import { useEffect, useRef, useState, MouseEvent } from "react";
import styles from "./styles/Video.module.css";

const SubtitlesComponent = (props: {videoId: string, currentTime: number}) => {
    type sub = {
        start: number;
        lines: string[];
    }
    
    const [subs, setSubs] = useState<Array<sub>>([]);
    const [hovered, setHovered] = useState<number>(-1);
    const itemRefs = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/sub/${props.videoId}`).then(res => res.json()).then(res => setSubs(res));
    }, [props.videoId])
    useEffect(() => {
        // Find index of the current subtitle
        const activeIndex = subs.findIndex(s => s.start === props.currentTime);
        
        if (activeIndex !== -1 && itemRefs.current[activeIndex]) {
            // Scroll the active subtitle into the middle of the container
            itemRefs.current[activeIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    }, [props.currentTime, subs]);

    return (
        <div className={styles.subtitles}>
            {subs.map((sub, index) => {
                const isActive = props.currentTime >= sub.start && 
                               (subs[index + 1] ? props.currentTime < subs[index+1].start : true);

                return (
                    <div 
                        key={index}
                        // Assign the ref to this element
                        ref={el => { if(el) itemRefs.current[index] = el; }}
                        className={`${styles.subtitles__item} ${isActive ? styles.active : ''}`}
                        onMouseEnter={() => setHovered(index)}
                    >
                        {sub.lines.join('\n')}
                        <div className={`${styles.time} ${hovered !== index ? styles.hidden : ''}`}>{sub.start}</div>
                    </div>
                )
            })}
        </div>
    )
}
export default SubtitlesComponent;