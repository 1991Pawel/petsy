"use client";

import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

interface RegisterModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

export const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = data => {
        console.log("data", data);
        console.log("error", errors);
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col flex-colrounded-t justify-center relative  w-full"
            >
                <div className="p-6 border-b-[1px]">
                    <h2 className="text-center font-bold">
                        Zaloguj się lub zarejestruj
                    </h2>
                </div>
                <div className="p-6">
                    <div className="mb-5">
                        <Input
                            id="email"
                            label="Adres e-mail"
                            disabled={loading}
                            errors={errors}
                            register={register}
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <Input
                            id="password"
                            label="Hasło"
                            disabled={loading}
                            errors={errors}
                            register={register}
                            required
                        />
                    </div>

                    <div className="w-full">
                        <Button
                            disabled={loading}
                            onClick={() => console.log("submit")}
                            label={"lorem"}
                        />
                    </div>
                </div>
            </form>
        </Modal>
    );
};
