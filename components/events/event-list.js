import EventItem from './event-item';

function EventList(props) {
const { items } = props;

return <ul>
  <li>
  {items.map(event => <li></li>)}
  </li>
</ul>
}

export default EventList;