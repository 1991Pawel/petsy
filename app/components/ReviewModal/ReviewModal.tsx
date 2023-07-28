import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
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
    const showInput = stars > 0;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            review: "",
        },
    });

    const handleSetStars = (star: number) => {
        setStars(star);
    };

    const resetFormValues = () => {
        setStars(0);
        reset();
    };

    const onSubmit: SubmitHandler<FieldValues> = async data => {
        try {
            await apolloClient.mutate<CreateHotelReviewMutationVariables>({
                mutation: CreateHotelReviewDocument,
                variables: {
                    review: {
                        rating: stars,
                        author: session.data?.user.email,
                        content: data.review,
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
            resetFormValues();
            refetchReviews();
        }
    };

    return (
        <Modal
            onClose={() => {
                onClose();
                resetFormValues();
            }}
            isOpen={isOpen}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col flex-colrounded-t justify-center relative  w-full"
            >
                <div className="p-6 border-b-[1px]">
                    <h2 className="text-center font-bold">{hotel.name}</h2>
                </div>

                <div className="p-6">
                    <p className="text-center">twoja ocena</p>
                    <div className="flex items-center justify-center mb-2">
                        <ReviewStars
                            handleSetStars={handleSetStars}
                            rating={stars}
                        />
                    </div>

                    {showInput && (
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
                    )}
                    <div className="w-full ">
                        <Button
                            disabled={loading || stars === 0}
                            type="submit"
                            label={"Dodaj komentarz"}
                        />
                    </div>
                </div>
            </form>
        </Modal>
    );
};
