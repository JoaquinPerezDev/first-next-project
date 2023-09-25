import EventItem from './event-item';
import classes from './event-list.module.css';

function EventList(props) {
	const { items } = props;

	return (
		<div>
			<ul className={classes.list}>
				<ul>
					{items.map((event) => (
						<EventItem
							key={event.id}
							id={event.id}
							title={event.title}
							address={event.address}
							date={event.date}
							image={event.image}
						/>
					))}
				</ul>
			</ul>
		</div>
	);
}

export default EventList;
