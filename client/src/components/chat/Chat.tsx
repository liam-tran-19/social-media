import React, {useState} from "react";
import { ITarget } from "../../types/interfaces";
import AppNav from "../AppNav";
import './Chat.scss'
import ListCard from "./ListCard";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../../firebase";

const Chat = () => {
  const [searchName, setSearchName] = useState("");
  const messagesRef = firestore.collection("chats").orderBy("lastMessage", 'desc');
  const [allMessages] = useCollectionData(messagesRef);
  console.log(allMessages);

  const user = sessionStorage.getItem("USER_INFO");

  const conversations =
    allMessages &&
    allMessages.map((message) => {
      if (message.residents.indexOf(userId) > -1) {
        const index = message.residents.findIndex((id) => id != userId);
        const id = message.residents[index];
        console.log(id);
        return (
          <ListCard idUser={id} idTexter={userId} searchName={searchName} />
        );
      }
    });
  return (
    <div>
      <AppNav />
      <main>
        <section className="messages">
          <div className="messages__search">
            <input
              className="messages__search-input"
              placeholder="Search"
              value={searchName}
              onChange={(e: ITarget) => setSearchName(e.target.value)}
            />
          </div>
          <div className="messages__search-messages-div">
            <p className="messages__search-messages">Messages</p>
          </div>
          <div></div>
          {/* {conversations} */}
         
        </section>
      </main>
    </div>
  );
};

export default Chat;
