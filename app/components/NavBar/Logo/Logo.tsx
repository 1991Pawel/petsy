"use client";
import Image from "next/image";

export const Logo = () => {
    return (
        <Image
            src="/images/logo.png"
            width={100}
            height={100}
            className="hidden md:block cursor-pointer"
            alt="Logo"
        ></Image>
    );
};
