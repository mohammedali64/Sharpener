import { useEffect, useState } from 'react';

const useGetInboxMail = () => {
  const [inboxMails, setInboxMails] = useState([]);

  useEffect(() => {
    const getmail = async () => {
      const preEmail = localStorage.getItem('email');
      if (!preEmail) return;

      const email = preEmail.replace('.', '_');

      const res = await fetch(`https://mailbox-client-8c1d4-default-rtdb.firebaseio.com/mails/${email}/received.json`);
      const data = await res.json();

      if (data) {
        const mailsArray = Object.entries(data).map(([id, mail]) => ({
          id,
          ...mail,
        }));

        setInboxMails(mailsArray);
      }
    };

    getmail();
  }, []);
  return inboxMails;
};

export default useGetInboxMail;
