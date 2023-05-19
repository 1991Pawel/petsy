"use client";
import { cls } from "@/utils/helpers";
import { IoMdClose } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const classes = {
    base: "duration-300 translate lg:h-auto md:h-auto rounded-md rounded-t-xl shadow-lg flex flex-col w-full bg-white otunline-none focus:outline-none",
    active: " opacity-100 translate-y-0",
    inActive: "translate-y-full opacity-0",
};

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose]);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={isOpen ? "block" : "hidden"}>
            <div className="justify-center items-center flex overflow-hidde  fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
                <div className="place-self-end md:place-self-center relative top-50 w-full md:w-4/6 lg:w-3/6  xl:w-2/5  mx-auto lg:h-auto md:h-auto">
                    <div
                        className={cls(
                            `${classes.base} ${
                                showModal ? classes.active : classes.inActive
                            }`
                        )}
                    >
                        <div className="relative flex auto">{children}</div>
                        <button
                            onClick={handleClose}
                            className=" cursor: pointer p-1 border-0 hover:opacity-70 transition absolute right-9 top-5"
                        >
                            <IoMdClose size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
