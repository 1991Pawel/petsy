"use client";

import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";

interface LoginModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const [loading, setLoading] = useState(false);

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
        setLoading(true);
        try {
            const request = await signIn("credentials", {
                ...data,
                redirect: false,
            });

            console.log(request, "request");

            if (request?.error) {
                throw new Error("Błąd logowania");
            }
            onClose();
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col flex-colrounded-t justify-center relative  w-full"
            >
                <div className="p-6 border-b-[1px]">
                    <h2 className="text-center font-bold">Zaloguj się</h2>
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
                            type="submit"
                            disabled={loading}
                            label={"Zaloguj się"}
                        />
                    </div>
                </div>
            </form>
        </Modal>
    );
};
