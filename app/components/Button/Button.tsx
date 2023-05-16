"use client";

import { IconType } from "react-icons";
interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    small?: boolean;
    icon?: IconType;
}

export const Button = ({
    label,
    onClick,
    outline,
    disabled,
    small,
    icon: Icon,
}: ButtonProps) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transiton w-full 
        ${outline ? "bg-wihte" : "bg-rose-500"} 
        ${outline ? "border-black" : "bg-rose-500"} 
        ${outline ? "text-black" : "text-white"}
        ${small ? "py-1" : "py-3"}
        ${small ? "text-sm" : "text-md"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}`}
    >
        {Icon && <Icon className="absolute left-4 top-3" size={24} />}
        {label}
    </button>
);
