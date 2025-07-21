import React, { useState, useEffect } from 'react';
import useGetInboxMail from '../Hooks/useGetInboxMail';
import { useDispatch, useSelector } from 'react-redux';
import EmailPopup from './EmailPopUp';
import readChecker from '../Helper Function/readChecker';
import { markMailAsRead, setMails } from '../store/slices/mailSlice';

const Inbox = () => {
  const dispatch = useDispatch();
  const mails = useGetInboxMail(); 
  const [open, setOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  
  const updatedMails = useSelector((state) => state.mail.mails); 

  useEffect(() => {
    if (mails.length > 0) {
      dispatch(setMails(mails));
    }
  }, [mails, dispatch]);

  const handleEmailOpen = async (email) => {
    setSelectedEmail(email);
    setOpen(true);
    dispatch(markMailAsRead(email.id)); 
    if(email.read === true) return;
    const data = await readChecker(email);
    console.log(data);
  };

  const handleClosePopup = () => {
    setOpen(false);
    setSelectedEmail(null);
  };

  const handleDelete = async(email)=>{
    console.log(email);
    try{
      await fetch(`https://mailbox-client-8c1d4-default-rtdb.firebaseio.com/mails/${email.to}/received/${email.id}.json`,{
        method: 'DELETE',
      })
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="p-4 h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Inbox</h2>
      <div className="space-y-4">
        {updatedMails.map((email) => (
          <div
            key={email.id}
            className={`p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${!email.read ? 'border-l-4 border-indigo-500' : 'border-l-4 border-gray-300'}`}
          >
            <div className="flex justify-between items-center">
              <div onClick={() => handleEmailOpen(email)}>
                <p className="font-medium text-gray-800">{email.from}</p>
                <p className="text-gray-600 text-sm">{email.subject}</p>
              </div>
              <div className="flex items-center">
                <span className="text-gray-500 text-sm mr-4">{email.timeStamp}</span>
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
          </div>
        ))}
      </div>
      {open && <EmailPopup email={selectedEmail} onClose={handleClosePopup} toggle = {true}/>}
    </div>
  );
};

export default Inbox;