import { Col, Row } from 'antd';
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

	useEffect(() => {
		fetchGames()
			.then((games: any) => setGames(games));
	}, []);

	if (!games) return <div>Загружаю игры...</div>;

	return (
		<>
			<h1>Главная</h1>
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
