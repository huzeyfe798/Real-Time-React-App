import React, {Component} from 'react';
import {Link} from "react-router-dom";


export class CoinTableList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coin_id: props.coin.coin_id,
            coin_img_url: props.coin.image_url,
            coin_symbol: props.coin.symbol,
            coin_supply: props.coin.supply,
            coin_ticker: props.coin.ticker,
            coin_l: "",
            coin_max_supply: "",
            coin_circ_supply: ""
        }
    }


    componentDidMount() {
        this.arrangeCoinPrice();
        this.arrangeCoinMaxSupply();
        this.arrangeCoinCircSupply();


    }

    arrangeCoinPrice() {
        if (this.state.coin_ticker != null && this.state.coin_ticker.l != null) {

            this.setState({
                coin_l: this.state.coin_ticker.l
            })

        } else {
            this.setState({
                coin_l: "-"
            })
        }

    }


    arrangeCoinMaxSupply() {
        if (this.state.coin_supply != null && this.state.coin_supply.max_supply != null) {
            let newsuplly = "";
            if (this.state.coin_supply.max_supply > 1000000000) {
                newsuplly = (this.state.coin_supply.max_supply / 1000000000).toFixed(2).toString() + "B";
                this.setState({
                    coin_max_supply: newsuplly

                })
            } else if (this.state.coin_supply.max_supply > 1000000) {
                newsuplly = (this.state.coin_supply.max_supply / 1000000).toFixed(2).toString() + "M";
                this.setState({
                    coin_max_supply: newsuplly

                })
            } else {
                newsuplly = (this.state.coin_supply.max_supply / 1000).toFixed(2).toString() + "K";
                this.setState({
                    coin_max_supply: newsuplly
                })
            }

        } else {
            this.setState({
                coin_max_supply: "-"
            })
        }


    }


    arrangeCoinCircSupply() {
        if (this.state.coin_supply != null && this.state.coin_supply.circulating_supply != null) {
            let newcircsuplly = "";
            if (this.state.coin_supply.circulating_supply > 1000000000) {
                newcircsuplly = (this.state.coin_supply.circulating_supply / 1000000000).toFixed(2).toString() + "B";
                this.setState({
                    coin_circ_supply: newcircsuplly

                })
            } else if (this.state.coin_supply.circulating_supply > 1000000) {
                newcircsuplly = (this.state.coin_supply.circulating_supply / 1000000).toFixed(2).toString() + "M";
                this.setState({
                    coin_circ_supply: newcircsuplly

                })
            } else {
                newcircsuplly = (this.state.coin_supply.circulating_supply / 1000).toFixed(2).toString() + "K";
                this.setState({
                    coin_circ_supply: newcircsuplly
                })
            }

        } else {
            this.setState({
                coin_circ_supply: "-"
            })
        }


    }

    render() {
        const {
            coin_img_url,
            coin_symbol,
            coin_l,
            coin_max_supply,
            coin_circ_supply
        } = this.state;
        return (

            <tbody>


            <tr key={coin_symbol}>
                <th scope="row">
                    <Link to={{
                        pathname: '/coinDetail/' + coin_symbol,
                    }}>
                        <img className="img-thumbnail img-fluid" width={32} height={32} src={coin_img_url}
                             alt={coin_symbol}/>
                        {" "}{coin_symbol}
                    </Link>

                </th>
                <td>{coin_l}</td>
                <td>{coin_circ_supply}</td>
                <td>{coin_max_supply}</td>
            </tr>


            </tbody>

        );

    }


}

export default CoinTableList;




