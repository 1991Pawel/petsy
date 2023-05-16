"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface RegisterModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
}

export const RegisterModal = ({}: RegisterModalProps) => {
    return <>Lorem ipsum dolor sit amet.</>;
};
