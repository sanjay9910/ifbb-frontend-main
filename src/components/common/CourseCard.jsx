import React from "react";

/* -------- helpers -------- */
const formatDuration = (minutes = 0) => {
  const min = Number(minutes) || 0;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}m`;
};

const formatPrice = (value) => {
  const num = Number(value);
  return isNaN(num) ? "0.00" : num.toFixed(2);
};

function CourseCard({
  title,
  courseThumbnail,
  discountedPrice,
  price,
  durationToComplete,
  _id,
  modules,
  ratings,
  purchasedByHowMuch,
  handleGetId
}) {
  const rating =
    ratings?.length
      ? (
          ratings.reduce((a, b) => a + b, 0) / ratings.length
        ).toFixed(1)
      : "0.0";

  return (
    <div className="border border-indigo-400 rounded-lg p-3 w-full max-w-[300px] flex flex-col items-start shadow-sm bg-white">
      {/* Image */}
      <div className="w-full h-48 mb-3 rounded-md overflow-hidden">
        <img
          src={courseThumbnail}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Rating & Price */}
      <div className="w-full flex justify-between text-sm font-medium mb-1">
        <span className="text-red-500">⭐ {rating}</span>

        <span className="text-indigo-500 font-semibold">
          {discountedPrice ? (
            <>
              <span className="line-through text-gray-400 mr-1">
                ₹{formatPrice(price)}
              </span>
              <span>₹{formatPrice(discountedPrice)}</span>
            </>
          ) : (
            <>₹{formatPrice(price)}</>
          )}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold mb-2 p-1">{title}</h3>

      {/* Meta info */}
      <div className="text-sm text-gray-600 flex justify-between w-full mb-4 px-1">
        <span>📄 {modules?.length || 0} Module(s)</span>
        <span>⏱ {formatDuration(durationToComplete)}</span>
        <span>👥 {purchasedByHowMuch || 0}+</span>
      </div>

      {/* Button */}
      <button
        className="bg-indigo-700 hover:bg-indigo-800 text-white py-2 px-4 rounded-md text-sm mx-auto w-full"
        onClick={() => handleGetId(_id)}
      >
        Enroll →
      </button>
    </div>
  );
}

export default CourseCard;
