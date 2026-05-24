import { useEffect, useState } from "react";

interface Props {
  distributedAt?: Date;
}

const DISTRIBUTOR_LIMIT_MS = 4 * 24 * 60 * 60 * 1000; // 4 days

const DistributorCountdown = ({ distributedAt }: Props) => {
  const [remainingMs, setRemainingMs] = useState<number | null>(null);

  useEffect(() => {
    if (!distributedAt) return;

    const expiryTime = distributedAt.getTime() + DISTRIBUTOR_LIMIT_MS;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = expiryTime - now;
      setRemainingMs(diff > 0 ? diff : 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [distributedAt]);

  if (!distributedAt) return null;

  if (remainingMs === null) return null;

  if (remainingMs === 0) {
    return (
      <div className="mt-4 bg-red-100 border border-red-400 text-red-700 p-4 rounded-xl font-semibold">
        ❌ Distributor transfer window expired
      </div>
    );
  }

  const days = Math.floor(remainingMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remainingMs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remainingMs / (1000 * 60)) % 60);
  const seconds = Math.floor((remainingMs / 1000) % 60);

  return (
    <div className="mt-4 bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-xl font-semibold">
      ⏳ Time left to transfer:
      <div className="mt-1 font-mono">
        {days}d {hours}h {minutes}m {seconds}s
      </div>
    </div>
  );
};

export default DistributorCountdown;
