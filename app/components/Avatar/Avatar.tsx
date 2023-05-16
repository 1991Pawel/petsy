"use client";
import Image from "next/image";

export const Avatar = () => {
    return (
        <div>
            <Image
                width={30}
                height={30}
                alt="Avatar"
                src="/images/placeholder.jpg"
                className="rounded-full"
            />
        </div>
    );
};
