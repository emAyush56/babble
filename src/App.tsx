import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

type MessageType = {
  timeStamp: string;
  msg: string;
};

function App() {
  const [message, setMessage] = useState("");
  const [sentMessages, setSentMessages] = useState<MessageType[]>([]);

  const getCurrentTime = (): string => {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const amOrPm = hours >= 12 ? "PM" : "AM";

    const formattedHours = hours === 0 ? 12 : hours < 10 ? `0${hours}` : hours;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${formattedHours}:${formattedMinutes} ${amOrPm}`;
  };

  console.log(getCurrentTime());

  const handleSendMessage = () => {
    if (message !== "") {
      console.log("message sent");
      const payload = {
        timeStamp: getCurrentTime(),
        msg: message,
      };
      setSentMessages((prev) => [...prev, payload]);
      setMessage("");
    }
  };

  const handleInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && message !== "") handleSendMessage();
  };

  return (
    <div className="App h-[100dvh] w-full flex items-center justify-center bg-gray-50 text-gray-800 text-sm">
      <div className="chat-window h-full w-full sm:h-[36rem] sm:w-[30rem] sm:rounded-2xl bg-white overflow-auto flex flex-col gap-3 justify-between p-1">
        <div className="chats h-full space-y-1 flex flex-col mr-10">
          {sentMessages.map((msg, idx) => (
            <div
              key={idx}
              className="msg bg-blue-500 text-white w-fit px-3 py-1 rounded-2xl ml-auto mt-auto"
            >
              <span className="message">{msg.msg}</span>
              <span className="time text-[9px] ml-1.5">{msg.timeStamp}</span>
            </div>
          ))}
        </div>
        <div className="chat-input flex gap-1">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleInputKeydown}
            type="text"
            placeholder="Type a message"
            className="bg-gray-50 w-full rounded-full outline-none px-5 py-2.5 text-sm"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 hover:bg-blue-600 transition-all hob w-11 h-10 rounded-full flex items-center justify-center"
          >
            <PaperAirplaneIcon className="h-[18px] w-[18px] text-white ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
