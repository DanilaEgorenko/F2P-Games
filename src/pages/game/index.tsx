import { Button, Divider, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarouselList from "../../components/carousel";
import Description from "../../components/description";
import Requirements from "../../components/requirements";
import { KEY } from "../../keys";
import { IGame, IScreenshots } from "./interfaces";

function Game() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState<IGame>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchGame = () => {
    return fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, {
      headers: {
        'X-RapidAPI-Key': KEY,
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      },
    })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error(`Ошибка ${res.status}`);
      })
  }

  useEffect(() => {
    fetchGame()
      .then((data: IGame) => {
        setGame(data);
      });
  }, [fetchGame]);

  if (!game) return <Spin className="spin" size="large" />;

  const photos = [game.thumbnail, ...game.screenshots.map((el: IScreenshots) => el.image)]

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