import { useEffect, useRef, useState } from 'react';
import classes from './contact-form.module.css';
import Notification from '../ui/notification';

async function sendContactData(contactDetails) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactDetails),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!!');
    }
}

function ContactForm() {
    const [requestStatus, setRequestStatus] = useState();
    const [requestError, setRequestError] = useState();

    useEffect(() => {
        if (requestStatus === 'success' || requestStatus === 'error') {
            const timer = setTimeout(() => {
                setRequestError(null);
                setRequestStatus(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [requestStatus]);

    const nameInputRef = useRef();
    const emailInputRef = useRef();
    const messageInputRef = useRef();

    async function submitHandler(event) {
        event.preventDefault();

        setRequestStatus('pending');
        const enteredEmail = emailInputRef.current.value;
        const enteredName = nameInputRef.current.value;
        const enterdMessage = messageInputRef.current.value;

        const message = {
            name: enteredName,
            email: enteredEmail,
            message: enterdMessage
        };

        try {
            await sendContactData(message);
            setRequestStatus('success');

            emailInputRef.current.value = '';
            nameInputRef.current.value = '';
            messageInputRef.current.value = '';
        } catch (error) {
            setRequestError(error.message)
            setRequestStatus('error');
        }
    }

    let notification;

    if (requestStatus === 'pending') {
        notification = {
            status: 'pending',
            title: 'Sending Message...',
            message: 'Your message is on its way!!'
        };
    }

    if (requestStatus === 'success') {
        notification = {
            status: 'success',
            title: 'Success!!',
            message: 'Message sent successfully!!'
        };
    }

    if (requestStatus === 'error') {
        notification = {
            status: 'error',
            title: 'Error!!',
            message: requestError
        }
    }

    return (
        <section className={classes.contact}>
            <h1>How can I help you?</h1>
            <form className={classes.form} onSubmit={submitHandler}>
                <div className={classes.controls}>
                    <div className={classes.control}>
                        <label htmlFor="email">Your E-mail</label>
                        <input type="email" id='email' required ref={emailInputRef} />
                    </div>
                    <div className={classes.control}>
                        <label htmlFor="name">Your Name</label>
                        <input type="text" id='name' required ref={nameInputRef} />
                    </div>
                </div>

                <div className={classes.control}>
                    <label htmlFor="message">Your Message</label>
                    <textarea id="message" rows={5} ref={messageInputRef} required></textarea>
                </div>

                <div className={classes.actions}>
                    <button>Send Message</button>
                </div>
            </form>

            {notification && (
                <Notification
                    title={notification.title}
                    status={notification.status}
                    message={notification.message}
                />
            )}
        </section>
    )
}

export default ContactForm;