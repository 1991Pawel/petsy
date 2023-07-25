import { MdStar, MdStarOutline } from "react-icons/md";
interface ReviewStarsProps {
    rating: number;
    handleSetStars: (star: number) => void;
}

export const ReviewStars = ({ rating, handleSetStars }: ReviewStarsProps) => {
    const totalStar = 5;
    const emptyStarsCount = totalStar - rating;
    const filledStars = Array(rating).fill(true);
    const emptyStars = Array(emptyStarsCount).fill(false);
    const stars = [...filledStars,...emptyStars];

    return (
        <div className="flex items-center">
            {stars.map((star, i) => (
                star ? (
                    <MdStar
                    size={30}
                    onClick={() => handleSetStars(i + 1)}
                    key={i}
                    className="text-yellow-500"
                />
                ) : (
                 
                    <MdStarOutline
                    size={30}
                    onClick={() => handleSetStars(i + 1)}
                    key={i}
                    className="text-yellow-500"/>
                )
            ))}
          
        </div>
    );
};
