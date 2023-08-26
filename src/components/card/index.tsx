import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import dateToRu from "../../utils/dateToRu";

interface IGameCard {
	name: string;
	releaseDate: string;
	publisher: string;
	genre: string;
	img: string;
}

function GameCard({ name, releaseDate, publisher, genre, img }: IGameCard): JSX.Element {
	return (
		<Card
			hoverable
			style={{ width: 300 }}
			cover={<img alt="img" src={img} />}
		>
			<Meta title={name} />
			<p>{publisher}</p>
			<p>{dateToRu(releaseDate)}</p>
			<p>{genre}</p>
		</Card>
	);
}

export default GameCard;