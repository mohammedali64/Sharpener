import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { formatDate } from '../Helper Function/FormatDate';
import AddID from '../Helper Function/AddID';

const MailCompose = ({ user }) => {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const dummyRecipients = ['john.doe@example.com', 'jane.smith@example.com', 'team.lead@example.com'];

  const encodeEmail = (email) => email.replace('.', '_');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sender = encodeEmail(user.email);
    const toEmail = encodeEmail(to);
    if (sender === toEmail) {
      alert("You can't send email to yourself");
      return;
    }
    const mailData = {
      from: sender,
      to: toEmail,
      subject,
      body,
      read: false,
      timeStamp: formatDate(Date.now()),
    };

    const receivedMailData = await fetch(`https://mailbox-client-8c1d4-default-rtdb.firebaseio.com/mails/${toEmail}/received.json`, {
      method: 'POST',
      body: JSON.stringify(mailData),
    });

    const sentMailData = await fetch(`https://mailbox-client-8c1d4-default-rtdb.firebaseio.com/mails/${sender}/sent.json`, {
      method: 'POST',
      body: JSON.stringify(mailData),
    });
    const receivedData = await receivedMailData.json();
    console.log(toEmail);
    await AddID(receivedData.name,toEmail,mailData);
    console.log(receivedData.name);

    alert('Email sent successfully!');
    setTo('');
    setSubject('');
    setBody('');
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
    ],
  };

  const formats = ['header', 'bold', 'italic', 'underline', 'link', 'list', 'bullet'];

  return (
    <div className="p-4 h-full flex items-center justify-center bg-gradient-to-br from-indigo-100 via-blue-50 to-gray-100">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-gray-200 h-full overflow-y-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Compose Email</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <input
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              placeholder="Enter recipient email (e.g., john.doe@example.com)"
              list="recipients"
              required
            />
            <datalist id="recipients">
              {dummyRecipients.map((email) => (
                <option key={email} value={email} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              placeholder="Enter subject"
            />
          </div>
          <div className="min-h-[300px]">
            <label className="block text-sm font-medium text-gray-700 mb-2">Body</label>
            <ReactQuill
              value={body}
              onChange={setBody}
              modules={modules}
              formats={formats}
              className="h-[calc(100vh-20rem)] bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none transition-all duration-300"
              placeholder="Write your email here..."
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-600 transition-all duration-300"
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