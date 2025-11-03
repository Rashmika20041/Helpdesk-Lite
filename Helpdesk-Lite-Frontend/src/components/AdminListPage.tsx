import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminListPage() {
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const navigate = useNavigate();

    const itemsPerPage = 5;

    // Filter tickets based on search term and status filter
    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = searchTerm === '' ||
            (ticket.title && ticket.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (ticket.description && ticket.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (ticket.user_name && ticket.user_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (ticket.user_email && ticket.user_email.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = statusFilter === 'ALL' || ticket.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const filteredTotalPages = Math.ceil(filteredTickets.length / itemsPerPage);
    const filteredStartIndex = (currentPage - 1) * itemsPerPage;
    const paginatedFilteredTickets = filteredTickets.slice(filteredStartIndex, filteredStartIndex + itemsPerPage);

    useEffect(() => {
        fetchTickets();
    }, []);

    useEffect(() => {
        // Reset to first page when filters change
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    const fetchTickets = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3000/api/tickets/admin/all', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {
                setTickets(data.tickets);
            } else {
                setError(data.message || 'Failed to load tickets');
            }
        } catch (err) {
            setError('Failed to load tickets');
            console.error('Error fetching tickets:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= filteredTotalPages) {
            setCurrentPage(page);
        }
    };

    return(
        <>
        <Navbar/>
        {loading && (
            <div className="flex justify-center items-center h-64">
                <div className="text-gray-500">Loading tickets...</div>
            </div>
        )}
        {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mx-6 mt-6">
                {error}
            </div>
        )}
        {!loading && !error && (
        <div>
             <div className="flex justify-between items-center p-6 pt-10 bg-white">
                <h1 className="text-2xl font-bold text-gray-900">
                    Admin Panel - All Tickets
                </h1>
                <div className="text-sm text-gray-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                    Admin View
                </div>
             </div>
             <div className="p-6 bg-gray-50">
                <div className="flex gap-4 items-end">
                    <div>
                        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                            Search Tickets
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                id="search"
                                placeholder="Search by title, description, or user..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page when searching
                                }}
                                className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            />
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="status-filter" className="block text-sm font-medium text-gray-700 mb-2">
                            Filter by Status
                        </label>
                        <select
                            id="status-filter"
                            value={statusFilter}
                            onChange={(e) => {
                                setStatusFilter(e.target.value);
                                setCurrentPage(1); // Reset to first page when filtering
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent min-w-40"
                        >
                            <option value="ALL">All Status</option>
                            <option value="OPEN">OPEN</option>
                            <option value="IN_PROGRESS">IN_PROGRESS</option>
                            <option value="RESOLVED">RESOLVED</option>
                        </select>
                    </div>
                </div>
             </div>
             <div className="p-6">
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                        <thead className="bg-gradient-to-r from-red-50 to-purple-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Priority
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    User ID
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Date
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {paginatedFilteredTickets.map((ticket: any) => (
                                <tr
                                    key={ticket.id}
                                    onClick={() => navigate(`/admin/ticket/${ticket.id}`)}
                                    className="hover:bg-red-50 transition-colors duration-150 cursor-pointer"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {ticket.title}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                                        {ticket.description}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                            ticket.priority === 'HIGH' ? 'bg-red-100 text-red-800 border border-red-200' :
                                            ticket.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                                            'bg-green-100 text-green-800 border border-green-200'
                                        }`}>
                                            {ticket.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                            ticket.status === 'OPEN' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                                            ticket.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                            'bg-green-100 text-green-800 border border-green-200'
                                        }`}>
                                            {ticket.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {ticket.user_name} ({ticket.user_email})
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(ticket.createdDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Creative Pagination */}
                {filteredTotalPages > 1 && (
                    <div className="flex items-center justify-between mt-6 px-4 py-3 bg-white border-t border-gray-200 rounded-lg shadow-sm">
                        <div className="flex items-center text-sm text-gray-700">
                            <span>Showing {filteredStartIndex + 1} to {Math.min(filteredStartIndex + itemsPerPage, filteredTickets.length)} of {filteredTickets.length} tickets</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Previous
                            </button>

                            <div className="flex space-x-1">
                                {Array.from({ length: filteredTotalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                                            page === currentPage
                                                ? 'bg-red-600 text-white shadow-md transform scale-105'
                                                : 'text-gray-700 bg-gray-100 hover:bg-gray-200'
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === filteredTotalPages}
                                className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Next
                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
             </div>
        </div>
        )}
        </>
    )
}

export default AdminListPage;
