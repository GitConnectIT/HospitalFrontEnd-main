import { ListGroup, ListGroupItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const messages = [
  {
    id: 1,
    iconclass:<FontAwesomeIcon icon={"fa-solid fa-link" as any} size="lg" />,
    iconbg: 'warning',
    title: 'Launch Admin',
    desc: 'Just see my new admin!',
    time: '9:30 AM',
  },
  {
    id: 2,
    iconclass: <FontAwesomeIcon icon={"fa-regular fa-calendar" as any} size="lg"/>,
    iconbg: 'success',
    title: 'Event Today',
    desc: 'Just a reminder that you have event.',
    time: '9:10 PM',
  },
  {
    id: 3,
    iconclass: <FontAwesomeIcon icon={"fa-solid fa-gear" as any} size="lg"/>,
    iconbg: 'info',
    title: 'Settings',
    desc: 'You can customize this template as you want.',
    time: '9:08 AM',
  },
  {
    id: 4,
    iconclass: <FontAwesomeIcon icon={"fa-regular fa-user" as any}  size="lg"/>,
    iconbg: 'danger',
    title: 'Check Email',
    desc: 'Just check my admin!',
    time: '9:02 AM',
  },
];

const NotificationDD = () => {
  return (
    <div>
      <ListGroup flush>
        {messages.map((msg) => (
          <ListGroupItem action key={msg.id} tag="a" href="/">
            <div className="d-flex align-items-center gap-3 py-2">
              <div
                className={`circle-box md-box flex-shrink-0 bg-light-${msg.iconbg} text-${msg.iconbg}`}
              >
                {msg.iconclass}
              </div>
              <div className="col-9">
                <h5 className="mb-0 fw-bold">{msg.title}</h5>
                <span className="text-muted text-truncate d-block">{msg.desc}</span>
                <small className="text-muted">{msg.time}</small>
              </div>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

export default NotificationDD;
