import React from 'react';
import useGetInboxMail from '../Hooks/useGetInboxMail';

const Inbox = () => {
 const mails = useGetInboxMail();
 console.log(mails);


  return (
    <div className="p-4 h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Inbox</h2>
      <div className="space-y-4">
        {mails.map((email) => (
          <div
            key={email.timeStamp}
            className={`p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 ${
              email.unread ? 'border-l-4 border-indigo-500' : 'border-l-4 border-gray-300'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">{email.from}</p>
                <p className="text-gray-600 text-sm">{email.subject}</p>
              </div>
              <span className="text-gray-500 text-sm">{email.timeStamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inbox;