import DropDown from './DropDown'
import getWebSocketAPI from '../utils/api/websocketAPI';
import Image from 'next/image'
import { useEffect, useState } from 'react';

interface Symbol {
    image: string;
    baseAsset: string;
    name: string;
}

export default function Card() {
    const UPDATEINTERVEL = 10000;
    const USDTOINRRATE = 80;
    const [symbol, setSymbol] = useState({
        image: 'https://assets.coincap.io/assets/icons/eth@2x.png',
        name: 'ethusdt',
        baseAsset: 'ETH'
    });
    const [formattedPrice, setFormattedPrice] = useState("₹ 0.00");
    const [accuratePrice, setAccuratePrice] = useState(0.00);
    const [inputINR, setInputINR] = useState<string | number>(0.00);
    const [symbolOutput, setSymbolOutput] = useState<string | number>(0.00);

    useEffect(() => {
        const ws = getWebSocketAPI(symbol.name);
        const interval = setInterval(() => ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.e === 'aggTrade') {
                const lastPrice = parseFloat(data.p);
                const priceInInr = lastPrice * USDTOINRRATE;
                setAccuratePrice(priceInInr);
                const roundedInr = Math.round(priceInInr);
                const formattedNumber = roundedInr.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    minimumFractionDigits: 0,
                });
                setFormattedPrice(formattedNumber);
            }
        }, UPDATEINTERVEL);

        // Clean up the WebSocket connection on unmount
        return () => {
            clearInterval(interval);
            ws.close();
        };
    }, [symbol]);

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const inputValue = event.target.value;
        if (accuratePrice && formattedPrice !== 'Getting price...') {
            setInputINR(inputValue);
            const numberOfCoinUserWillGet = Number(inputValue) / accuratePrice;
            setSymbolOutput(numberOfCoinUserWillGet);
        }
        else {
            setSymbolOutput('Fetching..value from websocket');
        }
    }

    function symbolSetter(newSymbol: Symbol) {
        if (newSymbol.name === symbol.name)
            return;
        setInputINR("");
        setSymbolOutput(0.00);
        setFormattedPrice('Getting price...')
        setSymbol(newSymbol);
    }
    return (
        <div className='card-container'>
            <div className='circular-container'>
                <Image src={symbol.image} alt={`${symbol.name}-logo`} width={50} height={50} />
            </div>
            <div className='price-container'>
                <Image src='Union.svg' alt='div-box' width={470} height={567} priority={true} />
                <div className='content-container'>
                    <div className='row-container'>
                        <p>Current value</p>
                        <p className='semibold primary-color '>{formattedPrice}</p>
                    </div>
                    <DropDown currentSelected={symbol} setSymbol={symbolSetter} />
                    <p>Amount you want to invest</p>
                    <div className='input-div'>
                        <input type="number"
                            placeholder='0.00'
                            onChange={handleInputChange}
                            value={inputINR}
                        />
                        <span>INR</span>
                    </div>
                    <p>Estimate Number of ETH You will Get</p>
                    <input disabled placeholder='0.00' value={symbolOutput} />
                    <button className='btn-buy'>Buy</button>
                </div>
            </div>
        </div>
    )
}