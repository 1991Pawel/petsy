import { Hotel } from "@/app/generated/graphql";
import { truncateDescriptions } from "../../../utils/helpers";

interface HotelCardProps {
    image: Pick<Hotel["image"], "url">;
    description: Hotel["description"];
    name: Hotel["name"];
    address: Hotel["address"];
    id: string;
}
export const HotelCard = ({
    image,
    description,
    name,
    address,
    id,
}: HotelCardProps) => {
    return (
        <div
            onClick={() => console.log(id)}
            className="max-w-xs bg-white rounded overflow-hidden shadow-lg"
        >
            <img
                src={image?.url}
                alt="Hotel Image"
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{name}</h2>
                <p className="text-gray-700 text-sm mb-4">
                    {truncateDescriptions(description, 150)}
                </p>
                <p className="text-gray-600 text-xs">{address}</p>
            </div>
        </div>
    );
};
