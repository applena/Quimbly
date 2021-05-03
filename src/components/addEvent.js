import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker'
import "react-datepicker/dist/react-datepicker.css";

import DateTimePicker from 'react-datetime-picker';

function AddEvent() {
  const [show, setShow] = useState(false);
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setEventLocation] = useState('');
  const [description, setDescription] = useState('');
  const [startTimeZone, setStartTimeZone] = useState('');
  const [endTimeZone, setEndTimeZone] = useState('');
  const [value, setValue] = useState(new Date());

  const handleClose = () => setShow(false);

  const saveEvent = () => {
    // const newEvent = {
    //   eventName,
    //   date: date, Sun Mar 14 2021 17:37:28 GMT-0700
    //   startTime, "08:00"
    //   endTime,
    //   startTimeZone: date.toString().substring(33, 60),
    // }
    console.log(date.toISOString(), date);
    const event = {
      'summary': eventName,
      'location': location,
      'description': description,
      'start': {
        'dateTime': '2015-05-28T09:00:00-07:00',
        'timeZone': date.toString().substring(33, 60)
      },
      'end': {
        'dateTime': '2015-05-28T17:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      },
      'recurrence': [
        'RRULE:FREQ=DAILY;COUNT=2'
      ],
      'attendees': [
        {'email': 'lpage@example.com'},
        {'email': 'sbrin@example.com'}
      ],
      'reminders': {
        'useDefault': false,
        'overrides': [
          {'method': 'email', 'minutes': 24 * 60},
          {'method': 'popup', 'minutes': 10}
        ]
      }
    };
    
    // var request = gapi.client.calendar.events.insert({
    //   'calendarId': 'primary',
    //   'resource': event
    // });
    
    // request.execute(function(event) {
    //   appendPre('Event created: ' + event.htmlLink);
    // });
  }


  return(
    <>
      <button onClick={() => setShow(true)}>Add Event To MyQ</button>

      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Add Event</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <Form.Group controlId="formEventName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control onChange={(e) => setEventName(e.target.value)} type="text" placeholder="Enter event" />
              </Form.Group>

              <Form.Group controlId="formEventName">
                <Form.Label>Location</Form.Label>
                <Form.Control onChange={(e) => setEventLocation(e.target.value)} type="text" placeholder="Location" />
              </Form.Group>

              <Form.Group controlId="formEventName">
                <Form.Label>Description</Form.Label>
                <Form.Control onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Description" />
              </Form.Group>

              {/* <Form.Group controlId="formDate">
                <label>Date</label>
                <DatePicker selected={date} onChange={date => setDate(date)} />
              </Form.Group>
              <Form.Group controlId="formStartTime">
                <label>Start Time</label>
                <TimePicker
                  onChange={setStartTime}
                  value={startTime}
                  disableClock={true}
                />
              </Form.Group>
              <Form.Group controlId="formStartTime">
                <label>End Time</label>
                <TimePicker
                  onChange={setEndTime}
                  value={endTime}
                  disableClock={true}
                /> */}
              {/* </Form.Group> */}
              <Form.Group controlId="formDate">
                <label>Date</label>
                <DateTimePicker
                  onChange={setValue}
                  value={value}
                />
              </Form.Group>
              <Form.Group controlId="formRecurringEvent">
                <Form.Check type="checkbox" label="Recurring Event" />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={() => setShow(false)} variant="secondary">Close</Button>
            <Button onClick={saveEvent} variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </>
  )
}

export default AddEvent;