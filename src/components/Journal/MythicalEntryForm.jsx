import React, { useState } from 'react';

/**
 * Mythical Entry Form Component
 * A form for users to create journal entries related to their mythical journey.
 */
const MythicalEntryForm = ({ isOpen, onClose, onSubmit, isSubmitting }) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(content, mood);
    setContent('');
    setMood('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Record Your Journey</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4"
            placeholder="Describe your experience..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <select
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            required
          >
            <option value="" disabled>Select your mood</option>
            <option value="joyful">Joyful</option>
            <option value="thoughtful">Thoughtful</option>
            <option value="reflective">Reflective</option>
            <option value="adventurous">Adventurous</option>
          </select>
          <div className="flex justify-between">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn-primary ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Entry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MythicalEntryForm;