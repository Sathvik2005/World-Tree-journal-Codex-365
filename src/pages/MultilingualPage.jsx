import React from 'react';
import MultilingualEditor from '../components/Language/MultilingualEditor';

/**
 * Multilingual Writing Page
 * Full-page writing experience with language support
 */
const MultilingualPage = () => {
  const handleSave = (entry) => {
    console.log('Entry saved:', entry);
    // Show success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.textContent = '✓ Entry saved successfully!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  const handleContentChange = (content, languageCode) => {
    // Optional: Track writing analytics
    console.log('Writing in:', languageCode, 'Length:', content.length);
  };

  return (
    <div className="min-h-screen bg-midnight">
      <MultilingualEditor 
        onSave={handleSave}
        onContentChange={handleContentChange}
      />
    </div>
  );
};

export default MultilingualPage;
