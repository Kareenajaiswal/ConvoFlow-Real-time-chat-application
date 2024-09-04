import React, { useState } from 'react';
import { ChatBoxReceiver, ChatBoxSender } from './ChatBox';
import InputText from './InputText';
import { PhoneOutlined, VideoCameraOutlined } from '@ant-design/icons'; // Ant Design Icons

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',  // Full viewport height
    padding: 0,
    margin: 0,
    boxSizing: 'border-box'
  },
  header: {
    backgroundColor: '#8470F8',
    color: 'white',
    padding: '40px',  // Increased padding for thickness
    textAlign: 'left',
    fontSize: '30px',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'  // Space between name and icons
  },
  messagesContainer: {
    flex: 1,  // Allows this container to grow and take up available space
    overflowY: 'auto',
    padding: '20px', // Optional padding for content spacing
    color: 'white',
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: '10px', // Add padding for better look
  },
  iconButton: {
    marginLeft: 10,
    fontSize: '25px',
    color: 'white',  // White color for icons
    cursor: 'pointer'
  }
};

export default function ChatContainer() {
  const [messages, setMessages] = useState([]);
  const receiverName = "Kareena";  // Set receiver's name here

  const addMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div>{receiverName}</div>
        <div>
          <PhoneOutlined style={styles.iconButton} />
          <VideoCameraOutlined style={styles.iconButton} />
        </div>
      </div>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => 
          msg.user === receiverName ? (
            <ChatBoxReceiver
              key={index}
              user={msg.user}
              avatar={msg.avatar || 'https://via.placeholder.com/50'}
              message={msg.message}
            />
          ) : (
            <ChatBoxSender
              key={index}
              user={msg.user}
              avatar={msg.avatar || 'https://via.placeholder.com/50'}
              message={msg.message}
            />
          )
        )}
      </div>
      <div style={styles.inputContainer}>
        <InputText addMessage={addMessage} />
      </div>
    </div>
  );
}
