import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import Otp from './pages/Otp';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Receipts from './pages/Receipts';
import DeliveryOrders from './pages/DeliveryOrders';
import InternalTransfers from './pages/InternalTransfers';
import StockAdjustments from './pages/StockAdjustments';
import MoveHistory from './pages/MoveHistory';
import Warehouse from './pages/Warehouse';
import StockLevels from './pages/StockLevels';
import UserProfile from './pages/UserProfile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public / Auth */}
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/receipts" element={<Receipts />} />
            <Route path="/deliveries" element={<DeliveryOrders />} />
            <Route path="/transfers" element={<InternalTransfers />} />
            <Route path="/adjustments" element={<StockAdjustments />} />
            <Route path="/history" element={<MoveHistory />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/stock-levels" element={<StockLevels />} />
            <Route path="/profile" element={<UserProfile />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
