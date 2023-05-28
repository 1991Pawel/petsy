"use client";
import { useQuery } from "@apollo/client";
import { Container } from "../.././components/Container/Container";
import { GetHotelByIdDocument } from "@/app/generated/graphql";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdStar, MdStarHalf } from "react-icons/md";

interface ConntentProps {
    content: string | null | undefined;
    created: string;
    rating: number;
    author: string | null | undefined;
}

interface RatingStarsProps {
    rating: number;
}

const RatingStars = ({ rating }: RatingStarsProps) => {
    const stars = Array(rating).fill(null);
    return (
        <div className="flex items-center">
            {stars.map((_, i) => (
                <MdStar key={i} className="text-yellow-500" />
            ))}
        </div>
    );
};

const Comment = ({ content, created, rating, author }: ConntentProps) => {
    const createdDate = new Date(created);
    const formattedDate = new Intl.DateTimeFormat("pl-Pl").format(createdDate);
    return (
        <div className="border border-gray-300 rounded p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
                <div>
                    <span className="text-gray-500 text-xs">
                        Author: {author}
                    </span>
                    <span className="text-gray-500 text-xs ml-2">
                        {formattedDate}
                    </span>
                </div>
                <button className="bg-blue-500 text-white rounded px-4 py-2 text-sm">
                    Follow
                </button>
            </div>
            <p className="text-gray-600 text-sm mb-2">{content}</p>
            <div className="flex items-center">
                <RatingStars rating={rating} />
                <p className="text-gray-500 text-xs ml-2">{rating}</p>
            </div>
        </div>
    );
};

export default function Page({ params }: any) {
    const { loading, error, data } = useQuery(GetHotelByIdDocument, {
        variables: { id: params.id },
    });
    if (!data || !data.hotel || !data.reviews) {
        return null;
    }
    const hotel = data.hotel;
    const reviews = data.reviews;

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    console.log(data, "d");
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
            {reviews.map(review => (
                <Comment
                    key={review.id}
                    created={review.createdAt}
                    content={review.content}
                    rating={review.rating}
                    author={review.author}
                />
            ))}
        </Container>
    );
}
