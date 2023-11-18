import { useState } from "react";
import { useDispatch } from "react-redux";
import './MessageInput.css'
import { createMessage } from "../../../../store/messages";

const MessageInput = ({channel}) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        //only send message if not blank
        if (!isSubmitDisabled) {
            const message = {
                content,
                messageable_type: 'Channel',
                messageable_id: channel.id
            }
            dispatch(createMessage(message)).then(() => {setContent('')})
            setSubmitDisabled(true)
        }
    }

    const handleChange = (e) => {
        e.preventDefault();

        if (content === " ") setSubmitDisabled(true)
        else {
            if (content.length > 1 && content.slice(-1) !== " ") {
                setSubmitDisabled(false)
            }
        };

        setContent(e.currentTarget.value)
    }

    return (
        <div className="message-input-container">
            <form onSubmit={handleSubmit} className="message-input">
                <textarea
                placeholder={`Message #${channel.name}`}
                onChange={handleChange}
                value={content}
                wrap="true"
                className='form-input'
                id="message-input"/>

                <button type="submit"
                disabled={isSubmitDisabled}
                id='message-input-submit'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default MessageInput;