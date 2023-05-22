"use client";

import { useState } from "react";
import { Modal } from "../Modal/Modal";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

interface RegisterModalProps {
    isOpen?: boolean;
    onClose: () => void;
}

// const CREATE_ACCOUNT = gql`
//     mutation CreateAccount($email: String!, $password: String!) {
//         createAccount(data: { email: $email, password: $password }) {
//             id
//         }
//     }
// `;

export const RegisterModal = ({ isOpen, onClose }: RegisterModalProps) => {
    const [loading, setLoading] = useState(false);
    // const [createUser] = useMutation(CREATE_ACCOUNT);
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
            await fetch("/api/signup", {
                method: "POST",
                body: JSON.stringify({
                    data,
                }),
            });
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
