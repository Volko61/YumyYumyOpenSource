import { Container } from "react-bootstrap";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import Artefacts from "./Artefacts";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { ArtefactContext } from "../context/ArtefactContext";

export default function Home() {
    const { messages, chatEndRef, input, setInput, handleSend } = useContext(ChatContext); // Access context values
    const { isShowArtefact } = useContext(ArtefactContext)

    return (
        <Container fluid className="d-flex h-100 overflow-hidden">
            <Container fluid className="d-flex flex-column h-100">
                {/* Chat Messages Section */}
                <div
                    className="flex-grow-1 mb-3 p-3 rounded"
                    style={{
                        height: '0',
                        flexGrow: 1,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                    }}
                >
                    <MessageList messages={messages} />
                    <div ref={chatEndRef}></div>
                </div>

                {/* Message Input Section */}
                <MessageInput input={input} setInput={setInput} handleSend={handleSend} />
            </Container>

            {/* <Artefacts /> */}
            {isShowArtefact && (<Artefacts/>)}
        </Container>
    );
}
