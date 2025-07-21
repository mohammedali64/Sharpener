import React, { useEffect, useState } from 'react';
import useGetSentMails from '../Hooks/useGetSentMails';
import { useDispatch, useSelector } from 'react-redux';
import { getSentMails } from '../store/slices/getMailSlice';
import EmailPopup from './EmailPopUp';

const Sent = () => {
  const dispatch = useDispatch();
  const sentEmails = useGetSentMails();
    const [open, setOpen] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(null);
  console.log(sentEmails)
  
  const updatedSentMails = useSelector((state) => state.getMail.mails);

  useEffect(() => {
      if (sentEmails.length > 0) {
        dispatch(getSentMails(sentEmails));
      }
    }, [sentEmails, dispatch]);

    const handleOpenEmail = (email) =>{
      setSelectedEmail(email);
      setOpen(true);
    }

    const handleClosePopup = () => {
    setOpen(false);
    setSelectedEmail(null);
  };

  return (
    <div className="p-4 h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sent</h2>
      <div className="space-y-4">
        {updatedSentMails.map((email) => (
          <div
            key={email.id}
            className="p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500"
          >
            <div className="flex justify-between items-center">
              <div>
                <p onClick={()=>handleOpenEmail(email)} className="font-medium text-gray-800">To: {email.to}</p>
                <p className="text-gray-600 text-sm">{email.subject}</p>
              </div>
              <span className="text-gray-500 text-sm">{email.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
      {open && <EmailPopup email={selectedEmail} onClose={handleClosePopup} toggle={false}/>}
    </div>
  );
};

export default Sent;