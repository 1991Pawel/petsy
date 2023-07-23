import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Modal } from "../Modal/Modal";
import { useState } from "react";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";
import { RatingStars } from "../RatingStars/RatringStars";

interface ReviewModalProps {
    isOpen?: boolean;
    onClose: () => void;
    hotelName: string;
}

export const ReviewModal = ({
    isOpen,
    onClose,
    hotelName,
}: ReviewModalProps) => {
    const [loading, setLoading] = useState(false);
    const [stars, setStars] = useState(0);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async data => {
        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                body: JSON.stringify({
                    data,
                }),
            });
            if (!response.ok) {
                alert("Coś poszło nie tak");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col flex-colrounded-t justify-center relative  w-full"
            >
                <div className="p-6 border-b-[1px]">
                    <h2 className="text-center font-bold">{hotelName}</h2>
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
                            onClick={handleSubmit(onSubmit)}
                            label={"Dodaj komentarz"}
                        />
                    </div>
                </div>
            </form>
        </Modal>
    );
};
