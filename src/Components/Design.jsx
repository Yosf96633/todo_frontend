import React from "react";

const Design = ({ h1 ,p }) => {
  return (
      <div className="flex flex-col justify-center items-center h-screen space-y-6 p-5 max-sm:hidden">
      <h1 className=" text-3xl font-bold">{h1}</h1>
        <div className="grid grid-cols-3 gap-4 w-80 h-80">
          {/* 9 Blocks */}
          {Array.from({ length: 9 }, (_, index) => (
            <div
              key={index}
              className={`block w-24 h-24 bg-gray-800 rounded-lg opacity-100 animate-blink ${
                [0, 2, 4, 6, 8].includes(index)
                  ? "animate-slow"
                  : "animate-fast"
              }`}
            ></div>
          ))}
        </div>
      <p className="text-base text-center mb-6">
       {p}
      </p>
    </div>
  );
};

export default Design;
