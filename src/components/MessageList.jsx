// MessageList.js
import React from 'react';
import { motion } from 'framer-motion';

const MessageList = ({ messages }) => {
  return (
    <>
      {messages.map((msg, idx) => (
        <motion.div
          key={idx}
          className={`d-flex ${
            msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'
          } mb-2`}
          initial={{ opacity: 0, x: msg.role === 'user' ? 50 : -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className={`px-3 py-2 rounded bg-secondary text-dark`}>
            {msg.text}
          </span>
        </motion.div>
      ))}
    </>
  );
};

export default MessageList;
