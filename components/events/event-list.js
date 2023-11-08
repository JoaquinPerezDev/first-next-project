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

// export async function getStatisProps() {
// 	const res = await fetch(
// 		'https://client-side-fe-default-rtdb.firebaseio.com/events'
// 	);
// 	const data = await res.json();

// 	const fetchedEvents = [];

// 	for (const key in data) {
// 		fetchedEvents.push({
// 			id: key,
// 			title: data[key].title,
// 			description: data[key].description,
// 			address: data[key].address,
// 			date: data[key].date,
// 			isFeatured: data[key].isFeatured,
// 		});
// 	}
// 	return { props: { events: fetchedEvents }, revalidate: 10 };
// }

export default EventList;
