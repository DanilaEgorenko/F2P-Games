import { Col, Divider, Row, Select, Space, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GameCard from "../../components/card";
import { KEY } from '../../keys';
import { genres, platforms, sorts } from './constants';
import { IGames } from './interfaces';

function Main() {
	const [games, setGames] = useState<IGames[]>([]);

	const [error, setError] = useState<string>();

	//const [category, setCategory] = useState<string | undefined>();
	const [platform, setPlatform] = useState<string | undefined>();
	const [sortBy, setSortBy] = useState<string | undefined>();


	// const category = useSelector((state: any) => state.category);
	// console.log(category)
	//const dispatch = useDispatch();

	//const getCategory: string = category ? '&category=' + category : '';
	const getPlatform: string = platform ? '&platform=' + platform : '';
	const getSortBy: string = sortBy ? '&sort-by=' + sortBy : '';

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchGames = () => {
		return fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?${getPlatform}${getSortBy}`, {
			headers: {
				'X-RapidAPI-Key': KEY,
				'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
			},
		})
			.then(res => {
				if (res.ok) return res.json();
				//throw new Error(`Ошибка ${res.status}`);
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
	}, [fetchGames]);

	// if (error) return <Result
	// 	status="error"
	// 	title="Ошибка загрузки"
	// 	subTitle={error}
	// />

	if (!games.length) return <Spin className="spin" size="large" />;

	return (
		<>
			<Title>Главная</Title>
			<Space wrap>
				<Select
					allowClear
					style={{ width: 200 }}
					placeholder="Жанр"
					onChange={(value: string | undefined) => value}
					options={genres}
				/>
				<Select
					allowClear
					style={{ width: 200 }}
					placeholder="Платформа"
					onChange={(value: string | undefined) => setPlatform(value)}
					options={platforms}
				/>
				<Select
					allowClear
					style={{ width: 200 }}
					placeholder="Сортировка"
					onChange={(value: string | undefined) => setSortBy(value)}
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
			</Row >
		</>
	);
}

export default Main;
