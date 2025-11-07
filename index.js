import { useState, useEffect } from "react";

export default function YusCalendar() {
  const [currentPeriod, setCurrentPeriod] = useState("");

  useEffect(() => {
    const yusCalendar = {
      1: "Нэрмэл архи хөлдөнө",
      2: "Хорз архи хөлдөнө",
      3: "Гунан үхрийн эвэр хуга хөлдөнө",
      4: "Дөнөн үхрийн эвэр хуга хөлдөнө",
      5: "Тавьсан будаа хөлдөхгүй",
      6: "Зурайсан зам гарна",
      7: "Довын толгой борлоно",
      8: "Нал, шал болно",
      9: "Ерийн дулаан болно",
    };

    const one9StartDate = new Date(2024, 11, 22); // December 22, 2024 (0-based month)
    const today = new Date();

    const timeDiff = today - one9StartDate;
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (daysPassed < 0) {
      setCurrentPeriod("9 эхлээгүй байна.");
    } else {
      const current9 = Math.floor(daysPassed / 9) + 1;
      if (current9 > 9) {
        setCurrentPeriod("9 есийн үе дууссан.");
      } else {
        setCurrentPeriod(`${current9} ес болж байна. ${yusCalendar[current9]}`);
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Есийн тоолол</h1>
        <p className="text-lg text-gray-700">{currentPeriod}</p>
      </div>
    </div>
  );
}
