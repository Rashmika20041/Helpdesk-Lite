import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { mockTickets } from "../data/mockTickets";
import type { Ticket, Comment } from "../data/mockTickets";

function TicketDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        if (id) {
            const foundTicket = mockTickets.find(t => t.id === parseInt(id));
            if (foundTicket) {
                setTicket(foundTicket);
            } else {
                navigate('/tickets');
            }
        }
    }, [id, navigate]);

    const handleAddComment = () => {
        if (ticket && newComment.trim()) {
            const comment: Comment = {
                id: Date.now(), // Simple ID generation
                text: newComment,
                author: "Current User", // In real app, get from auth
                createdDate: new Date().toISOString()
            };

            const updatedTicket = {
                ...ticket,
                comments: [...(ticket.comments || []), comment]
            };
            setTicket(updatedTicket);
            setNewComment("");
        }
    };

    if (!ticket) {
        return (
            <>
                <Navbar />
                <div className="flex justify-center items-center h-64">
                    <div className="text-gray-500">Loading ticket details...</div>
                </div>
            </>
        );
    }

    const sortedComments = [...(ticket.comments || [])].sort((a, b) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );

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

                {/* Comments Section */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 px-6 py-4">
                        <h2 className="text-xl font-bold text-white">Comments</h2>
                    </div>

                    {/* Add Comment Form */}
                    <div className="p-6 border-b border-gray-200">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900">Add a Comment</h3>
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Write your comment here..."
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                            />
                            <button
                                onClick={handleAddComment}
                                disabled={!newComment.trim()}
                                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Add Comment
                            </button>
                        </div>
                    </div>

                    {/* Comments List */}
                    <div className="p-6">
                        {sortedComments.length === 0 ? (
                            <div className="text-center py-8">
                                <div className="text-gray-400 mb-2">
                                    <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </div>
                                <p className="text-gray-500">No comments yet. Be the first to add one!</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {sortedComments.map((comment) => (
                                    <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="font-medium text-gray-900">{comment.author}</div>
                                            <div className="text-sm text-gray-500">
                                                {new Date(comment.createdDate).toLocaleString('en-US', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                        <p className="text-gray-700 whitespace-pre-wrap">{comment.text}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default TicketDetailsPage;