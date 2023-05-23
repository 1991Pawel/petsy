"use client";

import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";

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
                    <h2 className="text-center font-bold">Zarejestruj się</h2>
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

                    <div className="w-full mb-5">
                        <Button
                            type="button"
                            disabled={loading}
                            onClick={() => signIn("github")}
                            label={"Zarejestruj się Github"}
                            variant="secondary"
                            icon={AiFillGithub}
                        />
                    </div>
                    <div className="w-full ">
                        <Button
                            disabled={loading}
                            onClick={handleSubmit(onSubmit)}
                            label={"Zarejestruj się"}
                        />
                    </div>
                </div>
            </form>
        </Modal>
    );
};
