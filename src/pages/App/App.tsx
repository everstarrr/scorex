import { CSSProperties, MouseEvent, useEffect, useState } from 'react'
import './App.css'
import CustomTitle from '../../components/CustomTitle/CustomTitle'
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { animateSemiEllipse } from '../../lib/utils';
import { Link } from 'react-router-dom';

type CursorPosition = {
  x: number | string | null
  y: number | string | null
}

function App() {

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

  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: '50%', y: '50%' });
  const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);

  const handleMouseMove = (e: MouseEvent) => {
    console.log("cursorpos", e.clientX, e.clientY)
    if (isPageLoaded)
      setCursorPos({ x: `${e.clientX}px`, y: `${e.clientY}px` });
  };

  const handleChangePos = (x: number, y: number) => {
    setCursorPos({ x: `${x}px`, y: `${y}px` })
  }

  useEffect(() => {
    if (localStorage.getItem("phantom")) {
      setWalletAddress(localStorage.getItem("phantom"));
    }
    animateSemiEllipse(handleChangePos)
    setTimeout(() => {
      setIsPageLoaded(true);
    }, 2000)
  }, [])

  return (
    <main className={clsx('app__container', isPageLoaded && 'app__container-loaded')} onMouseMove={handleMouseMove}>

      <div className='app__logo'>
        <div style={{position: 'relative'}}>
          <img src='/scorex.svg' alt='Scorex' />
          <img src='/scorexbg.svg' alt='Scorex BG' className='app__logo_bg'/>
        </div>
      </div>
      <div className='app__links'>
        <div className={clsx('app__links_extension')}
          onMouseEnter={() => setIsMouseOver(true)}
          onMouseLeave={() => setIsMouseOver(false)}>
          {isMouseOver ?
            <div>
              {'soon'.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 21 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: 0.1 + index * 0.05,
                    ease: 'easeIn'
                  }}
                >
                  {char}
                </motion.span>
              ))
              }
            </div> :
            <span>get an extension</span>
          }
          <img src='/longArrowRight.svg' alt='Arrow right' />
        </div>
        <a href="https://x.com/ScorexAI">
          <CustomTitle title='x' />
        </a>
        <CustomTitle title='telegram' />
        <CustomTitle title='dexscreener' />
      </div>

      <div className='app__main'>
        <div className='app__main__title'>
          <p className='app__main__title_1'>SCOREX AI</p>
          <span className='app__main__title_2'>SCOREX AI</span>
          <span className='app__main__title_3'>SCOREX AI</span>
          <span className='app__main__title_4'>SCOREX AI</span>
        </div>
        <div className='app__main__actions'>
          <CustomTitle onClick={connectWallet} className='app__main__actions_text' title={
            <div className='app__main__actions_text'><img src='/arrowRight.svg' />{walletAddress ? 'Wallet connected' : 'connect wallet'
            }</div>} />
          <Link to={'/dashboard'}>
            <CustomTitle className='app__main__actions_text' title={
              <div className='app__main__actions_text'><img src='/arrowRight.svg' />get the app</div>
            } />
          </Link>
        </div>
      </div>

      <div className='app__cursor' style={{ "--x": cursorPos.x, "--y": cursorPos.y } as CSSProperties}>
        <div className='app__cursor_inner' />
      </div>

      <div className='app__overlay' style={{ "--x": cursorPos.x, "--y": cursorPos.y } as CSSProperties} />
      <div className='app__stripes'></div>
      <div className='app__border'></div>
    </main>
  )
}

export default App
