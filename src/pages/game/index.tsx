import { Button, Divider, Result, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CarouselList from "../../components/carousel";
import Description from "../../components/description";
import Requirements from "../../components/requirements";
import { fetchGame, getError, getGame, isLoading } from "../../store/gameSlice";
import { AppDispatch, RootState } from "../../store/store";
import { IGame, IScreenshots } from "./interfaces";

function Game() {
  const useAppDispatch: () => AppDispatch = useDispatch
  const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  const game: IGame = useAppSelector(getGame);
  const error: Error | null = useAppSelector(getError);
  const loading: boolean = useAppSelector(isLoading);

  useEffect(() => {
    dispatch(fetchGame(id));
  }, [id]);

  if (error) return <Result
    status="error"
    title="Ошибка загрузки"
    subTitle={error.message}
  />

  if (!game || loading) return <Spin className="spin" size="large" />;

  const photos: string[] = [game.thumbnail, ...game.screenshots.map((el: IScreenshots) => el.image)]

  return (
    <>
      <Button onClick={() => navigate('/')}> Назад</Button >
      <Title>{game.title}</Title>
      <CarouselList screenshots={photos}></CarouselList>
      <Divider />
      <Description description={game.description} platform={game.platform} developer={game.developer} publisher={game.publisher} releaseDate={game.release_date} genre={game.genre} status={game.status}></Description>
      <Divider />
      <Requirements graphics={game.minimum_system_requirements.graphics} memory={game.minimum_system_requirements.memory} os={game.minimum_system_requirements.os} processor={game.minimum_system_requirements.processor} storage={game.minimum_system_requirements.storage}></Requirements>
    </>
  );
}

export default Game;

