"use client";

import { useQuery } from "@apollo/client";
import { ReviewContentFragment } from "@/app/generated/graphql";
import { HotelReviewItem } from "@/app/components/HotelReviewItem/HotelReviewItem";

interface HotelReviewListProps {
    reviews: ReviewContentFragment[];
}

export const HotelReviewList = ({ reviews }: HotelReviewListProps) => {
    return (
        <div>
            {reviews.map(review => (
                <HotelReviewItem key={review.id} review={review} />
            ))}
        </div>
    );
};
