import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { mockTickets } from "../data/mockTickets";
import type { Ticket } from "../data/mockTickets";
import { useAuth } from "../contexts/AuthContext";

function TicketDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

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
                // Convert API response to match Ticket interface
                const formattedTicket: Ticket = {
                    id: data.ticket.id,
                    title: data.ticket.title,
                    description: data.ticket.description,
                    priority: data.ticket.priority,
                    status: data.ticket.status,
                    createdDate: data.ticket.createdDate,
                    userId: data.ticket.userId,
                    comments: data.ticket.comments || []
                };
                setTicket(formattedTicket);
            } else {
                setError(data.message || 'Failed to load ticket');
                if (response.status === 404) {
                    navigate('/tickets');
                }
            }
        } catch (err) {
            setError('Failed to load ticket details');
            console.error('Error fetching ticket:', err);
        } finally {
            setLoading(false);
        }
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
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mx-6 mt-6">
                    {error}
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
                    onClick={() => navigate('/tickets')}
                    className="mb-6 flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Tickets
                </button>

                {/* Ticket Header */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                        <h1 className="text-2xl font-bold text-white">Ticket #{ticket.id}</h1>
                    </div>
                    <div className="p-6">
                        <div className="max-w-2xl">
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
                                    <span className="text-sm font-medium text-gray-500">Status:</span>
                                    <span className={`ml-2 inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                        ticket.status === 'OPEN' ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                                        ticket.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                                        'bg-green-100 text-green-800 border border-green-200'
                                    }`}>
                                        {ticket.status.replace('_', ' ')}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TicketDetailsPage;