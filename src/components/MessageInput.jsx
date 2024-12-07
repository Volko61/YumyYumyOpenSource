import React from 'react';
import { Form, Button } from 'react-bootstrap';

const MessageInput = ({ input, setInput, handleSend }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend(input);
    setInput('');
  };

  return (
    <Form className="d-flex mb-3" onSubmit={handleSubmit}>
      <Form.Control
        type="text"
        autoFocus
        placeholder="Ask me for a recipe idea..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ flexGrow: 1 }}
      />
      <Button variant="secondary" type="submit" className="ms-2">
        Send
      </Button>
    </Form>
  );
};

export default MessageInput;
