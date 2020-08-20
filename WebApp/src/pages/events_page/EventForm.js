import React, {useState} from "react";
import {notify} from "../../components/Notifications";
import ImageForm from "../../components/ImageForm";

function EventForm({service}) {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [location, setLocation] = useState("")
    const [image, setImage] = useState(null)

    function createEvent() {
        if(!name || !description){
            notify('Events need to have a description and a name.', false)
            return;
        }

        service.createEvent({name, description, date, time, location})
            .then(res => {
                notify('Successfully created event!')
                setName('')
                setDescription('')
                setLocation('')
                setImage(null)

                return image ? service.updateEventImage(res.id, image) : Promise.resolve()
            })
            .catch(err => notify(err, false))
    }

    return (
        <div className="card border-primary m-3">
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
                <div className='d-flex mb-2'>
                    <input
                        type="date"
                        className="form-control mr-1 text-center"
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <input
                        type='time'
                        className='form-control text-center'
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>
                <input
                    placeholder={"Location"}
                    className="form-control mb-4"
                    value={location} onChange={(e) => setLocation(e.target.value)}
                    type="text"
                />
                <ImageForm image={image} setImage={setImage}/>
            </div>
            <div className="card-footer text-right">
                <button onClick={createEvent} className="btn btn-primary"> Create Event</button>
            </div>
        </div>
    )

}

export default EventForm