import addNotification from "react-push-notification";

export function notify(text, success = true) {
    addNotification({
        message: text,
        theme: success ? "light" : "red"
    });
}