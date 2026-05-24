import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Unauthorized from "./pages/Unauthorized";
import ManufacturerDashboard from "./pages/Manufacturer/Dashboard";
import RegisterProduct from "./pages/Manufacturer/RegisterProduct";
import TransferOwnership from "./pages/Manufacturer/TransferOwnership";
import ManufacturerTrackProduct from "./pages/Manufacturer/TrackProduct"
import RetailorSellProduct from "./pages/Retailor/SellProduct";
import RetailerDashboard from "./pages/Retailor/Dashboard";
import DistributorDashboard from "./pages/Distributor/Dashboard";
import AcceptProduct from "./pages/Distributor/AcceptProduct";
import DistributorTransferOwnership from "./pages/Distributor/TransferOwnership";
import DistributorTrackProduct from "./pages/Distributor/TrackProduct";
import RetailerTrackProduct from "./pages/Retailor/TrackProduct";

export default function AppRouter() {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/unauthorized", element: <Unauthorized /> },
    { path: "/manufacturer/register", element: <RegisterProduct /> },
    { path: "/manufacturer/transfer", element: <TransferOwnership />},
    { path: "/manufacturer/track", element: <ManufacturerTrackProduct />},
    { path: "/retailer/sell", element: <RetailorSellProduct /> },
    { path: "/retailer", element: <RetailerDashboard /> },
    { path: "/distributor", element: <DistributorDashboard /> },
    { path: "/manufacturer", element: <ManufacturerDashboard /> },
    { path: "/distributor/accept", element: <AcceptProduct /> },
    { path: "/distributor/track", element: <DistributorTrackProduct /> },
    { path: "/retailer/track", element: <RetailerTrackProduct /> },
    { path: "/distributor/transfer", element: <DistributorTransferOwnership /> }
  ]);
}
