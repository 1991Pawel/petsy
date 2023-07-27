"use client";
import { useQuery } from "@apollo/client";
import { Container } from "../.././components/Container/Container";
import {
    GetHotelByIdDocument,
    GetHotelByIdQuery,
    GetReviewsForHotelIdDocument,
    GetReviewsForHotelIdQuery,
} from "@/app/generated/graphql";
import { HotelReviewList } from "@/app/components/HotelReviewList/HotelReviewList";
import { ReviewModal } from "@/app/components/ReviewModal/ReviewModal";
import { useState } from "react";

type PageProps = {
    params: {
        id: string;
    };
};

export default function Page({ params }: PageProps) {
    const { id: hotelID } = params;
    const [reviewModal, setReviewModal] = useState(false);

    const {
        loading: reviewsLoading,
        error: reviewsError,
        data: reviewsData,
        refetch: refetchReviews,
    } = useQuery<GetReviewsForHotelIdQuery>(GetReviewsForHotelIdDocument, {
        variables: { id: hotelID, stage: "draft" },
    });
    const reviews = reviewsData?.hotel?.review;

    const { loading, error, data } = useQuery<GetHotelByIdQuery>(
        GetHotelByIdDocument,
        {
            variables: { id: hotelID },
        }
    );

    if (!data) {
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
                        src={hotel?.image?.url}
                        alt="Hotel Image"
                        className="w-full h-96 object-cover"
                    />
                </div>
                <div className="px-6 py-4">
                    <h2 className="text-3xl font-semibold mb-2">
                        {hotel?.name}
                    </h2>
                    <p className="text-gray-700 text-lg mb-4">
                        {hotel?.description}
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                        {hotel?.address}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                        ID: {hotel?.id}
                    </p>
                </div>
                {reviews && <HotelReviewList reviews={reviews} />}
                <ReviewModal
                    refetchReviews={refetchReviews}
                    hotel={hotel}
                    onClose={() => setReviewModal(false)}
                    isOpen={reviewModal}
                />

                <button
                    onClick={() => setReviewModal(true)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Dodaj komentarz
                </button>
            </div>
        </Container>
    );
}
