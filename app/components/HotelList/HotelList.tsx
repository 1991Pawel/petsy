"use client";
import { HotelCard } from "./HotelCard";
import { GetHotelsQuery, GetHotelsDocument } from "@/app/generated/graphql";
import { useQuery } from "@apollo/client";

export const HotelList = () => {
    const { loading, error, data } =
        useQuery<GetHotelsQuery>(GetHotelsDocument);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }
    if (!data) {
        return null;
    }

    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.hotels.map(hotel => (
                    <HotelCard
                        id={hotel.id}
                        key={hotel.id}
                        image={hotel.image}
                        description={hotel.description}
                        name={hotel.name}
                        address={hotel.address}
                    />
                ))}
            </div>
        </div>
    );
};
