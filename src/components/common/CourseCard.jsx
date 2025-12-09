import React from "react";

const formatDuration = (minutes) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
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
  const rating = ratings?.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : "N/A";

  return (
    <div className="border border-dashed border-indigo-400 rounded-lg p-4 w-full max-w-[350px] flex flex-col items-start shadow-sm bg-white">
      <img
        src={courseThumbnail}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-3"
      />

      <div className="w-full flex justify-between text-sm font-medium mb-1">
        <span className="text-red-500">⭐ {rating}</span>
        <span className="text-indigo-500 font-semibold">
          {discountedPrice ? (
            <>
              <span className="line-through text-gray-400 mr-1">${price.toFixed(2)}</span>
              <span>${discountedPrice.toFixed(2)}</span>
            </>
          ) : (
            <>${price.toFixed(2)}</>
          )}
        </span>
      </div>

      <h3 className="text-base font-semibold mb-2 p-1">{title}</h3>

      <div className="text-sm text-gray-600 flex justify-between w-full mb-4 px-1">
        <span>📄 {modules?.length || 0} Module(s)</span>
        <span>⏱ {formatDuration(durationToComplete)}</span>
        <span>👥 {purchasedByHowMuch}+</span>
      </div>

      {/* Module titles */}
      {modules?.length > 0 && (
        <div className="w-full text-sm text-gray-700 bg-gray-50 p-2 rounded mb-4">
          <p className="font-semibold mb-1">Modules:</p>
          <ul className="list-disc list-inside space-y-1">
            {modules.map((mod, idx) => (
              <li key={mod._id}>{mod.title}</li>
            ))}
          </ul>
        </div>
      )}

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
