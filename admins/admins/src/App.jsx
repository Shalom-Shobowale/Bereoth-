import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { ToastProvider } from "./context/ToastContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Properties from "./pages/Properties";
import PropertyForm from "./pages/PropertyForm";
import Inquiries from "./pages/Inquiries";
import User from "./pages/User";
import Toast from "./components/Toast";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ToastProvider>
          <div className="min-h-screen bg-gray-50">
            <Toast />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="properties" element={<Properties />} />
                <Route path="properties/new" element={<PropertyForm />} />
                <Route path="properties/edit/:id" element={<PropertyForm />} />
                <Route path="inquiries" element={<Inquiries />} />
                <Route path="users" element={<User />} />
              </Route>
            </Routes>
          </div>
        </ToastProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
