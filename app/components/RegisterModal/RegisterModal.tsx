"use client";

import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";

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
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = async data => {
        console.log(data, "D");
        try {
            const res = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            if (res?.ok) {
                onClose();
            }
        } catch (error) {
            console.error("Wystąpił błąd podczas logowania:", error);
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
