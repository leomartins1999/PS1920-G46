import addNotification from "react-push-notification";

export function notify(text, success) {
    addNotification({
        title: success ? "Success!" : "Error!",
        message: text,
        theme: success ? "light" : "red"
    });
}