import { formatDate } from "../../../utils/helpers";
import { ReviewContentFragment } from "@/app/generated/graphql";
import { RatingStars } from "../RatingStars/RatringStars";

export const HotelReviewItem = ({ review }: any) => {
    console.log(review);
    return (
        <div className="border border-gray-300 rounded p-4 mb-4 ">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <span className="text-gray-500 text-xs">
                        Author: {review.author}
                    </span>
                    <span className="text-gray-500 text-xs ml-2">
                        {formatDate(review.createdAt)}
                    </span>
                </div>
            </div>
            <p className="text-gray-600 text-sm mb-2">{review.content}</p>
            <div className="flex items-center">
                <RatingStars rating={review.rating} />
            </div>
        </div>
    );
};
