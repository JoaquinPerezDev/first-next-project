import { getFeaturedEvents } from "../dummy-data";

function HomePage() {
  const featuredEvents = getFeaturedEvents();

	return (
		<div>
			<h1>Welcome to the Events App</h1>
      
		</div>
	);
}

export default HomePage;
