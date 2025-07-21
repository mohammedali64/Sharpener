import React, { useEffect, useState } from 'react'

const useGetSentMails = () => {
  const [sentMails, setSentMails] = useState([]);
  
    useEffect(() => {
      const getmail = async () => {
        const preEmail = localStorage.getItem('email');
        if (!preEmail) return;
  
        const email = preEmail.replace('.', '_');
  
        const res = await fetch(`https://mailbox-client-8c1d4-default-rtdb.firebaseio.com/mails/${email}/sent.json`);
        const data = await res.json();
  
        if (data) {
          const mailsArray = Object.entries(data).map(([id, mail]) => ({
            id,
            ...mail,
          }));
  
          setSentMails(mailsArray);
        }
      };
  
      getmail();
    }, []);
    return sentMails;
}

export default useGetSentMails
