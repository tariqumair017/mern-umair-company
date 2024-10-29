import React, { useState } from 'react';
import './ChatPage.css'; // You can create a separate CSS file for styling

export const Chat = () => {
    let sessionId = '1f1ca421-3d22-408e-8366-3f4017cff5c001'; 
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState(""); 
  const [checkCommand, setCheckCommand] = useState([]); 

  // Fetch messages when the component mounts
//   useEffect(() => {
//     const fetchMessages = async () => {
//         try {
//             const response = await fetch('http://localhost:3002/api/chat/get-messages');
//             const data = await response.json();
//             setMessages(data.messages);
//         } catch (error) {
//             console.error("Error fetching messages:", error);
//         }
//     };

//     fetchMessages();
// }, []);

// Handle message input change
const handleInputChange = (e) => { 
    setInputMessage(e.target.value);
};

// Handle form submit
const handleFormSubmit = async (e) => { 
    e.preventDefault(); 
    if(!inputMessage){
        alert("write message first");
    }
    setMessages([...messages, { user: 'user', text: inputMessage }]);
    setInputMessage("");    
    try {  
        let body = { text: inputMessage, sessionId: sessionId };
         if(checkCommand.length > 0) {
            body = {};
            checkCommand.map((msg, index) => (body[msg] = msg)) 
            body.sessionId = sessionId;
         }   
        const response = await fetch(`http://localhost:3000/chatbot/text-to-text?userType=user&agent_handover=0`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'private_key': '123456'
            },
            body: JSON.stringify(body),
        });
 
           console.log("response", response); 
            const messageRes = await response.json(); 
            // setMessages([...messages, { user: "chatbot", text: messageRes.responseMessages }]);
            for (const element of messageRes.responseMessages) { 
                if(element.text){
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { user: 'chatbot', text: element.text.text[0] },
                    ]); 
                } else if(element.id && element.bedrooms){
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { user: 'chatbot', text: `${element.bedrooms} Bedrooms ${element.type.toUpperCase()} in ${element.location}`},
                    ]); 
                } else {
                    if(messageRes.command){
                        setCheckCommand([...checkCommand, messageRes.command]); 
                    } else {
                        setCheckCommand("");
                    }
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        { user: 'chatbot', text: element },
                    ]); 
                } 
            } 
         
    } catch (error) {
        console.error("Error sending message:", error);
    }
};


  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat with AI</h2>
      </div>
      <div className="chat-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.user}`}>
            <span>{msg.text}</span>
          </div>
        ))}
      </div>
      <div>
        <form className="chat-footer" onSubmit={handleFormSubmit}>
            <input
            type="text"
            placeholder="Type your message..."
            value={inputMessage}
            onChange={handleInputChange} 
            />
            <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
