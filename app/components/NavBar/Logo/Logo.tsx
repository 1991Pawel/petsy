"use client";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
    return (
        <Link href="/">
            <Image
                src="/images/logo.png"
                width={100}
                height={100}
                className="hidden md:block cursor-pointer"
                alt="Logo"
            ></Image>
        </Link>
    );
};
