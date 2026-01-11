import { useRoutes } from "react-router-dom";
import Home from "./pages/Home";
import Unauthorized from "./pages/Unauthorized";
import RegisterProduct from "./pages/Manufacturer/RegisterProduct";
import TransferOwnership from "./pages/Manufacturer/TransferOwnership";
import TrackProduct from "./pages/Manufacturer/TrackProduct"
import SellProduct from "./pages/Retailor/SellProduct";
import RetailerDashboard from "./pages/Retailor/Dashboard";
import DistributorDashboard from "./pages/Distributor/Dashboard";
import ManufacturerDashboard from "./pages/Manufacturer/Dashboard";

export default function AppRouter() {
  return useRoutes([
    { path: "/", element: <Home /> },
    { path: "/unauthorized", element: <Unauthorized /> },
    { path: "/manufacturer/register", element: <RegisterProduct /> },
    { path: "/manufacturer/transfer", element: <TransferOwnership />},
    { path: "/manufacturer/track", element: <TrackProduct />},
    { path: "/retailor/sell", element: <SellProduct /> },
    { path: "/retailer", element: <RetailerDashboard /> },
    { path: "/distributor", element: <DistributorDashboard /> },
    { path: "/manufacturer", element: <ManufacturerDashboard /> }
  ]);
}
