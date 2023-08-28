import { Col, Divider, Result, Row, Select, Space, Spin } from 'antd';
import Title from 'antd/es/typography/Title';
import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import GameCard from '../../components/card';
import { changeCategory, changePlatform, changeSortBy, fetchGames, getError, getGames, isLoading } from '../../store/gamesSlice';
import { AppDispatch, RootState } from '../../store/store';
import { genres, platforms, sorts } from './constants';
import { IGames } from './interfaces';

function Main() {
	const useAppDispatch: () => AppDispatch = useDispatch
	const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
	const dispatch = useAppDispatch();

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

	const games: IGames[] = useAppSelector(getGames);
	const error: Error | null = useAppSelector(getError);
	const loading: boolean = useAppSelector(isLoading);

	useEffect(() => {
		dispatch(fetchGames())
	}, [])

	if (error) return <Result
		status="error"
		title="Ошибка загрузки"
		subTitle={error.message}
	/>

	return (
		<>
			<Title>Главная</Title>
			<Space wrap>
				<Select
					allowClear
					style={{ width: 200 }}
					placeholder="Жанр"
					onChange={(value: string | undefined) => {
						dispatch(changeCategory(value))
						dispatch(fetchGames())
					}}
					options={genres}
				/>
				<Select
					allowClear
					style={{ width: 200 }}
					placeholder="Платформа"
					onChange={(value: string | undefined) => {
						dispatch(changePlatform(value))
						dispatch(fetchGames())
					}}
					options={platforms}
				/>
				<Select
					allowClear
					style={{ width: 200 }}
					placeholder="Сортировка"
					onChange={(value: string | undefined) => {
						dispatch(changeSortBy(value))
						dispatch(fetchGames())
					}}
					options={sorts}
				/>
			</Space >
			<Divider />
			{loading && <Spin className="spin" size="large" />}
			{!loading && <Row gutter={[20, 20]} justify={'center'}>
				{games.map(({ title, release_date, publisher, genre, thumbnail, id }: IGames) => {
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
			</Row >}
		</>
	);
}

export default Main;
