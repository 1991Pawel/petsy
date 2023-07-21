import { MdStar } from "react-icons/md";
interface RatingStarsProps {
    rating: number;
}

export const RatingStars = ({ rating }: RatingStarsProps) => {
    const stars = Array(rating).fill(null);
    return (
        <div className="flex items-center">
            {stars.map((_, i) => (
                <MdStar key={i} className="text-yellow-500" />
            ))}
        </div>
    );
};
