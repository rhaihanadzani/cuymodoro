"use client";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Fragment } from "react";
const Page = () => {
  const [timer, setTimer] = useState(0);
  const [studyTime, setStudyTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [metodeStudy, setMetodeStudy] = useState(0);
  const [hasUserInput, setHasUserInput] = useState(false);

  const thirtyPersen = 0.3;
  const twentyPersen = 0.25;
  const fifteenPersen = 0.2;

  useEffect(() => {
    let interval;
    if (hasUserInput && timer === 0 && !isTimerRunning) {
      return;
    } else if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            setIsTimerRunning(false);
            if (hasUserInput)
              toast.error("Istirahat berakhir", {
                icon: "⏰",
                duration: 10000,
                position: "top-center",
                style: {
                  color: "#f2f9ef",
                  backgroundColor: "#1b325b",
                  fontWeight: "bold",
                  boxShadow: "0 2px 10px 0 #1b325b",
                  border: "2px solid #f2f9ef",
                },
                id: "timer",
              });

            playAlarm();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, hasUserInput]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const handleTimer = (e) => {
    e.preventDefault();
    setHasUserInput(true);
    // console.log(metodeStudy);

    if (studyTime > 0 && !isNaN(studyTime) && metodeStudy !== 0) {
      toast.error("Istirahat dimulai", {
        icon: "⏰",
        duration: 3000,
        position: "top-center",
        style: {
          color: "#f2f9ef",
          backgroundColor: "#1b325b",
          fontWeight: "bold",
          boxShadow: "0 2px 10px 0 #1b325b",
          border: "2px solid #f2f9ef",
        },
        id: "timer",
      });
      if (metodeStudy === thirtyPersen) {
        setTimer(Math.floor(studyTime * 60 * thirtyPersen));
        setIsTimerRunning(true);
      } else if (metodeStudy === twentyPersen) {
        setTimer(Math.floor(studyTime * 60 * twentyPersen));
        setIsTimerRunning(true);
      } else if (metodeStudy === fifteenPersen) {
        setTimer(Math.floor(studyTime * 60 * fifteenPersen));
        setIsTimerRunning(true);
      }
    } else {
      toast.error("waktu belum ditentukan", {
        icon: "🥱",
        duration: 3000,
        position: "top-center",
        style: {
          color: "#f2f9ef",
          backgroundColor: "#ef444d",
          fontWeight: "bold",
          boxShadow: "0px 2px 10px 0px #ef444d",
          border: "2px solid #f2f9ef",
          fontSize: "15px",
        },
        id: "timer",
      });
    }
  };

  const playAlarm = () => {
    const audio = new Audio("/Lemon.mp3");
    audio.play();
  };

  return (
    <Fragment>
      <Toaster />
      <div className="min-h-[100vh] bg-main-primary flex flex-col justify-evenly items-center">
        <div>
          <h1 className="text-3xl text-main-secondary font-bold text-center uppercase">
            CUY MODORO 😎
          </h1>
          <h2 className="text-main-secondary font-semibold italic ">
            Rest time for you
          </h2>
        </div>
        <div className="">
          <div className="flex justify-center items-center w-full mb-16">
            <span className="text-3xl w-1/2 text-center py-5 rounded-xl bg-main-secondary text-main-primary shadow-md shadow-main-secondary border-2 border-main-primary">
              {formatTime(timer)}
            </span>
          </div>
          <form onSubmit={handleTimer} className="space-y-2">
            <div className="flex flex-col space-y-2">
              <label htmlFor="timer">waktu belajar (menit)</label>
              <input
                className="w-[90%] rounded-md px-3 py-2 border-[3px] border-main-secondary focus:border-main-primary focus:border-[3px] bg-transparent"
                type="number"
                value={studyTime}
                onChange={(e) => setStudyTime(parseInt(e.target.value))}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="metodestudy">Metode istirahat</label>
              <select
                className="w-[90%] rounded-md px-3 py-2 border-[3px] border-main-secondary  bg-main-primary focus:border-2 focus:border-main-secondary"
                onChange={(e) => setMetodeStudy(parseFloat(e.target.value))}
              >
                <option value="0">Mode istirahat</option>
                <option value={thirtyPersen}>30%</option>
                <option value={twentyPersen}>25%</option>
                <option value={fifteenPersen}>20%</option>
              </select>
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-main-secondary hover:bg-main-secondary/90 text-white rounded-lg "
            >
              Mulai
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
