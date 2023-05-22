"use client";
import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../Avatar/Avatar";
import { useCallback, useState } from "react";
import { MenuItem } from "../Navbar/MenuItem/MenuItem";
import { RegisterModal } from "../RegisterModal/RegisterModal";
import { LoginModal } from "../LoginModal/LoginModal";
import { useSession, signOut, signIn } from "next-auth/react";
export const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
    const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
    const session = useSession();

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev);
    }, [isOpen]);

    const handleCloseRegisterModal = () => {
        setIsOpenRegisterModal(false);
    };
    const handleOpenRegisterModal = () => {
        setIsOpenRegisterModal(true);
    };

    const handleCloseLoginModal = () => {
        setIsOpenLoginModal(false);
    };
    const handleOpenLoginModal = () => {
        setIsOpenLoginModal(true);
    };

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
                    Airbnb your home
                </div>
                <div
                    onClick={toggleOpen}
                    className="    
            p-4    
            md:px-2   
            md:py-1
            md:px-2border-[1px]
            border-[1px]
            border-neutral-200
            flex
            flex-row
            items-center
            rounded-full
            gap-3
            cursor-pointer
            hover:shadow-md
            transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-wihte overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {session.status === "authenticated" ? (
                            <>
                                <MenuItem
                                    onClick={() => {}}
                                    label="Reservation"
                                />
                                <MenuItem onClick={() => {}} label="My trips" />
                                <MenuItem
                                    onClick={() => signOut()}
                                    label="Logout"
                                />
                            </>
                        ) : (
                            <>
                                <MenuItem
                                    onClick={handleOpenLoginModal}
                                    label="Login"
                                />
                                <MenuItem
                                    onClick={handleOpenRegisterModal}
                                    label="Sign up"
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
            <RegisterModal
                isOpen={isOpenRegisterModal}
                onClose={handleCloseRegisterModal}
            />
            <LoginModal
                isOpen={isOpenLoginModal}
                onClose={handleCloseLoginModal}
            />
        </div>
    );
};
