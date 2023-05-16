"use client";
import { IconType } from "react-icons";
import { cls } from "@/utils/helpers";

interface ButtonProps {
    label: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    outline?: boolean;
    size?: "small" | "normal";
    variant?: "primary" | "secondary" | "danger";
    icon?: IconType;
}

const classes = {
    base: "relative rounded-lg hover:opacity-80 transiton w-full ",
    disabled: "cursor-not-allowe disabled:opacity-70",
    size: {
        small: "py-1 py-1 text-sm font-light border-[1px]",
        normal: "py-3 text-md font-semibold border-2",
    },
    variant: {
        primary: "bg-rose-500 bg-rose-500 text-white",
        secondary: "bg-wihte bg-rose-500",
        danger: "bg-red-500 hover:bg-red-800 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 text-white",
    },
};

export const Button = ({
    label,
    onClick,
    disabled = false,
    size = "normal",
    variant = "primary",
    icon: Icon,
}: ButtonProps) => (
    <button
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
