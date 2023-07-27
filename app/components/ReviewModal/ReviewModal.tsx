import { useForm, FieldValues } from "react-hook-form";
import { Modal } from "../Modal/Modal";
import { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { GetHotelByIdQuery } from "@/app/generated/graphql";
import {
    CreateHotelReviewMutationVariables,
    CreateHotelReviewDocument,
} from "@/app/generated/graphql";
import { apolloClient } from "@/app/graphql/ApolloClient";
import { useSession } from "next-auth/react";
import { ReviewStars } from "../ReviewStars/ReviewStars";
type HotelType = GetHotelByIdQuery["hotel"];
interface ReviewModalProps {
    isOpen?: boolean;
    onClose: () => void;
    hotel: HotelType;
    refetchReviews: () => void;
}

interface addReviewType {
    onClose: ReviewModalProps["onClose"];
}

export const ReviewModal = ({
    isOpen,
    onClose,
    hotel,
    refetchReviews,
}: ReviewModalProps) => {
    if (!hotel) return null;
    const [stars, setStars] = useState(0);
    const [loading, setLoading] = useState(false);
    const session = useSession();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            review: "",
        },
    });

    const handleSetStars = (star: number) => {
        setStars(star);
    };
    const addReview = async ({ review }: any) => {
        try {
            await apolloClient.mutate<CreateHotelReviewMutationVariables>({
                mutation: CreateHotelReviewDocument,
                variables: {
                    review: {
                        rating: stars,
                        author: session.data?.user.email,
                        content: review,
                        hotel: {
                            connect: {
                                id: hotel.id,
                            },
                        },
                    },
                },
            });
        } catch (error) {
            console.error("Wystąpił błąd podczas dodawania recenzji:", error);
        } finally {
            onClose();
            setStars(0);
            refetchReviews();
        }
    };

    // const onSubmit: SubmitHandler<FieldValues> = async data => {
    //     try {
    //         const response = await fetch("/api/signup", {
    //             method: "POST",
    //             body: JSON.stringify({
    //                 data,
    //             }),
    //         });
    //         if (!response.ok) {
    //             alert("Coś poszło nie tak");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <form
                onSubmit={handleSubmit(addReview)}
                className="flex flex-col flex-colrounded-t justify-center relative  w-full"
            >
                <div className="p-6 border-b-[1px]">
                    <h2 className="text-center font-bold">{hotel.name}</h2>
                </div>

                <div className="p-6">
                    <div className="mb-5">
                        <Input
                            id="review"
                            label="Twój komentarz"
                            disabled={loading}
                            errors={errors}
                            register={register}
                            required
                        />
                    </div>
                    twoja ocena
                    <ReviewStars
                        handleSetStars={handleSetStars}
                        rating={stars}
                    />
                    <div className="w-full ">
                        <Button
                            disabled={loading}
                            onClick={handleSubmit(addReview)}
                            label={"Dodaj komentarz"}
                        />
                    </div>
                </div>
            </form>
        </Modal>
    );
};
