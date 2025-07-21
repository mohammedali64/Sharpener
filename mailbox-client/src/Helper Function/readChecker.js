import { db, ref, set } from '../firebase';

const readChecker = async (emailData) => {
  try {
    const newMailData = {...emailData,read:true};
    const emailPath = emailData.to.replace('.', '_');
    const pathRef = ref(db, `mails/${emailPath}/received/${emailData.id}`);
    await set(pathRef, newMailData);
    console.log("Mail seen");
    return newMailData;
  } catch (err) {
    console.error("Firebase error:", err.message);
  }
};

export default readChecker
