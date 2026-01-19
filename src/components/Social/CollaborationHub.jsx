import React, { useState, useEffect, useRef } from 'react';

/**
 * Real-time Collaboration Component
 * WebSocket-based co-authoring and feedback system
 */
const CollaborationHub = ({ manuscriptId, userId, userName }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [collaborators, setCollaborators] = useState([]);
  const [comments, setComments] = useState([]);
  const [cursorPositions, setCursorPositions] = useState({});
  const [selectedText, setSelectedText] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  
  const wsRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    connectToCollaboration();
    
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [manuscriptId]);

  /**
   * Connect to WebSocket collaboration server
   */
  const connectToCollaboration = () => {
    // In production: Use actual WebSocket server
    // const ws = new WebSocket(`wss://your-server.com/collab/${manuscriptId}`);
    
    // Demo mode: Simulate connection
    setTimeout(() => {
      setIsConnected(true);
      console.log('Connected to collaboration server');
      
      // Simulate other collaborators
      setCollaborators([
        { id: 'user-1', name: 'Alice', color: '#FF6B6B', cursor: 120 },
        { id: 'user-2', name: 'Bob', color: '#4ECDC4', cursor: 450 }
      ]);
    }, 1000);

    // In production:
    // ws.onopen = () => setIsConnected(true);
    // ws.onmessage = handleWebSocketMessage;
    // ws.onclose = () => setIsConnected(false);
    // wsRef.current = ws;
  };

  /**
   * Handle WebSocket messages
   */
  const handleWebSocketMessage = (event) => {
    const message = JSON.parse(event.data);
    
    switch (message.type) {
      case 'user_joined':
        addCollaborator(message.user);
        break;
      case 'user_left':
        removeCollaborator(message.userId);
        break;
      case 'cursor_move':
        updateCursorPosition(message.userId, message.position);
        break;
      case 'text_change':
        applyTextChange(message.change);
        break;
      case 'comment_added':
        addComment(message.comment);
        break;
      case 'comment_resolved':
        resolveComment(message.commentId);
        break;
      default:
        console.log('Unknown message type:', message.type);
    }
  };

  /**
   * Send message to collaboration server
   */
  const sendCollabMessage = (type, data) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type,
        userId,
        userName,
        manuscriptId,
        timestamp: Date.now(),
        ...data
      }));
    } else {
      console.log('WebSocket not connected, message not sent:', type, data);
    }
  };

  /**
   * Add collaborator to session
   */
  const addCollaborator = (user) => {
    setCollaborators(prev => {
      if (prev.find(c => c.id === user.id)) return prev;
      return [...prev, user];
    });
  };

  /**
   * Remove collaborator from session
   */
  const removeCollaborator = (userId) => {
    setCollaborators(prev => prev.filter(c => c.id !== userId));
  };

  /**
   * Update cursor position for collaborator
   */
  const updateCursorPosition = (userId, position) => {
    setCursorPositions(prev => ({
      ...prev,
      [userId]: position
    }));
  };

  /**
   * Apply text change from another user
   */
  const applyTextChange = (change) => {
    // In production: Apply operational transformation (OT) or CRDT
    console.log('Text change received:', change);
  };

  /**
   * Handle text selection for commenting
   */
  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    
    if (text.length > 0) {
      setSelectedText(text);
      setShowCommentBox(true);
    }
  };

  /**
   * Add comment to selected text
   */
  const addCommentToSelection = () => {
    if (!commentInput.trim()) return;

    const newComment = {
      id: `comment-${Date.now()}`,
      userId,
      userName,
      text: commentInput,
      selectedText,
      timestamp: Date.now(),
      resolved: false,
      replies: []
    };

    setComments(prev => [...prev, newComment]);
    sendCollabMessage('comment_added', { comment: newComment });
    
    setCommentInput('');
    setShowCommentBox(false);
    setSelectedText('');
  };

  /**
   * Add comment
   */
  const addComment = (comment) => {
    setComments(prev => [...prev, comment]);
  };

  /**
   * Resolve comment
   */
  const resolveComment = (commentId) => {
    setComments(prev => prev.map(c => 
      c.id === commentId ? { ...c, resolved: true } : c
    ));
  };

  /**
   * Reply to comment
   */
  const replyToComment = (commentId, replyText) => {
    const reply = {
      userId,
      userName,
      text: replyText,
      timestamp: Date.now()
    };

    setComments(prev => prev.map(c => 
      c.id === commentId 
        ? { ...c, replies: [...(c.replies || []), reply] }
        : c
    ));

    sendCollabMessage('comment_reply', { commentId, reply });
  };

  /**
   * Invite collaborator via email
   */
  const inviteCollaborator = (email) => {
    // In production: Send email invitation via backend
    const inviteLink = `${window.location.origin}/collab/${manuscriptId}?invite=${Date.now()}`;
    console.log(`Invitation sent to ${email}: ${inviteLink}`);
    alert(`Invitation link copied! Share with ${email}`);
    navigator.clipboard.writeText(inviteLink);
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-80 bg-midnight border-l border-midnight-light shadow-2xl overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-midnight-light p-4 border-b border-midnight-lighter">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-starlight">Collaboration</h3>
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        </div>
        
        {/* Connection Status */}
        <div className="text-sm text-starlight/60">
          {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
        </div>
      </div>

      {/* Active Collaborators */}
      <div className="p-4 border-b border-midnight-light">
        <h4 className="text-sm font-semibold text-starlight mb-3">
          Active ({collaborators.length})
        </h4>
        <div className="space-y-2">
          {collaborators.map(collab => (
            <div 
              key={collab.id}
              className="flex items-center gap-3 p-2 bg-midnight-light rounded-lg"
            >
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: collab.color }}
              >
                {collab.name[0]}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-starlight">{collab.name}</div>
                <div className="text-xs text-starlight/50">Editing...</div>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          ))}
        </div>

        {/* Invite Button */}
        <button
          onClick={() => {
            const email = prompt('Enter email to invite:');
            if (email) inviteCollaborator(email);
          }}
          className="w-full mt-3 px-4 py-2 bg-astral text-white rounded-lg text-sm font-medium hover:bg-astral/80 transition-colors"
        >
          + Invite Collaborator
        </button>
      </div>

      {/* Comments Section */}
      <div className="p-4">
        <h4 className="text-sm font-semibold text-starlight mb-3">
          Comments ({comments.filter(c => !c.resolved).length})
        </h4>

        {/* Add Comment Box (shown when text is selected) */}
        {showCommentBox && (
          <div className="mb-4 p-3 bg-midnight-light rounded-lg border border-astral">
            <div className="text-xs text-starlight/60 mb-2">
              Selected: "{selectedText.slice(0, 50)}{selectedText.length > 50 ? '...' : ''}"
            </div>
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add your comment..."
              className="w-full p-2 bg-midnight border border-midnight-lighter rounded text-starlight text-sm resize-none focus:outline-none focus:border-astral"
              rows={3}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={addCommentToSelection}
                className="px-3 py-1 bg-astral text-white rounded text-xs font-medium hover:bg-astral/80"
              >
                Comment
              </button>
              <button
                onClick={() => {
                  setShowCommentBox(false);
                  setCommentInput('');
                }}
                className="px-3 py-1 bg-midnight-lighter text-starlight rounded text-xs hover:bg-midnight-light"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Comments List */}
        <div className="space-y-3">
          {comments.filter(c => !c.resolved).length === 0 ? (
            <div className="text-center py-8 text-starlight/40 text-sm">
              No comments yet. Select text to add one!
            </div>
          ) : (
            comments
              .filter(c => !c.resolved)
              .map(comment => (
                <div 
                  key={comment.id}
                  className="p-3 bg-midnight-light rounded-lg border border-midnight-lighter"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium text-starlight text-sm">{comment.userName}</div>
                    <div className="text-xs text-starlight/40">
                      {new Date(comment.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                  {comment.selectedText && (
                    <div className="text-xs text-astral mb-2 italic">
                      "{comment.selectedText.slice(0, 60)}..."
                    </div>
                  )}
                  <div className="text-sm text-starlight/80 mb-2">
                    {comment.text}
                  </div>
                  
                  {/* Comment Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const reply = prompt('Your reply:');
                        if (reply) replyToComment(comment.id, reply);
                      }}
                      className="text-xs text-astral hover:underline"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => {
                        resolveComment(comment.id);
                        sendCollabMessage('comment_resolved', { commentId: comment.id });
                      }}
                      className="text-xs text-green-500 hover:underline"
                    >
                      Resolve
                    </button>
                  </div>

                  {/* Replies */}
                  {comment.replies?.length > 0 && (
                    <div className="mt-2 pl-3 border-l-2 border-astral/30 space-y-2">
                      {comment.replies.map((reply, idx) => (
                        <div key={idx} className="text-xs">
                          <span className="font-medium text-starlight">{reply.userName}:</span>{' '}
                          <span className="text-starlight/70">{reply.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="p-4 bg-midnight-light/50 border-t border-midnight-light">
        <div className="text-xs text-starlight/50 space-y-1">
          <p>💡 Select text in the editor to add comments</p>
          <p>👥 Invite others to collaborate in real-time</p>
          <p>✅ Resolve comments when addressed</p>
        </div>
      </div>
    </div>
  );
};

export default CollaborationHub;
