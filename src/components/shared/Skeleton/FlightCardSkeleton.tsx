
const FlightCardSkeleton = () => {
  return (
    <div
      className="bg-white rounded-2xl shadow-sm p-8"
    >
      {/* Flight Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-20">
          <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
          <div className="space-y-4">
            <div className="w-32 h-5 bg-gray-200 rounded"></div>
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="text-right space-y-4">
          <div className="w-20 h-6 bg-gray-200 rounded"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Flight Route */}
      <div className="flex items-center justify-center mb-2">
        <div className="flex items-center gap-6">
          <div className="w-24 h-3 bg-gray-200 rounded-full"></div>
          <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          <div className="w-24 h-3 bg-gray-200 rounded-full"></div>
        </div>
      </div>

      {/* Arrival Info */}
      <div className="flex justify-between items-center mb-2">
        <div className="space-y-4">
          <div className="w-20 h-6 bg-gray-200 rounded"></div>
          <div className="w-16 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="w-24 h-5 bg-gray-200 rounded"></div>
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Fare Options */}
      <div className="grid grid-cols-4 gap-6 mb-2">
        <div className="h-16 bg-gray-200 rounded-lg"></div>
        <div className="h-16 bg-gray-200 rounded-lg"></div>
        <div className="h-16 bg-gray-200 rounded-lg"></div>
        <div className="h-16 bg-gray-200 rounded-lg"></div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <div className="w-32 h-12 bg-gray-200 rounded-lg"></div>
        <div className="w-24 h-5 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default FlightCardSkeleton;
