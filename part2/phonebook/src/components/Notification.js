// Do not show null message
// Note: Empty string will show
const Notification = ({ message }) => {
    if (message === null) return;
    return <div className="success">{message}</div>;
};

export default Notification;
