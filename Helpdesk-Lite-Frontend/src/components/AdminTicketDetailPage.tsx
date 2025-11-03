import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function AdminTicketDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [assignedTo, setAssignedTo] = useState("");

    useEffect(() => {
        if (id) {
            fetchTicketDetails(id);
        }
    }, [id]);

    const fetchTicketDetails = async (ticketId: string) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/tickets/${ticketId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {
                setTicket(data.ticket);
                setAssignedTo(data.ticket.assignedTo || 'Unassigned');
            } else {
                setError(data.message || 'Failed to load ticket');
                if (response.status === 404) {
                    navigate('/admin/tickets');
                }
            }
        } catch (err) {
            setError('Failed to load ticket details');
            console.error('Error fetching ticket:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (newStatus: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED') => {
        if (!ticket) return;

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:3000/api/tickets/admin/${ticket.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: newStatus, assignedTo })
            });

            const data = await response.json();

            if (data.success) {
                setTicket({ ...ticket, status: newStatus });
            } else {
                setError(data.message || 'Failed to update ticket status');
            }
        } catch (err) {
            setError('Failed to update ticket status');
            console.error('Error updating status:', err);
        }
    };

    const handleAssignmentChange = (newAssignee: string) => {
        setAssignedTo(newAssignee);
        // In real app, this would update the ticket assignment
    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center h-64">
                    <div className="text-gray-500">Loading ticket details...</div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center h-64">
                    <div className="text-red-500">{error}</div>
                </div>
            </>
        );
    }

    if (!ticket) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center h-64">
                    <div className="text-gray-500">Ticket not found</div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 pt-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/admin/tickets')}
                    className="mb-6 flex items-center text-red-600 hover:text-red-800 transition-colors duration-200"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Admin Panel
                </button>

                {/* Ticket Header */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-red-600 to-purple-600 px-6 py-4 rounded-t-xl">
                        <h1 className="text-2xl font-bold text-white">Ticket #{ticket.id} - Admin View</h1>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-2">{ticket.title}</h2>
                                <p className="text-gray-600 mb-4">{ticket.description}</p>

                                <div className="space-y-3">
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Priority:</span>
                                        <span className={`ml-2 inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                            ticket.priority === 'HIGH' ? 'bg-red-100 text-red-800 border border-red-200' :
                                            ticket.priority === 'MEDIUM' ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' :
                                            'bg-green-100 text-green-800 border border-green-200'
                                        }`}>
                                            {ticket.priority}
                                        </span>
                                    </div>

                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Created:</span>
                                        <span className="ml-2 text-sm text-gray-600">
                                            {new Date(ticket.createdDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </span>
                                    </div>

                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Created by:</span>
                                        <span className="ml-2 text-sm text-gray-600">{ticket.user_name} ({ticket.user_email})</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={ticket.status}
                                        onChange={(e) => handleStatusChange(e.target.value as 'OPEN' | 'IN_PROGRESS' | 'RESOLVED')}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    >
                                        <option value="OPEN">Open</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="RESOLVED">Resolved</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Assign To
                                    </label>
                                    <select
                                        value={assignedTo}
                                        onChange={(e) => handleAssignmentChange(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                    >
                                        <option value="">Unassigned</option>
                                        <option value="Admin Support">Admin Support</option>
                                        <option value="Tech Team">Tech Team</option>
                                        <option value="IT Department">IT Department</option>
                                        <option value="Help Desk">Help Desk</option>
                                    </select>
                                </div>

                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-500 mr-3">Current Status:</span>
                                    <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                        ticket.status === 'OPEN' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                                        ticket.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                        'bg-green-100 text-green-800 border border-green-200'
                                    }`}>
                                        {ticket.status.replace('_', ' ')}
                                    </span>
                                </div>

                                <div className="flex items-center">
                                    <span className="text-sm font-medium text-gray-500 mr-3">Assigned to:</span>
                                    <span className="text-sm text-gray-600">{assignedTo || 'Unassigned'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminTicketDetailPage;
