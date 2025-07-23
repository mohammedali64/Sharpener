import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import useGetInboxMail from "../Hooks/useGetInboxMail";
import { useDispatch } from "react-redux";
import { setMails } from "../store/slices/mailSlice";
import useGetSentMails from "../Hooks/useGetSentMails";
import { getSentMails } from "../store/slices/getMailSlice";
import { useEffect } from "react";

const Home = ({ user }) => {
  const mails = useGetInboxMail(5000);
  const sentMails = useGetSentMails();
  const dispatch = useDispatch();

  useEffect(() => {
  if (mails.length > 0) {
    dispatch(setMails(mails));
  }
}, [mails, dispatch]);

  useEffect(() => {
  if (sentMails.length > 0) {
    dispatch(getSentMails(sentMails));
  }
}, [sentMails, dispatch]);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
      <SideBar user={user} />
      <div className="ml-5 flex-1 h-full overflow-y-auto bg-white">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;