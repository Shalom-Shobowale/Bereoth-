import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "../context/ToastContext";
import {
  Building2,
  MessageSquare,
  Users,
  TrendingUp,
  Clock,
  MapPin,
} from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentProperties, setRecentProperties] = useState([]);
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/dashboard/stats`);
        const { stats, recentProperties, recentInquiries } = response.data;

        setStats(stats);
        setRecentProperties(recentProperties);
        setRecentInquiries(recentInquiries);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        addToast("Error loading dashboard data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [addToast]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const StatCard = ({ title, value, Icon, color }) => (
    <div className="bg-white overflow-hidden shadow-sm rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 ${color}`} />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="text-lg font-medium text-gray-900">
                {value !== null ? value.toLocaleString() : "N/A"}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Overview of your real estate management system
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Properties"
          value={stats?.totalProperties || 0}
          Icon={Building2}
          color="text-blue-600"
        />
        <StatCard
          title="Total Inquiries"
          value={stats?.totalInquiries || 0}
          Icon={MessageSquare}
          color="text-green-600"
        />
        {stats?.totalUsers !== null && (
          <StatCard
            title="Total Users"
            value={stats.totalUsers}
            Icon={Users}
            color="text-purple-600"
          />
        )}
        <StatCard
          title="Available Properties"
          value={stats?.propertiesByStatus?.Available || 0}
          Icon={TrendingUp}
          color="text-orange-600"
        />
      </div>

      {/* Properties by status */}
      {stats?.propertiesByStatus &&
        Object.keys(stats.propertiesByStatus).length > 0 && (
          <div className="bg-white shadow-sm rounded-lg">
            <div className="px-5 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Properties by Status
              </h3>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {Object.entries(stats.propertiesByStatus).map(
                  ([status, count]) => (
                    <div key={status} className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        {count}
                      </div>
                      <div className="text-sm text-gray-500 capitalize">
                        {status}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent properties */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Properties
            </h3>
          </div>
          <div className="p-5">
            {recentProperties.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No properties found
              </p>
            ) : (
              <div className="space-y-4">
                {recentProperties.map((property) => (
                  <div
                    key={property.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {property.title}
                      </p>
                      <div className="flex items-center mt-1 text-xs text-gray-500">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.location}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {formatPrice(property.price)}
                      </p>
                      <p
                        className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                          property.status === "Available"
                            ? "bg-green-100 text-green-800"
                            : property.status === "Sold"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {property.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Recent inquiries */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-5 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Inquiries
            </h3>
          </div>
          <div className="p-5">
            {recentInquiries.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                No inquiries found
              </p>
            ) : (
              <div className="space-y-4">
                {recentInquiries.map((inquiry) => (
                  <div
                    key={inquiry.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {inquiry.name}
                      </p>
                      <p className="text-xs text-gray-500">{inquiry.email}</p>
                      {inquiry.properties && (
                        <p className="text-xs text-gray-500 mt-1">
                          Property: {inquiry.properties.title}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {formatDate(inquiry.created_at)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
