"use client";
import { GetHotelsQuery, GetHotelsDocument } from "@/app/generated/graphql";
import { useQuery } from "@apollo/client";

interface HotelCardProps {
    id: string;
    name?: string | null;
    address?: string | null;
    description?: string | null;
    image?: {
        __typename?: "Asset";
        url: string;
    } | null;
}

const HotelCard = ({
    image,
    description,
    name,
    address,
    id,
}: HotelCardProps) => {
    return (
        <div className="max-w-xs bg-white rounded overflow-hidden shadow-lg">
            <img
                src={image?.url}
                alt="Hotel Image"
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{name}</h2>
                <p className="text-gray-700 text-sm mb-4">{description}</p>
                <p className="text-gray-600 text-xs">{address}</p>
            </div>
        </div>
    );
};

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
