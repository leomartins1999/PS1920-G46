import React, {useState} from "react";
import {notify} from "../../components/Notifications";

function EventForm({service}) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [location, setLocation] = useState("")
    const [image, setImage] = useState(null)

    function createEvent() {
        if (name && description) {
            let formattedDate
            if (date){
                const splitDate = date.split("-")
                formattedDate = `${splitDate[0]}-${splitDate[1]}-${splitDate[2]}`;
            }

            service.createEvent({name, description, date: formattedDate, location})
                .then(res => {
                    setName("")
                    setDescription("");
                    setDate("")
                    setLocation("")
                    setImage(null)

                    notify("Successfully created event!")

                    return image ? service.updateEventImage(res.id, image) : Promise.resolve()
                })
                .catch(err => notify(err, false))
        }
    }

    return (
        <div className="card m-3">
            <div className="card-header h2">Create Event</div>
            <div className="card-body text-center">
                <input
                    placeholder={"Event name (required)"}
                    className="form-control mb-2"
                    value={name} onChange={(e) => setName(e.target.value)}
                    type="text"
                />
                <textarea
                    placeholder={"Description (required)"}
                    className="form-control mb-2"
                    value={description} onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                />
                <input
                    type="date"
                    className="form-control mb-2"
                    placeholder="optional"
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    placeholder={"Location"}
                    className="form-control mb-4"
                    value={location} onChange={(e) => setLocation(e.target.value)}
                    type="text"
                />
                <input
                    type="file"
                    className="form-control-file mr-2 text-center mb-3"
                    onChange={(e) => setImage(e.target.files[0])}
                    placeholder="Select image"
                />
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => setImage(null)}
                >Clear image
                </button>
            </div>
            <div className="card-footer text-right">
                <button onClick={createEvent} className="btn btn-primary"> Create Event</button>
            </div>
        </div>
    )

}

export default EventForm