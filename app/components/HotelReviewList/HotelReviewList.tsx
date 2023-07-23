"use client";

import { useQuery } from "@apollo/client";
import {
    GetReviewsForHotelIdDocument,
    GetReviewsForHotelIdQuery,
    GetReviewsForHotelIdQueryVariables,
} from "@/app/generated/graphql";
import { HotelReviewItem } from "@/app/components/HotelReviewItem/HotelReviewItem";

interface HotelReviewListProps {
    hotelID: string;
}

export const HotelReviewList = ({ hotelID }: HotelReviewListProps) => {
    const { loading, error, data } = useQuery(GetReviewsForHotelIdDocument, {
        variables: { id: hotelID },
    });

    const reviews = data?.hotels[0].review;

    if (!reviews) {
        return null;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            {reviews.map(review => (
                // <HotelReviewItem key={review.id} review={review} />
                <div>{JSON.stringify(review)}</div>
            ))}
        </div>
    );
};