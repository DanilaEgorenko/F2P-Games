import { Badge, Descriptions, DescriptionsProps } from "antd";
import dateToRu from "../../utils/dateToRu";

function Description({ title, description, platform, developer, publisher, releaseDate, genre, status }: any): JSX.Element {
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
        <Descriptions title={title} layout="vertical" bordered items={items} />
    );
}

export default Description;