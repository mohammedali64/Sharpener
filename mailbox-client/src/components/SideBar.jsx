import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useSelector } from 'react-redux';
import useGetInboxMail from '../Hooks/useGetInboxMail';
import useGetSentMails from '../Hooks/useGetSentMails';

const SideBar = ({ user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname.split('/')[1] || 'inbox');
  const InboxMails = useGetInboxMail();
  const sentMails = useGetSentMails();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  const handleNavigate = (path) => {
    const tab = path.replace('/', '');
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-indigo-800 to-indigo-600 shadow-2xl p-4 flex flex-col justify-between text-white">
      <div>
        <h2 className="text-2xl font-extrabold mb-8">Mailbox</h2>
        <nav className="space-y-4">
          <button
            onClick={() => handleNavigate('/inbox')}
            className={`w-full text-left px-4 py-3 rounded-lg ${
              activeTab === 'inbox' ? 'bg-white/20' : 'hover:bg-white/10'
            } transition-all duration-300`}
          >
            <span className="font-semibold">Inbox</span>
            <span className="ml-2 text-sm bg-blue-200 text-indigo-800 px-2 rounded-full">{InboxMails.length}</span>
          </button>
          <button
            onClick={() => handleNavigate('/sent')}
            className={`w-full text-left px-4 py-3 rounded-lg ${
              activeTab === 'sent' ? 'bg-white/20' : 'hover:bg-white/10'
            } transition-all duration-300`}
          >
            <span className="font-semibold">Sent</span>
            <span className="ml-2 text-sm bg-green-200 text-indigo-800 px-2 rounded-full">{sentMails.length}</span>
          </button>
          <button
            onClick={() => handleNavigate('/compose')}
            className={`w-full text-left px-4 py-3 rounded-lg ${
              activeTab === 'compose' ? 'bg-white/20' : 'hover:bg-white/10'
            } transition-all duration-300`}
          >
            <span className="font-semibold">Compose</span>
          </button>
        </nav>
      </div>
      <div className="space-y-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideBar;