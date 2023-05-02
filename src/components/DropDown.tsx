import Image from "next/image";
import { ReactEventHandler, useEffect, useState } from "react";

interface dropDownProps {
    currentSelected: Symbol;
    setSymbol: (symbol: Symbol) => void;
}
interface SymbolData {
    baseAsset: string;
    symbol: string;
}
interface Symbol {
    image: string;
    baseAsset: string;
    name: string;
}
function DropDown({ currentSelected, setSymbol }: dropDownProps) {

    const [tokenList, setTokenList] = useState<Array<{ name: string; baseAsset: string; image: string }>>([]);
    const [toggleDialog, setToggleDialog] = useState(false);
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        const abortController = new AbortController();
        if (tokenList.length > 0) {
            return;
        }
        async function getTokenArray() {
            try {
                const cachedData = localStorage.getItem("tokenList");
                if (cachedData) {
                    setTokenList(JSON.parse(cachedData));
                    return;
                }

                const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
                const data = await response.json();
                const symbols = data.symbols
                    .filter((token: any) => token.symbol.endsWith("USDT"))
                    .slice(0, 25); // extract first 25 symbols
                const tokenDataArray = symbols.map(({ baseAsset, symbol
                }: SymbolData) => ({
                    name: symbol.toLowerCase(),
                    baseAsset: baseAsset.toLowerCase(),
                    image: `https://assets.coincap.io/assets/icons/${baseAsset.toLowerCase()}@2x.png`
                }));
                setTokenList(tokenDataArray);
                localStorage.setItem("tokenList", JSON.stringify(tokenDataArray));
            }
            catch (error) {
                console.error(error);
            }
        }
        getTokenArray();
        return () => {
            abortController.abort();
        }

    }, [])

    function handleDropdown() {
        setToggleDialog(prev => !prev);
    }

    function handleSelection(symbol: Symbol) {
        setSymbol(symbol);
        setToggleDialog(false);
    }

    function handleSearch(input: React.ChangeEvent<HTMLInputElement>) {
        setSearchText(input.target.value);
    }

    return (
        <div>
            <div className="dropdown-container" onClick={handleDropdown}>
                <div className="symbol-container">
                    <Image src={currentSelected.image} alt={currentSelected.name} width={25} height={25} />
                    <span>{currentSelected.name}</span>
                </div>
                <div>
                    <Image src='dropdownarrow.svg' alt='dropdown arrow' width={14} height={7} />
                </div>
            </div>
            {toggleDialog && <div className="dialog-box">
                <div className="dialog-content">
                    <div className="close-btn">
                        <button onClick={handleDropdown}><Image src='closebtn.svg' alt='close' width={24} height={24} /></button>
                    </div>
                    <div className="search-container">
                        <Image src='search.svg' alt="search-icon" width={17} height={17} />
                        <input type="text" placeholder="Search chains" onChange={handleSearch} />
                    </div>
                    <div className="token-list">
                        {
                            tokenList.filter((symbol) =>
                                symbol.name.toLowerCase().includes(searchText.toLowerCase())
                            ).map((symbol, index) => {
                                return (
                                    <div key={index} className="symbol-row" onClick={() => handleSelection(symbol)} >
                                        <div className="flex-container">
                                            <Image src={symbol.image} alt={symbol.baseAsset} width={25} height={25} onError={() => symbol.image = '/icon-error.png'} />
                                            <span>{symbol.name}</span>
                                        </div>
                                        {symbol.name === currentSelected.name &&
                                            (<Image src='greentick.svg' alt='selected' width={17} height={12} />)}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            }
        </div>
    )
}



export default DropDown