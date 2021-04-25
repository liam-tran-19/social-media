import React, { useEffect, useRef, useState } from "react";
import "./Conversations.scss";
import ChatHeader from "./Header/Header";
import { firestore } from "../../../firebase";
import firebase from "firebase/app";
import { useLocation } from "react-router";
import { IChatMsg, IUserObj } from "../../../types/interfaces";
import { useCollectionData } from "react-firebase-hooks/firestore";
import axios from 'axios'
const Conversation = () => {
  let user: any = localStorage.getItem("user");
  let userId = JSON.parse(user).id;
  const [formValue, setFormValue] = useState<string>("");
  const [userData, setUserData] = useState<IUserObj>();
  const [stateData, setStateData] = useState<IUserObj>();
  let { state } = useLocation();
  const dummy = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    axios.get<IUserObj>(`/api/auth/user/id/${userId}`) .then(response => {
      console.log(response.data);
      setUserData( response.data );
  });
    axios.get<IUserObj>(`/api/auth/user/id/${state}`) .then(response => {
      console.log(response.data);
      setStateData( response.data );
  });
  }, []);
  console.log(userData);
  console.log(stateData);
  const id = [userId, state].sort();
  const messagesRef = firestore
    .collection("chats")
    .doc(`${id[0]}-${id[1]}`)
    .collection("message")
    .orderBy("createdAt");

  const [messages] = useCollectionData(messagesRef);
  console.log(messages);

  const sendMessage = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    const createdAt = firebase.firestore.FieldValue.serverTimestamp();
    const message = {
      sender: userId,
      text: formValue,
      createdAt: createdAt,
    };
    //sort ID
    const id = [userId, state].sort();
    console.log(id);
    const chat = firestore.collection("chats").doc(`${id[0]}-${id[1]}`);
    const doc = await chat.get();
    if (!doc.exists) {
      await chat.set({
        _id: `${id[0]}-${id[1]}`,
        users: [id[0], id[1]],
        startConversation: createdAt,
        lastMessage: createdAt,
      });
    } else if (doc.exists) {
      await chat.update({
        lastMessage: createdAt,
      });
    }
    await chat.collection("message").add(message);

    setFormValue("");
    const node = dummy.current as any;
    node.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        <ChatHeader info={stateData} />
        <section className="chat">
          <main id="scrollable-div">
            {messages &&
              messages.map((msg) => (
                <ChatMessage key={msg.id} message={msg} userId={userId} />
              ))}

            <span ref={dummy}></span>
          </main>

          <form onSubmit={sendMessage} className="chat__message">
            <input
              className="chat__message-input"
              value={formValue}
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Type message"
            />

            <button type="submit" disabled={!formValue}>
              🕊️
            </button>
          </form>
        </section>
      </main>
    </>
  );
};
function ChatMessage({ message, userId }: IChatMsg) {
  console.log(message);
  const { text, sender } = message;

  const messageClass = sender === userId ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <p className="messageText">{text}</p>
      </div>
    </>
  );
}

export default Conversation;
