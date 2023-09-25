import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventList from '../../components/events/event-list';
import { Fragment } from 'react';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/UI/button';
import ErrorAlert from '../../components/UI/error-alert';

function FilteredEventPage() {
	const router = useRouter();

	const filterData = router.query.slug;

	if (!filterData) {
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
		numMonth < 1
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

	const filteredEvents = getFilteredEvents({
		year: numYear,
		month: numMonth,
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

export default FilteredEventPage;
