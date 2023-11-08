import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../dummy-data';

function HomePage(props) {

	return (
		<div>
			<h1>Welcome to the Events App</h1>
			<EventList items={props.events} />
		</div>
	);
}

export async function getStaticProps() {
	const featuredEvents = await getFeaturedEvents();

	return {
		props: {
			events: featuredEvents,
		},
		revalidate: 10,
	};
}

export default HomePage;
