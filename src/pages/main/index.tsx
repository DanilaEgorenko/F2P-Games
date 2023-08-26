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
		})
			.then(res => res.json())
			.catch((e) => {
				console.log(e);
			});
	}

	const [genres, setGenres] = useState<any>([]);
	const [platforms, setPlatforms] = useState<any>([]);

	const sorts: any = [{ label: 'По дате выпуска', value: 'release-date' },
	{ label: 'По алфавиту', value: 'alphabetical' }, { label: 'По релевантности', value: 'relevance' }];

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
			<Space wrap>
				<Select
					allowClear
					style={{ width: 300 }}
					placeholder="Жанр"
					onChange={handleChange}
					options={genres}
				/>
				<Select
					allowClear
					style={{ width: 300 }}
					placeholder="Платформа"
					onChange={handleChange}
					options={platforms}
				/>
				<Select
					allowClear
					style={{ width: 300 }}
					placeholder="Сортировка"
					onChange={handleChange}
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
