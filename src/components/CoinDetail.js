import React, {Component}  from 'react';
import Axios from "axios";
import Socket from "../Service/Socket";
import Coin from "./Coin"
import CoinNews from "./CoinNews";





export class CoinDetail extends Component{
    constructor(props) {
        super(props);

        this.state  ={
            coins:[],
            coin_symbol:this.props.match.params.coinSymbol,

        }
    }

    componentDidMount() {
        this.getCoin();
    }

    componentWillUnmount() {
        this.handleStopStream();
    }

    getCoin(){
        Axios.get(`https://ciswebapi2.cryptoindexseries.com/api/Search/CoinSearch?coin_symbols=${this.state.coin_symbol}&ccy=USD`).then(resp=>
        {

            this.setState({
                coins:resp.data.data
            },()=> this.handleStartStream(resp.data.data[0].symbol));
        }).catch()
    }

    handleStartStream(sub){

        Socket.emit("m", {action: "subscribe", data:[`${sub}-USD.CISCALC~TICKER`] });
        console.log("sub");
        const that =this;

        Socket.on('m',(resp)=>{
            that.parseRespData(resp);
        });
    }

    parseRespData(resp){

        let new_price;
        let symbol;
        var newCoins = Object.assign([],this.state.coins);

        try{
            new_price = JSON.parse(resp).lst;
            symbol = JSON.parse(resp).symbol;
            symbol = symbol.substring(0,symbol.indexOf("-"));

            if(newCoins[0].symbol===symbol && newCoins[0].ticker !=null) {
                newCoins[0].ticker.l = new_price;
            }


            this.setState({
                coins:[]
            })
            this.setState({
                coins:newCoins
            })


        }catch (e){

        }

    }

    handleStopStream() {
        Socket.emit("m", {action: "unsubscribe", data: [`${this.state.coins[0].symbol}-USD.CISCALC~TICKER`]});
        Socket.off();
        console.log("unsub");
    }




    render() {
        const {
            coins,
            coin_symbol
        }=this.state;
        return(
            <div className="container">
                {
                    coins.map((coin) => (
                        <Coin key={coin.symbol} coin={coin}/>
                    ))}

                <CoinNews coinSymbol={coin_symbol}/>

            </div>
        )



    }



}






export default CoinDetail;



