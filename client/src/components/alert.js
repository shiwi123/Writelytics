import React from "react";

function Alert({title,message}) {
  return (
    <div
      className="bg-red-100 border-l-4 border-orange-500 text-orange-700 p-4"
      role="alert"
    >
      <p className="font-bold">{title}</p>
      <p>{message}</p>
    </div>
  );
}

export default Alert;
