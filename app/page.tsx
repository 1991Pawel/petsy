import Image from "next/image";
import { Container } from "./components/Container/Container";
import { HotelList } from "./components/HotelList/HotelList";

export default function Home() {
    return (
        <div className="pt-[100px]">
            <Container>
                <HotelList />
            </Container>
        </div>
    );
}
