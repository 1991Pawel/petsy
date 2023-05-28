"use client";
import { gql, useQuery } from "@apollo/client";
import { Container } from "../.././components/Container/Container";
import { GetHotelByIdDocument } from "@/app/generated/graphql";

export default function Page({ params }: any) {
    const { loading, error, data } = useQuery(GetHotelByIdDocument, {
        variables: { id: params.id },
    });
    if (!data || !data.hotel) {
        return null;
    }
    const hotel = data.hotel;

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <Container>
            <div className="max-w-xl mx-auto">
                <div className="flex justify-center">
                    <img
                        src={hotel.image?.url}
                        alt="Hotel Image"
                        className="w-full h-96 object-cover"
                    />
                </div>
                <div className="px-6 py-4">
                    <h2 className="text-3xl font-semibold mb-2">
                        {hotel.name}
                    </h2>
                    <p className="text-gray-700 text-lg mb-4">
                        {hotel.description}
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                        {hotel.address}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">ID: {hotel.id}</p>
                    <button
                        onClick={() => console.log("Zarezerwuj", hotel.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Zarezerwuj
                    </button>
                </div>
            </div>
        </Container>
    );
}
