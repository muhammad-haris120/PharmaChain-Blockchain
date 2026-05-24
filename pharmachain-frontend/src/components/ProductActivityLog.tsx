import { useEffect, useState } from "react";
import { getProductActivity } from "../blockchain/interact";
import type { ProductActivity } from "../blockchain/interact";

interface Props {
  productId: number;
}

const ProductActivityLog = ({ productId }: Props) => {
  const [logs, setLogs] = useState<ProductActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await getProductActivity(productId);
        setLogs(data);
      } catch (err) {
        console.error("Failed to load activity log", err);
      } finally {
        setLoading(false);
      }
    };

    loadLogs();
  }, [productId]);

  if (loading) {
    return (
      <p className="text-sm text-gray-500 mt-4">Loading activity log…</p>
    );
  }

  if (logs.length === 0) {
    return (
      <p className="text-sm text-gray-500 mt-4">
        No activity recorded.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <h3 className="text-sm font-bold text-gray-700 mb-3">
        Blockchain Activity Log
      </h3>

      <div className="space-y-3">
        {logs.map((log, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm"
          >
            {log.type === "REGISTERED" && (
              <p>🟢 Product registered</p>
            )}

            {log.type === "TRANSFER" && (
              <>
                <p>🔁 Ownership transferred</p>
                <p className="text-xs text-gray-600 break-all">
                  From: {log.from}
                </p>
                <p className="text-xs text-gray-600 break-all">
                  To: {log.to}
                </p>
              </>
            )}

            {log.type === "STATUS" && (
              <p>📦 Status updated → <b>{log.status}</b></p>
            )}

            <p className="text-[10px] text-gray-500 mt-1">
              {log.time.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductActivityLog;
