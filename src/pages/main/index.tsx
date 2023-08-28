import { Col, Divider, Result, Row, Select, Space, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GameCard from '../../components/card';
import { KEY } from '../../keys';
import { changeCategory, changePlatform, changeSortBy } from '../../store';
import { getCategory, getPlatform, getSortBy } from '../../store/selectors';
import { fetchRetry } from '../../utils/fetchRetry';
import { genres, platforms, sorts } from './constants';
import { IGames } from './interfaces';

function Main() {
	const [games, setGames] = useState<IGames[]>([]);

	const [error, setError] = useState<string>();

	//const [category, setCategory] = useState<string | undefined>();
	//const [platform, setPlatform] = useState<string | undefined>();
	//const [sortBy, setSortBy] = useState<string | undefined>();

	const category = useSelector(getCategory);
	const platform = useSelector(getPlatform);
	const sortBy = useSelector(getSortBy);
	const dispatch = useDispatch();

	const fetchGames = () => {
		return fetchRetry(`https://free-to-play-games-database.p.rapidapi.com/api/games?${category}${platform}${sortBy}`, {
			headers: {
				'X-RapidAPI-Key': KEY,
				'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
			},
		})
			.then(res => {
				if (res?.ok) return res.json();
				throw new Error(`Ошибка ${res?.status}`);
			})
			.catch((e: Error) => {
				setError(e.message);
			});
	}

	useEffect(() => {
		fetchGames()
			.then((games: IGames[]) => {
				setGames(games);
			});
	}, []);

	// const Row = ({ index, style }: any) => {
	// 	console.log(index)
	// 	const { title, release_date, publisher, genre, thumbnail, id } = games[index];
	// 	return <Col key={title}>
	// 		<Link to={'/game/' + id}>
	// 			<GameCard
	// 				name={title}
	// 				releaseDate={release_date}
	// 				publisher={publisher}
	// 				genre={genre}
	// 				img={thumbnail}
	// 			></GameCard>
	// 		</Link>
	// 	</Col>
	// };

	if (error) return <Result
		status="error"
		title="Ошибка загрузки"
		subTitle={error}
	/>

	if (!games.length) return <Spin className="spin" size="large" />;

	return (
		<>
			<Title>Главная</Title>
			<Space wrap>
				<Select
					allowClear
					style={{ width: 200 }}
					placeholder="Жанр"
					onChange={(value: string | undefined) => dispatch(changeCategory(value))}
					options={genres}
				/>
				<Select
					allowClear
					style={{ width: 200 }}
					placeholder="Платформа"
					onChange={(value: string | undefined) => dispatch(changePlatform(value))}
					options={platforms}
				/>
				<Select
					allowClear
					style={{ width: 200 }}
					placeholder="Сортировка"
					onChange={(value: string | undefined) => dispatch(changeSortBy(value))}
					options={sorts}
				/>
			</Space >
			<Divider />
			<Row gutter={[20, 20]} justify={'center'}>
				{games.map(({ title, release_date, publisher, genre, thumbnail, id }) => {
					return <Col key={title}>
						<Link to={'/game/' + id}>
							<GameCard
								name={title}
								releaseDate={release_date}
								publisher={publisher}
								genre={genre}
								img={thumbnail}
							></GameCard>
						</Link>
					</Col>
				})}
				{/* <List
					height={150}
					itemCount={1000}
					itemSize={35}
					width={300}
				>
					{Row}
				</List> */}
			</Row >
		</>
	);
}

export default Main;
