import { Carousel, Image } from "antd";

function CarouselList({ screenshots }: any): JSX.Element {
    console.log(screenshots)
    return (
        <>
            <Carousel dotPosition="left" effect="fade" autoplay>
                {screenshots.map((image: any) => {
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