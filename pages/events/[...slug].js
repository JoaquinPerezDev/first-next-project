import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import { getAllEvents } from '../../helpers/api-util';
import { Fragment, useEffect, useState } from 'react';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/UI/button';
import ErrorAlert from '../../components/UI/error-alert';
import useSWR from 'swr';

function FilteredEventPage(props) {
	const [loadedEvents, setLoadedEvents] = useState();
	const router = useRouter();

	const filterData = router.query.slug;

	const { data, error } = useSWR('https://meetup-app-d685c-default-rtdb.firebaseio.com/events.json');

	useEffect(() => {
		if (data) {
			const events = [];

			for (const key in data) {
				events.push({
					id: key,
					...data[key],
				});
			}

			setLoadedEvents(events);
		}
	}, [data]);

	if (!loadedEvents) {
		return <p className='center'>Loading...</p>;
	}

	const filteredYear = filterData[0];
	const filteredMonth = filterData[1];

	const numYear = +filteredYear;
	const numMonth = +filteredMonth;

	if (
		isNaN(numYear) ||
		isNaN(numMonth) ||
		numYear > 2030 ||
		numYear < 2020 ||
		numMonth > 12 ||
		numMonth < 1 || 
		error
	) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>Invalid filter. Please adjust your values!</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const filteredEvents = loadedEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
		);
	});



	if (!filteredEvents || filteredEvents.length === 0) {
		return (
			<Fragment>
				<ErrorAlert>
					<p>No events found with the chosen filter</p>
				</ErrorAlert>
				<div className='center'>
					<Button link='/events'>Show All Events</Button>
				</div>
			</Fragment>
		);
	}

	const date = new Date(numYear, numMonth - 1);

	return (
		<Fragment>
			<ResultsTitle date={date} />
			<EventList items={filteredEvents} />
		</Fragment>
	);
}

export async function getFilteredEvents(dateFilter) {
	const { year, month } = dateFilter;

	const allEvents = await getAllEvents();

	let filteredEvents = allEvents.filter((event) => {
		const eventDate = new Date(event.date);
		return (
			eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
		);
	});

	return filteredEvents;
}

// export async function getServerSideProps(context) {
// 	const { params } = context;

// 	const filterData = params.slug;

// 	const filteredYear = filterData[0];
// 	const filteredMonth = filterData[1];
// 	const numYear = +filteredYear;
// 	const numMonth = +filteredMonth;

// 	if (
// 		isNaN(numYear) ||
// 		isNaN(numMonth) ||
// 		numYear > 2030 ||
// 		numYear < 2020 ||
// 		numMonth > 12 ||
// 		numMonth < 1
// 	) {
// 		return {
// 			props: { hasError: true },
// 		};
// 	}

// 	const filteredEvents = await getFilteredEvents({
// 		year: numYear,
// 		month: numMonth,
// 	});	

// 	return {
// 		props: {
// 			events: filteredEvents,
// 			date: {
// 				year: numYear,
// 				month: numMonth,
// 			},
// 		}
// 	}

// }

export default FilteredEventPage;