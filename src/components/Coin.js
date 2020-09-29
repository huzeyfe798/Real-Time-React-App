import React, {Component} from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";


export class Coin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coin_img_url: props.coin.image_url,
            coin_symbol: props.coin.symbol,
            coin_supply: props.coin.supply,
            coin_ticker: props.coin.ticker,
            coin_name: props.coin.name,
            coin_whitepaper: props.coin.whitepaper_url,
            coin_website: props.coin.website_url,
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
            coin_name,
            coin_max_supply,
            coin_circ_supply,
            coin_whitepaper,
            coin_website
        } = this.state;
        return (
            <div className="coinCardBorder">
                <div className="row cardCoin">
                    <div className="col-md-1 imageSide">
                        <img className="img-thumbnail img-fluid img-new" width={100} height={100} src={coin_img_url}
                             alt={coin_symbol}/>
                    </div>
                    <div className="col-md-1 imageSide">
                        <ListGroup>
                            <ListGroup.Item className="coinSingle" variant="dark"><b
                                style={{fontSize: "xx-large"}}>{coin_symbol}</b><br></br><b>{coin_name}</b></ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div className="col-md-2">
                        <ListGroup>
                            <ListGroup.Item className="coinSingleValues" variant="dark"><b
                                style={{color: "gray"}}>Price(USD):</b><br></br><b
                                style={{fontSize: "x-large"}}>{coin_l}</b></ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div className="col-md-2">
                        <ListGroup>
                            <ListGroup.Item className="coinSingleValues" variant="dark"><b
                                style={{color: "gray"}}>Max.Supply:</b><br></br><b
                                style={{fontSize: "x-large"}}>{coin_max_supply}</b></ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div className="col-md-2">
                        <ListGroup>
                            <ListGroup.Item className="coinSingleValues" variant="dark"><b
                                style={{color: "gray"}}>Circ.Supply:</b><br></br><b
                                style={{fontSize: "x-large"}}>{coin_circ_supply}</b></ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div className="col-md-2">
                        <ListGroup>
                            <ListGroup.Item className="coinSingleValues" variant="dark">
                                <a style={{color: "#007bff"}} className="link-text" target="_blank" href={coin_website}
                                   rel="noreferrer noopener">
                                    <svg width="5em" height="5em" viewBox="0 0 16 16"
                                         className="bi bi-box-arrow-in-up-right" fill="currentColor">
                                        <path fill-rule="evenodd"
                                              d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"/>
                                        <path fill-rule="evenodd"
                                              d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"/>
                                    </svg>
                                </a>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div className="col-md-2">
                        <ListGroup>
                            <ListGroup.Item className="coinSingleValues" variant="dark">
                                <Link to={{
                                    pathname: '/',
                                }}>
                                    <svg style={{color: "orange"}} width="4.5em" height="4.5em" viewBox="0 0 16 16"
                                         className="bi bi-arrow-left-circle-fill" fill="currentColor"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                              d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-4.5.5a.5.5 0 0 0 0-1H5.707l2.147-2.146a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708-.708L5.707 8.5H11.5z"/>
                                    </svg>
                                </Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>

                </div>
            </div>


        )


    }


}


export default Coin;



