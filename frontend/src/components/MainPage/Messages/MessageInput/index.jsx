import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './MessageInput.css'
import { createMessage } from "../../../../store/messages";

const MessageInput = ({channel}) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState('');
    const [isSubmitDisabled, setSubmitDisabled] = useState(true);
    const [blank, isBlank] = useState(true)

    useEffect(() => {
        if (!blank) setSubmitDisabled(false);
    }, [blank])

    const handleSubmit = (e) => {
        e.preventDefault();

        //only send message if not blank
        if (!blank) {
            const message = {
                content,
                messageable_type: 'Channel',
                messageable_id: channel.id
            }

            dispatch(createMessage(message)).then(() => {setContent('')})
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        console.log(content)
        if (!blank) {
            if (content === " ") {
                isBlank(true)
                setSubmitDisabled(true)
            }
        } else {
            if (content.slice(-1) !== " ") {
                isBlank(false)
            }
        }
        setContent(e.currentTarget.value)
    }

    return (
        <div className="message-input-container">
            <form onSubmit={handleSubmit} className="message-input">
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
        </div>
    )
}

export default MessageInput;