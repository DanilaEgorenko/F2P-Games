import { Col, Divider, Row, Select, Space, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GameCard from "../../components/card";

function Main() {
	const [games, setGames] = useState([]);

	const fetchGames = () => {
		return fetch('https://free-to-play-games-database.p.rapidapi.com/api/games', {
			headers: {
				'X-RapidAPI-Key': 'ddd1992d06msh69dccc24485ab56p11eed8jsn63b3f65c7074',
				'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
			},
			method: 'GET',
		})
			.then(res => res.json())
			.catch((e) => {
				console.log(e);
			});
	}

	const [ganres, setGenres] = useState<any>([]);
	const [platforms, setPlatforms] = useState<any>([]);

	useEffect(() => {
		fetchGames()
			.then((games: any) => {
				setGames(games);

				const genresSet = new Set<string>();
				games.map(({ genre }: any) => genresSet.add(genre.trim()));
				setGenres(Array.from(genresSet, (el: string) => ({ label: el, value: el })))

				const platformsSet = new Set<string>();
				games.map(({ platform }: any) => platformsSet.add(platform.trim()));
				setPlatforms(Array.from(platformsSet, (el: string) => ({ label: el, value: el })))
			});
	}, []);

	if (!games.length) return <Spin size="large" />;

	const handleChange = (value: string[]) => {
		console.log(`selected ${value}`);
	};

	return (
		<>
			<Title>Главная</Title>
			<Space>
				<Select
					allowClear
					style={{ width: 300 }}
					placeholder="Выберите жанр"
					onChange={handleChange}
					options={ganres}
				/>
				<Select
					allowClear
					style={{ width: 300 }}
					placeholder="Выберите платформу"
					onChange={handleChange}
					options={platforms}
				/>
			</Space >
			<Divider />
			<Row gutter={[20, 20]} justify={'center'}>
				{games.map(({ title, release_date, publisher, genre, thumbnail, id }) => {
					return <Link to={'/game/' + id}>
						<Col key={title}>
							<GameCard
								name={title}
								releaseDate={release_date}
								publisher={publisher}
								genre={genre}
								img={thumbnail}
							></GameCard>
						</Col>
					</Link>
				})}
			</Row >
		</>
	);
}

export default Main;
