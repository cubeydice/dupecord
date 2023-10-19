import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './MessageInput.css'
import { createMessage } from "../../../../store/messages";
import consumer from "../../../../consumer";

const MessageInput = ({channel}) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [isSubmitDisabled, setSubmitDisabled] = useState(false);

    useEffect(() => {
        if (content === "") setSubmitDisabled(true);
        else setSubmitDisabled(false);
    }, [content])

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = {
            content,
            messageable_type: 'Channel',
            messageable_id: channel.id
        }
        dispatch(createMessage(message))
        setContent('')
    }

    const handleChange = (e) => {
        e.preventDefault();

        setContent(e.currentTarget.value)
    }


    return (
        <>
        <form onSubmit={handleSubmit} className="message-input-container">
            <input type="text"
            placeholder={`Message #${channel.name}`}
            onChange={handleChange}
            value={content}
            className='form-input'
            id="message-input"/>
            <button type="submit"
            disabled={isSubmitDisabled}
            id='message-input-submit'>
                Submit
            </button>
        </form>
        </>
    )
}

export default MessageInput;