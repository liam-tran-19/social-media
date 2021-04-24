import React from "react";
import { useHistory } from "react-router-dom";
import { IChat } from "../../types/interfaces";
import { firestore } from "../../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
const ListCard = ({ idTexter, idUser, searchName }: IChat) => {
  const [data, setData] = React.useState();
  const history = useHistory();

  const id = [idUser, idTexter].sort();
  const messagesRef = firestore
    .collection("chats")
    .doc(`${id[0]}-${id[1]}`)
    .collection("message")
    .orderBy("createdAt", "desc")
    .limit(1);

  const [messages] = useCollectionData(messagesRef);

  React.useEffect(() => {
    fetch(`/api/resident/id/${idUser}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  console.log(data);
  // function convertTime(messagedTime: any) {
  //   let date: Date = new Date();  
  //   var seconds = Math.floor(date / 1000 - messagedTime);
  //   console.log(seconds);
  //   var interval = seconds / 31536000;

  //   if (interval > 1) {
  //     if (Math.floor(interval) == 1) {
  //       return "1 year";
  //     } else {
  //       return Math.floor(interval) + " years";
  //     }
  //   }
  //   interval = seconds / 2592000;
  //   if (interval > 1) {
  //     if (Math.floor(interval) == 1) {
  //       return "1 month";
  //     } else {
  //       return Math.floor(interval) + " months";
  //     }
  //   }
  //   interval = seconds / 86400;
  //   if (interval > 1) {
  //     if (Math.floor(interval) == 1) {
  //       return "1 day";
  //     } else {
  //       return Math.floor(interval) + " days";
  //     }
  //   }
  //   interval = seconds / 3600;
  //   if (interval > 1) {
  //     if (Math.floor(interval) == 1) {
  //       return "1 hour";
  //     } else {
  //       return Math.floor(interval) + " hours";
  //     }
  //   }
  //   interval = seconds / 60;
  //   if (interval > 1) {
  //     if (Math.floor(interval) == 1) {
  //       return "1 minute";
  //     } else {
  //       return Math.floor(interval) + " minutes";
  //     }
  //   }
  //   return "just now";
  // }

  // const searchAction = (data: Object) => {
  //   const name = data.firstName + " " + data.lastName;
  //   return name.toString().toLowerCase().includes(searchName);
  // };

  // // Re-direct to Chat component (Direct Message)
  // function handleMessage(resName: string) {
  //   console.log(resName);
  //   localStorage.setItem(MOBILE.PREFIX_DM, resName);
  //   console.log(resName);
  //   history.push("/shoperon-conversation", resName);
  // }

  // const showMessage = (message:string) => {
  //   if (message.sender == idTexter) {
  //     return "You: " + message.text;
  //   } else {
  //     return message.text;
  //   }
  // };

  return (
    <>
      {data && messages && searchAction(data) && (
        <div className="inbox" onClick={() => handleMessage(data._id)}>
          <div>
            <img src={data.profilePicture} className="inbox__user-pic" />
          </div>
          <div className="inbox__messageContainer">
            <p className="inbox__user-name">
              {data.firstName + " " + data.lastName}
            </p>
            <p className="inbox__message-unread">{showMessage(messages[0])}</p>
          </div>
          <div className="inbox__right">
            <p className="inbox__time">
              {convertTime(messages[0].createdAt.seconds)}
            </p>
            {/* {newMessage} */}
            {/* <img className="inbox__unread" src={unread}/> */}
          </div>
        </div>
      )}
    </>
  );
};

export default ListCard;
