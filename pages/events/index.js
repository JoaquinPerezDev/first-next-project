import { Fragment } from 'react';
import { getAllEvents } from '../../dummy-data';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/events-search';

function AllEventsPage() {
	const events = getAllEvents();
	const router = useRouter();
	function findEvents(year, month) {
		const fullPath = `/events/${year}/${month}`;

		router.push(fullPath);
	}
	return (
		<Fragment>
			<EventsSearch onSearch={findEvents} />
			<EventList items={events} />
		</Fragment>
	);
}

export default AllEventsPage;
