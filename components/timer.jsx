"use client"
import { useState, useEffect } from 'react'

export default function Timer() {
    // string
    const [starting, setStarting] = useState(false);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(1);
    const [second, setSecond] = useState(5);

    useEffect(() => {
        let timer;

        if (starting) {
            timer = setInterval(() => {
                setSecond(prev => {
                    if (prev > 0) return prev - 1;
                    if (minute > 0 || hour > 0) return 59;
                    return 0;
                });

                setMinute(prev => {
                    if (second === 0) {
                        if (prev > 0) return prev - 1;
                        if (hour > 0) return 59;
                    }
                    return prev;
                });

                setHour(prev => {
                    if (second === 0 && minute === 0 && prev > 0) {
                        return prev - 1;
                    }
                    return prev;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [starting, second, minute, hour]);

    const onStartChange = () => {
        setStarting(prev => !prev);
    };
    return (
        <div>
            <h1>
                {String(hour).padStart(2, "0")}:
                {String(minute).padStart(2, "0")}:
                {String(second).padStart(2, "0")}
            </h1>
            <button onClick={onStartChange}>{starting ? "Pause" : "Start"}</button>
        </div>
    
  )
}
