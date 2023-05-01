export default function getWebSocketAPI(symbol: string) {

    const ws = new WebSocket('wss://stream.binance.com:9443/ws');

    // Subscribe to the trade stream for the symbol
    ws.onopen = () => {
        ws.send(JSON.stringify({
            method: 'SUBSCRIBE',
            params: [`${symbol}@aggTrade`],
            id: 1
        }));
    };



    return ws;
}
