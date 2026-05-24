interface Props {
  status: string;
  registeredAt: Date;
  distributedAt?: Date;
  retailingAt?: Date;
  soldAt?: Date;
}

const STEPS = ["Registered", "Distributed", "Retailing", "Sold"];

const ProductTimeline = ({
  status,
  registeredAt,
  distributedAt,
  retailingAt,
  soldAt,
}: Props) => {
  const activeIndex = STEPS.indexOf(status);

  const getDateLabel = (step: string) => {
    switch (step) {
      case "Registered":
        return registeredAt;
      case "Distributed":
        return distributedAt;
      case "Retailing":
        return retailingAt;
      case "Sold":
        return soldAt;
      default:
        return undefined;
    }
  };

  return (
    <div className="mt-6">
      <p className="text-sm font-semibold text-gray-600 mb-3">
        Product Lifecycle
      </p>

      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => {
          const isCompleted = index <= activeIndex;
          const date = getDateLabel(step);

          return (
            <div key={step} className="flex items-center w-full">
              {/* Step Circle */}
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold
                ${
                  isCompleted
                    ? "bg-green-600"
                    : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>

              {/* Step Label */}
              <div className="ml-2">
                <p
                  className={`text-xs font-semibold ${
                    isCompleted
                      ? "text-green-700"
                      : "text-gray-400"
                  }`}
                >
                  {step}
                </p>

                {date && (
                  <p className="text-[10px] text-gray-500">
                    {date.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Connector */}
              {index < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded
                  ${
                    index < activeIndex
                      ? "bg-green-600"
                      : "bg-gray-300"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductTimeline;
