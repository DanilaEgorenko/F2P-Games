import { Badge, Descriptions, DescriptionsProps } from "antd";
import dateToRu from "../../utils/dateToRu";

interface IDescription {
    description: string;
    platform: string;
    developer: string;
    publisher: string;
    releaseDate: string;
    genre: string;
    status: string;
}

function Description({ description, platform, developer, publisher, releaseDate, genre, status }: IDescription): JSX.Element {
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Дата релиза',
            span: 2,
            children: dateToRu(releaseDate),
        },
        {
            key: '2',
            label: 'Статус',
            children: <Badge status="processing" text={status} />,
        },
        {
            key: '3',
            label: 'Издатель',
            span: 2,
            children: publisher,
        },
        {
            key: '4',
            label: 'Разработчик',
            span: 2,
            children: developer,
        },
        {
            key: '5',
            label: 'Платформа',
            span: 2,
            children: platform,
        },
        {
            key: '6',
            label: 'Жанр',
            span: 2,
            children: genre,
        },
        {
            key: '7',
            label: 'Описание',
            children: description,
        },
    ];

    return (
        <Descriptions layout="vertical" bordered items={items} />
    );
}

export default Description;