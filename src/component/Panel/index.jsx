import React, { useEffect, useState, useRef } from 'react';
import { Hidden, Grid, Slide, ImageList } from '@material-ui/core/';
import PropTypes from 'prop-types';
import Movie from '../Movie';
import Backdrop from '../Backdrop';
import Carousel from '../Carousel';
import useIntersect from '../../hooks/useIntersect';
import useFetch from '../../hooks/useFetch';
import { Link } from 'react-router-dom';
import useStyles from './styles';

const Panel = ({ panel, group }) => {
	const classes = useStyles();
	const ITEM_WIDTH = 150;
	const ITEM_SELECTED_WIDTH = 200;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [activeItem, setActiveItem] = useState(null);

	const target = useRef(null);
	const inView = useIntersect(target, { once: true, threshold: 0.7 });
	const { data, error, isLoading } = useFetch(
		`/remote/test/panel?panel=${panel}&group=${group}`
	);

	const handleCurrentIndexChange = (index) => {
		setCurrentIndex(index);
	};

	const handleActive = (item) => {
		setActiveItem(item);
	};

	// const handleLinkClick = () => {
	// 	if
	// };

	return (
		<Slide in mountOnEnter>
			<div className={classes.root} ref={target} data-test={panel}>
				<Carousel
					gap={12}
					movementWidth={ITEM_SELECTED_WIDTH / 2}
					handleActiveItem={handleCurrentIndexChange}
					itemWidth={ITEM_WIDTH}
					selectedItemWidth={ITEM_SELECTED_WIDTH}
				>
					{data &&
						data.results.map((item, index) => (
							<Link to={`/movie/${item.id}`}>
								<Movie
									item={item}
									isActive={index == currentIndex}
									handleActive={handleActive}
									index={index}
									className={classes.test}
								/>
							</Link>
						))}
				</Carousel>
				{activeItem && (
					<Hidden smUp>
						<Backdrop
							image={`https://image.tmdb.org/t/p/w780${activeItem.backdrop_path}`}
						/>
					</Hidden>
				)}
			</div>
		</Slide>
	);
};

Panel.propTypes = {
	panel: PropTypes.string,
	group: PropTypes.string,
};

export default Panel;
