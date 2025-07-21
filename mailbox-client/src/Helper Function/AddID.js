import { db, ref, set } from '../firebase'; 

const AddID = async (id, email, mailData) => {
  try {
    const newMailData = { id, ...mailData };
    const emailPath = email.replace('.', '_');
    const pathRef = ref(db, `mails/${emailPath}/received/${id}`);
    await set(pathRef, newMailData);
    console.log("Mail saved successfully.");
  } catch (err) {
    console.error("Firebase error:", err.message);
  }
};

export default AddID;
