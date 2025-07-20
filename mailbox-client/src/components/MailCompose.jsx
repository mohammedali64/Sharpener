import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MailCompose = () => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const encodeEmail = email => email.replace('.', '_');

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Email:', { to, subject, body });
    const sender = encodeEmail(localStorage.getItem('email'));
    const toEmail = encodeEmail(to);
    if(sender === toEmail){
        alert("You can't send email to yourself");
        return;
    }
    const mailData = {
        from: sender,
        to: toEmail,
        subject: subject,
        body: body,
        timeStamp: Date.now()
    };

    await fetch(`https://mailbox-client-8c1d4-default-rtdb.firebaseio.com/mails/${toEmail}.json`, {
        method: "POST",
        body: JSON.stringify(mailData)
    });

    await fetch(`https://mailbox-client-8c1d4-default-rtdb.firebaseio.com/mails/${sender}.json`, {
        method: "POST",
        body: JSON.stringify(mailData)
    });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'link'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'link',
    'list', 'bullet',
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-100 via-gray-50 to-white p-6">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-xl shadow-xl p-6 border border-gray-100/50 transition-all duration-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-b border-gray-200 pb-3">
            <label className="block text-sm font-medium text-gray-700">To</label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-3 border-b-2 border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 bg-gray-50/50 rounded-md text-gray-800 placeholder-gray-500 transition-all duration-300"
              placeholder="Recipients"
              required
            />
          </div>

          <div className="border-b border-gray-200 pb-3">
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-3 border-b-2 border-transparent focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/50 bg-gray-50/50 rounded-md text-gray-800 placeholder-gray-500 transition-all duration-300"
              placeholder="Subject"
            />
          </div>

          <div className="min-h-[350px]">
            <ReactQuill
              value={body}
              onChange={setBody}
              modules={modules}
              formats={formats}
              className="h-full bg-gray-50/50 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none transition-all duration-300"
              placeholder="Write your email here..."
            />
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <div className="flex space-x-2">
              {/* Toolbar buttons are now handled by ReactQuill */}
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MailCompose;