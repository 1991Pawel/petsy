"use client";
import { IconType } from "react-icons";
import { cls } from "@/utils/helpers";

const classes = {
    base: "relative rounded-lg hover:opacity-80 transiton w-full ",
    disabled: "cursor-not-allowe disabled:opacity-70",
    size: {
        small: "py-1 py-1 text-sm font-light",
        normal: "py-3 text-md font-semibold",
    },
    variant: {
        primary: "bg-rose-500 bg-rose-500 text-white",
        secondary: "bg-wihte border-2 border-rose-500",
        danger: "bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white",
    },
};

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    size?: "small" | "normal";
    variant?: "primary" | "secondary" | "danger";
    icon?: IconType;
    type?: "button" | "submit";
}

export const Button = ({
    label,
    onClick,
    disabled = false,
    size = "normal",
    variant = "primary",
    type = "button",
    icon: Icon,
}: ButtonProps) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={cls(`
        ${classes.base}
        ${classes.size[size]}
        ${classes.variant[variant]}
        ${disabled && classes.disabled}
    `)}
    >
        {Icon && <Icon className="absolute left-4 top-3" size={24} />}
        {label}
    </button>
);
