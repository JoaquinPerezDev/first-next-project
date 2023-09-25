import classes from './logistics-item.module.css';

function LogisticsItem(props) {
	const { icon: Icon } = props;

	return (
		<div>
			<li className={classes.item}>
				<span className={classes.icon}>
					<Icon />
				</span>
				<span className={classes.content}>{props.children}</span>
			</li>
		</div>
	);
}

export default LogisticsItem;
