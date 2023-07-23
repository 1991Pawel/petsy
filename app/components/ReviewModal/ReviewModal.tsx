import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Modal } from "../Modal/Modal";
import { useEffect, useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import {
    CreateHotelReviewMutationVariables,
    CreateHotelReviewDocument,
} from "@/app/generated/graphql";
import { apolloClient } from "@/app/graphql/ApolloClient";
import { useSession } from "next-auth/react";

interface ReviewModalProps {
    isOpen?: boolean;
    onClose: () => void;
    hotelName: string;
    hotel: any;
}

export const ReviewModal = ({ isOpen, onClose, hotel }: ReviewModalProps) => {
    const [stars, setStars] = useState(0);
    const [loading, setLoading] = useState(false);
    const session = useSession();
    console.log(session.data?.user.email, "session in review modal");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>();

    // const addReview = async ({ review }: any) => {
    const addReview = async () => {
        const data =
            await apolloClient.mutate<CreateHotelReviewMutationVariables>({
                mutation: CreateHotelReviewDocument,
                variables: {
                    review: {
                        rating: 5,
                        author: session.data?.user.email,
                        content: "",
                        hotel: {
                            connect: {
                                id: hotel.id,
                            },
                        },
                    },
                },
            });
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
