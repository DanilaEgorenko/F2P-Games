import { Col, Divider, Row, Select, Space, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GameCard from "../../components/card";
import { genres, platforms, sorts } from './constants';

function Main() {
	const [games, setGames] = useState([]);

	const [category, setCategory] = useState<string | undefined>();
	const [platform, setPlatform] = useState<string | undefined>();
	const [sortBy, setSortBy] = useState<string | undefined>();

	const getCategory: string = category ? '&category=' + category : '';
	const getPlatform: string = platform ? '&platform=' + platform : '';
	const getSortBy: string = sortBy ? '&sort-by=' + sortBy : '';

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const fetchGames = () => {
		return fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?${getPlatform}${getCategory}${getSortBy}`, {
			headers: {
				'X-RapidAPI-Key': 'ddd1992d06msh69dccc24485ab56p11eed8jsn63b3f65c7074',
				'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
			},
		})
			.then(res => res.json())
			.catch((e) => {
				console.log(e);
			});
	}

	useEffect(() => {
		fetchGames()
			.then((games: any) => {
				setGames(games);
			});
	}, [fetchGames]);

	if (!games.length) return <Spin size="large" />;

	return (
		<>
			<Title>Главная</Title>
			<Space wrap>
				<Select
					allowClear
					style={{ width: 200 }}
					placeholder="Жанр"
					onChange={(value: string | undefined) => setCategory(value)}
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
