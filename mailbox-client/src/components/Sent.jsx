import React from 'react';

const Sent = () => {
  const dummyEmails = [
    { id: 1, to: 'john.doe@example.com', subject: 'Task Assignment', timestamp: '2025-07-21 08:30' },
    { id: 2, to: 'jane.smith@example.com', subject: 'Proposal Sent', timestamp: '2025-07-20 14:00' },
    { id: 3, to: 'team.lead@example.com', subject: 'Meeting Notes', timestamp: '2025-07-19 10:30' },
    { id: 4, to: 'client@x.ai', subject: 'Invoice Details', timestamp: '2025-07-18 12:00' },
    { id: 5, to: 'partner@company.com', subject: 'Follow-Up Email', timestamp: '2025-07-17 09:30' },
    { id: 6, to: 'boss@example.com', subject: 'Report Submission', timestamp: '2025-07-16 15:00' },
    { id: 7, to: 'manager@firm.com', subject: 'Team Update', timestamp: '2025-07-15 11:00' },
  ];

  return (
    <div className="p-4 h-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Sent</h2>
      <div className="space-y-4">
        {dummyEmails.map((email) => (
          <div
            key={email.id}
            className="p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-green-500"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">To: {email.to}</p>
                <p className="text-gray-600 text-sm">{email.subject}</p>
              </div>
              <span className="text-gray-500 text-sm">{email.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sent;