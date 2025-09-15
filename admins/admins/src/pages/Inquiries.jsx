import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import { MessageSquare, Trash2, Mail, Phone, MapPin, Clock, Building2 } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const Inquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams({
          page: currentPage.toString(),
          limit: '10',
        });

        const response = await axios.get(`${API_BASE_URL}/inquiries?${params}`);
        setInquiries(response.data.inquiries);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error('Error fetching inquiries:', error);
        addToast('Error loading inquiries', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [currentPage, addToast]);

  const handleDelete = async (id, customerName) => {
    if (!window.confirm(`Are you sure you want to delete the inquiry from ${customerName}?`)) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/inquiries/${id}`);
      addToast('Inquiry deleted successfully', 'success');
      // Re-fetch inquiries
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '10',
      });
      const response = await axios.get(`${API_BASE_URL}/inquiries?${params}`);
      setInquiries(response.data.inquiries);
      setPagination(response.data.pagination);
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      addToast('Error deleting inquiry', 'error');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="text-2xl font-semibold text-gray-900">Inquiries</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage customer inquiries about properties
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inquiries list */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <LoadingSpinner size="lg" />
              </div>
            ) : inquiries.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries found</h3>
                <p className="text-gray-600">
                  Customer inquiries will appear here when they contact you about properties.
                </p>
              </div>
            ) : (
              <>
                <div className="divide-y divide-gray-200">
                  {inquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedInquiry?.id === inquiry.id ? 'bg-blue-50 border-blue-200' : ''
                      }`}
                      onClick={() => setSelectedInquiry(inquiry)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-medium text-gray-900">{inquiry.name}</h3>
                            <span className="text-xs text-gray-500 flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDate(inquiry.created_at)}
                            </span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500 mb-2">
                            <Mail className="h-3 w-3 mr-1" />
                            {inquiry.email}
                            <Phone className="h-3 w-3 ml-3 mr-1" />
                            {inquiry.phone}
                          </div>
                          {inquiry.properties && (
                            <div className="flex items-center text-xs text-gray-600 mb-2">
                              <Building2 className="h-3 w-3 mr-1" />
                              <span className="font-medium">{inquiry.properties.title}</span>
                              <span className="mx-2">•</span>
                              <span>{formatPrice(inquiry.properties.price)}</span>
                            </div>
                          )}
                          <p className="text-sm text-gray-600 line-clamp-2">{inquiry.message}</p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(inquiry.id, inquiry.name);
                          }}
                          className="ml-4 p-1 text-red-400 hover:text-red-600 rounded-md hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                      Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
                      {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
                      {pagination.totalItems} results
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === pagination.totalPages}
                        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Inquiry details */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow-sm rounded-lg border border-gray-200">
            {selectedInquiry ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Inquiry Details</h3>
                  <button
                    onClick={() => handleDelete(selectedInquiry.id, selectedInquiry.name)}
                    className="p-2 text-red-400 hover:text-red-600 rounded-md hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Customer Information</h4>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <span className="font-medium text-gray-900 w-16">Name:</span>
                        <span className="text-gray-600">{selectedInquiry.name}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-gray-400" />
                        <a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 hover:text-blue-800">
                          {selectedInquiry.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-gray-400" />
                        <a href={`tel:${selectedInquiry.phone}`} className="text-blue-600 hover:text-blue-800">
                          {selectedInquiry.phone}
                        </a>
                      </div>
                    </div>
                  </div>

                  {selectedInquiry.properties && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Property of Interest</h4>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-900 mb-1">
                          {selectedInquiry.properties.title}
                        </h5>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {selectedInquiry.properties.location}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(selectedInquiry.properties.price)}
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Message</h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">
                        {selectedInquiry.message}
                      </p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      Received on {formatDate(selectedInquiry.created_at)}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-sm font-medium text-gray-900 mb-2">No inquiry selected</h3>
                <p className="text-sm text-gray-600">
                  Select an inquiry from the list to view details
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inquiries;
