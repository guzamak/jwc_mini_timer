"use client";
import { useState, useEffect, useRef } from "react";
import { Orbitron } from "next/font/google";
import { Oxanium } from "next/font/google";
import Image from "next/image";
import Clock from "./clock";

const orbitron = Orbitron({
  weight: "400",
  subsets: ["latin"],
});
const oxanium = Oxanium({
  weight: "400",
  subsets: ["latin"],
});

export default function Timer() {
  const [starting, setStarting] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [hourInput, setHourInput] = useState("00");
  const [minuteInput, setMinuteInput] = useState("00");
  const [secondInput, setSecondInput] = useState("00");
  const [displayInput, setDisplayInput] = useState(true);
  const [secCount, setSecCount] = useState(0);
  const [inputError, setInputError] = useState(false);
  const hourRef = useRef();
  const minuteRef = useRef();
  const secondRef = useRef();
  // min 0 max 180
  const [clockdeg, setClockDeg] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState()

  useEffect(() => {
    let timer;

    if (starting) {
      const timeStart = () => {
        setSecCount((prevSecCount) => prevSecCount + 1);
        let newHours = hour;
        let newMinutes = minute;
        let newSecond = second;

        if (newSecond > 0) {
          newSecond -= 1;
        } else {
          if (newMinutes > 0) {
            newMinutes -= 1;
            newSecond = 59;
          } else {
            if (newHours > 0) {
              newHours -= 1;
              newMinutes = 59;
              newSecond = 59;
            }
          }
        }

        setHour(newHours);
        setMinute(newMinutes);
        setSecond(newSecond);

        if (newHours === 0 && newMinutes === 0 && newSecond === 0) {
          setStarting(false);
          clearTimeout(timer);
        }else{
          timer = setTimeout(timeStart,1000)
        }
      }
      timer = setTimeout(timeStart,1000)

    }

    return () => clearTimeout(timer);
  }, [starting, hour, minute, second]);

  useEffect(() => {
    // เทียบบัญญคืไตร
    // บางทีเป็น string 
    // const totalSeconds = parseInt(hourInput) * 3600 + parseInt(minuteInput) * 60 + parseInt(secondInput);
    const clockDegree = (secCount / totalSeconds) * 180;

    setClockDeg(Math.min(clockDegree, 180)); // Limit the maximum degree to 180
  }, [secCount, hourInput, minuteInput, secondInput]);

  // useEffect(() => {
  //   if (!starting) {
  //     if (secondRef.current) {
  //       secondRef.current.value = second;
  //       setSecondInput(second);
  //     }
  //     if (minuteRef.current) {
  //       minuteRef.current.value = minute;
  //       setMinuteInput(minute);
  //     }
  //     if (hourRef.current) {
  //       hourRef.current.value = hour;
  //       setHourInput(hour);
  //     }
  //   }
  // }, [starting, second, minute, hour]);

  useEffect(() => {
    setSecCount(0);
    setClockDeg(0);
    // if (hourInput) {
    //   setHour(hourInput);
    // }
    // if (minuteInput) {
    //   setMinute(minuteInput);
    // }
    // if (secondInput) {
    //   setSecond(secondInput);
    // }
    if (starting){
      const now = new Date();
      const targetTime = new Date();
    
      targetTime.setHours(parseInt(hourInput));
      targetTime.setMinutes(parseInt(minuteInput));
      targetTime.setSeconds(parseInt(secondInput));
      targetTime.setMilliseconds(0);
    
      const diffMs = targetTime.getTime() - now.getTime(); 
      const totalDiffSec = Math.floor(diffMs / 1000);
      setTotalSeconds(totalDiffSec)
    
      if (totalDiffSec > 0) {
        const diffHour = Math.floor(totalDiffSec / 3600);
        const diffMin = Math.floor((totalDiffSec % 3600) / 60);
        const diffSecond = totalDiffSec % 60;
        setHour(diffHour)
        setMinute(diffMin)
        setSecond(diffSecond)
        console.log('เหลือเวลา:', diffHour, diffMin, diffSecond);
      }
    }
  }, [starting,hourInput, minuteInput, secondInput]);



  useEffect(() => {
    const animInput = setInterval(() => {
      if (starting) {
        setDisplayInput(false);
      } else {
        setDisplayInput(true);
      }
    }, [200]);
    return () => clearInterval(animInput);
  }, [starting]);


  const onStartChange = () => {
    setStarting((prev) => !prev);
  };


  const padTime = (value) => {
    const num = parseInt(value, 10);
    if (isNaN(num)) return "00";
    return num.toString().padStart(2, "0");
  };
  
  const onHourChange = (e) => {
    let number = e.target.value;
    if (number.length > 2) {
      number = number.slice(1); 
    }
  
    number = parseInt(number, 10);
    if (isNaN(number) || number < 0 || number > 24) {
      hourRef.current.value = hour; 
    } else {
      const formatted = padTime(number > 24 ? 24 : number);
      setHourInput(formatted);
    }
  };
  
  const onMinuteChange = (e) => {
    let number = e.target.value;
    if (number.length > 2) {
      number = number.slice(1); 
    }
  
    number = parseInt(number, 10);
    if (isNaN(number) || number < 0 || number >= 60) {
      minuteRef.current.value = minute;
    } else {
      const formatted = padTime(number);
      setMinuteInput(formatted);
    }
  };
  
  const onSecondChange = (e) => {
    let number = e.target.value;
    if (number.length > 2) {
      number = number.slice(1);
    }
  
    number = parseInt(number, 10);
    if (isNaN(number) || number < 0 || number >= 60) {
      secondRef.current.value = second;
    } else {
      const formatted = padTime(number);
      setSecondInput(formatted);
    }
  };

  return (
    <div
      className={`container flex flex-col items-center justify-center gap-6 ${oxanium.className} z-10`}
    >
      <div>
        <Image src={"Hack Timer.svg"} width={200} height={200} alt="" />
      </div>
      <div>
        <Clock deg={clockdeg} />
      </div>
      <h1
        className={`text-5xl tracking-wider opacity-70 ${orbitron.className}`}
      >
        {String(hour).padStart(2, "0")} : {String(minute).padStart(2, "0")} :{" "}
        {String(second).padStart(2, "0")}
      </h1>
      {/* <div className={`${!starting ? "h-fit": "h-0"} duration-200 overflow-hidden ${displayInput ? "pointer-events-auto opacity-100": "h-0 pointer-events-none opacity-0"}`}> */}
      <div
        className={`grid grid-cols-3 gap-4 mb-8 ${
          !starting
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        } ${displayInput ? "h-24" : "h-0"}  duration-300 overflow-hidden `}
      >
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="font-medium text-[#b372fd6e]">Hour</p>
          <input
            onChange={onHourChange}
            // defaultValue={padTime(0)}
            value={hourInput}
            ref={hourRef}
            type="number"
            max={24}
            min={0}
            className="border rounded-2xl py-2 px-12 text-center border-[#b372fd6e]  focus-visible:ring-0 outline-0 text-[#b372fd] "
          ></input>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="font-medium text-[#b372fd6e]">Minute</p>
          <input
            onChange={onMinuteChange}
            // defaultValue={padTime(0)}
            value={minuteInput}
            ref={minuteRef}
            type="number"
            max={60}
            min={0}
            className="border rounded-2xl py-2 px-12 text-center border-[#b372fd6e] focus-visible:ring-0 outline-0 text-[#b372fd]"
          ></input>
        </div>
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="font-medium text-[#b372fd6e]">Second</p>
          <input
            onChange={onSecondChange}
            // defaultValue={padTime(0)}
            value={secondInput}
            ref={secondRef}
            type="number"
            max={60}
            min={0}
            className="border rounded-2xl py-2 px-12 text-center border-[#b372fd6e] focus-visible:ring-0 outline-0 text-[#b372fd] "
          ></input>
        </div>
      </div>
      <button
        onClick={onStartChange}
        className="bg-[#B472FD] text-white px-24 py-3 rounded-full hover:scale-110 duration-500 border-[0.88px] border-[#58377e] shadow-[0px_3px_0_#A95DFD] cursor-pointer font-medium focus-visible:ring-0"
      >
        
        {starting ? "PAUSE" : "START"}
      </button>
    </div>
  );
}
