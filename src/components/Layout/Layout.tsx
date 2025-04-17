import { Link, Outlet } from "react-router-dom";
import './Layout.css'
import CustomTitle from "../CustomTitle/CustomTitle";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

export default function Layout() {

    const [walletAddress, setWalletAddress] = useState<string | null>(null);

    const connectWallet = async () => {
        try {
            if ("solana" in window) {
                const provider = (window as any).solana;

                if (provider.isPhantom) {
                    const response = await provider.connect();
                    setWalletAddress(response.publicKey.toString());
                    localStorage.setItem("phantom", response.publicKey);
                } else {
                    alert("Установите Phantom Wallet!");
                }
            } else {
                alert("Phantom Wallet не найден!");
            }
        } catch (error) {
            console.error("Ошибка подключения:", error);
        }
    };

    const [isPopoverOpened, setIsPopoverOpened] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (localStorage.getItem("phantom")) {
            setWalletAddress(localStorage.getItem("phantom"));
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node))
                setIsPopoverOpened(false);
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <>
            <div id="popup" ref={popupRef} className={clsx("layout__popup", isPopoverOpened && 'layout__popup-opened ')}>
                Please connect your wallet
            </div>
            <header className="layout__header">
                <Link to={'/dashboard'}>
                    <div style={{ position: 'relative' }}>
                        <img src='/scorex.svg' alt='Scorex' />
                        <img src='/scorexbg.svg' alt='Scorex' className="app__logo_bg" />
                    </div>
                </Link>
                <div className="layout__header_actions">
                    <CustomTitle onClick={() => setIsPopoverOpened(!isPopoverOpened)} title={
                        <div className="layout__header_actions_text">
                            <img src="/plus.svg" />
                            create profile
                        </div>
                    } />

                    <CustomTitle onClick={connectWallet} title={
                        <div className="layout__header_actions_text">
                            <img src="/arrowRight.svg" />
                            {walletAddress ? 'Wallet connected' : 'connect wallet'}
                        </div>
                    } />
                </div>
            </header>
            <main className="layout__main">
                <nav className="layout__navbar">
                    <div onClick={() => setIsPopoverOpened(!isPopoverOpened)}
                        className="layout__navbar_icon" style={{ height: '24px', width: '20px' }}>
                        <img src="/profile.svg" alt="Profile" />
                        <img src="/profileOn.svg" alt="Profile" />
                    </div>
                    <Link to='/favorites'>
                        <div className="layout__navbar_icon" style={{ height: '26px', width: '26px' }}>
                            <img src="/star.svg" alt="Favorites" />
                            <img src="/starOn.svg" alt="Favorites" />
                        </div>
                    </Link>
                    <div className="layout__navbar_icon" style={{ height: '19px', width: '20px' }}>
                        <img src="/x.svg" alt="X" />
                        <img src="/xOn.svg" alt="X" />
                    </div>
                </nav>
                <div className="layout__main_content">
                    <Outlet />
                </div>
            </main>
            <footer className="layout__footer">
                <div className="layout__footer_left">
                    <div style={{ position: 'relative' }}>
                        <img src='/scorex.svg' alt='Scorex' />
                        <img src='/scorexbg.svg' alt='Scorex' className="app__logo_bg" style={{left: 0, scale: 1.1}}/>
                    </div>
                    <span>Scorex. 2025. All rights reserved</span>
                </div>
                <div className="layout__footer_links">
                    <a href="https://x.com/ScorexAI">
                        <CustomTitle title='X' />
                    </a>
                    <CustomTitle title='Telegram' />
                    <CustomTitle title='DexScreener' />
                </div>
            </footer>
        </>
    )
}