import { Carousel, Image } from "antd";

interface ICarouselList {
    screenshots: string[];
}

function CarouselList({ screenshots }: ICarouselList): JSX.Element {
    return (
        <>
            <Carousel dotPosition="left" effect="fade" autoplay>
                {screenshots.map((image: string) => {
                    return <Image
                        height={400}
                        key={image}
                        src={image}
                    />
                })}
            </Carousel>
        </>
    );
}

export default CarouselList;