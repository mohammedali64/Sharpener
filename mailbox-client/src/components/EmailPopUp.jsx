import React from 'react';

const EmailPopup = ({ email, onClose, toggle }) => {
  if (!email) return null;
  console.log(toggle);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-4 rounded-t-xl mb-4">
          <h3 className="text-xl font-bold">Email Details</h3>
        </div>
        <div className="space-y-4">
          {toggle?<div>
            <label className="block text-sm font-medium text-gray-700">From:</label>
            <p className="text-lg font-semibold text-gray-800">{email.from}</p>
          </div>:
          <div>
            <label className="block text-sm font-medium text-gray-700">To:</label>
            <p className="text-lg font-semibold text-gray-800">{email.to}</p>
          </div>}
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject:</label>
            <p className="text-lg font-semibold text-gray-800">{email.subject}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Body:</label>
            <div
                className="prose max-w-none p-4 bg-gray-50 rounded-lg text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: email.body || '<p>No body content available.</p>' }}
            />
          </div>
          <div className="text-right">
            <button
              onClick={onClose}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailPopup;