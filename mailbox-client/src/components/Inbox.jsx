import React, { useState } from 'react';
import useGetInboxMail from '../Hooks/useGetInboxMail';
import EmailPopup from './EmailPopUp';
import readChecker from '../Helper Function/readChecker';

const Inbox = () => {
  const mails = useGetInboxMail();
  const [open, setOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  console.log(mails);

  const handleEmailOpen = async(email) => {
    setSelectedEmail(email);
    setOpen(true);

    const data = await readChecker(email);
  };

  const handleClosePopup = () => {
    setOpen(false);
    setSelectedEmail(null);
  };

  return (
    <div className="p-4 h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Inbox</h2>
      <div className="space-y-4">
        {mails.map((email) => (
          <div
            onClick={() => handleEmailOpen(email)}
            key={email.id}
            className={`p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
              !email.read ? 'border-l-4 border-indigo-500' : 'border-l-4 border-gray-300'
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
      {open && <EmailPopup email={selectedEmail} onClose={handleClosePopup} />}
    </div>
  );
};

export default Inbox;