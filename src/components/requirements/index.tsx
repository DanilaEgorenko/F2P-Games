import { Descriptions, DescriptionsProps } from "antd";

interface IRequirements {
    graphics: string;
    memory: string;
    os: string;
    processor: string;
    storage: string;
}

function Requirements({ graphics, memory, os, processor, storage }: IRequirements): JSX.Element {
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Графика',
            span: 3,
            children: graphics,
        },
        {
            key: '2',
            label: 'Оперативная память',
            children: memory,
        },
        {
            key: '3',
            label: 'ОС',
            span: 2,
            children: os,
        },
        {
            key: '4',
            label: 'Процессор',
            span: 2,
            children: processor,
        },
        {
            key: '5',
            label: 'Память',
            children: storage,
        },
    ];

    return (
        <Descriptions title="Технические характеристики" layout="vertical" bordered items={items} />
    );
}

export default Requirements;