"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { cls } from "@/utils/helpers";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
}

const inputClass = {
    base: "peer w-full p-4 pt-6 font-light  bg-white border-2 rounded-md outline-none transition",
    error: "border-2 border-rose-400",
    disabled: "disabled:opacity-70 disabled:cursor-not-allowed",
};

export const Input = ({
    id,
    label,
    type = "text",
    disabled,
    register,
    required,
    errors,
}: InputProps) => {
    return (
        <div className="w-full relative">
            <input
                disabled={disabled}
                id={id}
                className={cls(`
                ${inputClass.base}
                ${disabled && inputClass.disabled}
                ${errors[id] && inputClass.error}
            `)}
                {...register(id, { required })}
                placeholder=" "
                type={type}
            />
            <label
                className={`absolute 
                text-md
                duration-150 
                transform 
                -translate-y-3 
                top-5 
                left-5
                z-10 
                origin-[0] 
                peer-text-slate-50
                peer-placeholder-shown:scale-100 
                peer-placeholder-shown:translate-y-0 
                peer-focus:scale-75
                peer-focus:-translate-y-4`}
            >
                {label}
            </label>
            {errors[id] && (
                <span className="text-sm text-rose-400">Pole wymagane</span>
            )}
        </div>
    );
};
