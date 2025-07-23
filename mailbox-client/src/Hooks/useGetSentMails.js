import { useEffect, useState } from 'react';

const useGetSentMails = (refresh) => {
  const [sentMails, setSentMails] = useState([]);

  useEffect(() => {
    const fetchSentMails = async () => {
      const preEmail = localStorage.getItem('email');
      if (!preEmail) return;

      const email = preEmail.replace('.', '_');

      const res = await fetch(
        `https://mailbox-client-8c1d4-default-rtdb.firebaseio.com/mails/${email}/sent.json`
      );
      const data = await res.json();

      if (data) {
        const mailsArray = Object.entries(data).map(([id, mail]) => ({
          id,
          ...mail,
        }));
        setSentMails(mailsArray);
      } else {
        setSentMails([]);
      }
    };

    fetchSentMails();
  }, [refresh]);

  return sentMails;
};

export default useGetSentMails;
