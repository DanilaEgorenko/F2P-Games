import { Button, Divider, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CarouselList from "../../components/carousel";
import Description from "../../components/description";
import Requirements from "../../components/requirements";

function Game() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [game, setGame] = useState<any>();

  const fetchGame = () => {
    return fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, {
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
    fetchGame()
      .then((data: any) => {
        setGame(data);
        console.log(data);
      });
  }, []);

  if (!game) return <Spin size="large" />;

  const photos = [game.thumbnail, ...game.screenshots.map((el: any) => el.image)]

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