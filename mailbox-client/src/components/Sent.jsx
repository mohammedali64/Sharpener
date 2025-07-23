import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSentMails } from '../store/slices/getMailSlice';
import EmailPopup from './EmailPopUp';

const Sent = () => {
  const dispatch = useDispatch();
  const sentEmails = useSelector((state) => state.getMail.mails);
    const [open, setOpen] = useState(false);
    const [selectedEmail, setSelectedEmail] = useState(null);
  console.log(sentEmails)
  
  const updatedSentMails = useSelector((state) => state.getMail.mails);

  useEffect(() => {
      if (sentEmails.length > 0) {
        dispatch(getSentMails(sentEmails));
      }
    }, [sentEmails]);

    const handleOpenEmail = (email) =>{
      setSelectedEmail(email);
      setOpen(true);
    }

    const handleClosePopup = () => {
    setOpen(false);
    setSelectedEmail(null);
  };

  const handleDelete = async(email)=>{
    console.log(email.id);
    try{
      await fetch(`https://mailbox-client-8c1d4-default-rtdb.firebaseio.com/mails/${email.from}/sent/${email.id}.json`,{
        method: 'DELETE',
      })
    }catch(error){
      console.log(error);
    }
    const updatedMails = sentEmails.filter((mail)=> mail.id !== email.id);
    dispatch(getSentMails(updatedMails));
  }

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
              <button
                  className="flex items-center bg-gradient-to-r from-red-500 to-red-700 text-white px-3 py-1 rounded-lg shadow-md hover:from-red-600 hover:to-red-800 transition-all duration-300"
                  onClick={()=>handleDelete(email)}
                >
                  <svg className="mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 00-1 1v1H4a1 1 0 000 2h1v9a2 2 0 002 2h6a2 2 0 002-2V6h1a1 1 0 100-2h-4V3a1 1 0 00-1-1H9zm1 3h4v9a1 1 0 01-1 1H6a1 1 0 01-1-1V5h4zm2 4a1 1 0 10-2 0v4a1 1 0 102 0v-4zm-4 0a1 1 0 10-2 0v4a1 1 0 102 0v-4z" />
                  </svg>
                  Delete
                </button>
            </div>
          </div>
        ))}
      </div>
      {open && <EmailPopup email={selectedEmail} onClose={handleClosePopup} toggle={false}/>}
    </div>
  );
};

export default Sent;