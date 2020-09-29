import React, {Component} from 'react';
import Pagination from "@material-ui/lab/Pagination";
import Button from 'react-bootstrap/Button'
import Axios from "axios";
import CoinTableList from "./CoinTableList";
import CoinCardList from "./CoinCardList";
import Socket from "../Service/Socket";


export class Home extends Component {
    constructor(props) {
        super(props);

        this.getCoins = this.getCoins.bind(this);
        this.handlePageSizeChange = this.handlePageSizeChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleCcyChange = this.handleCcyChange.bind(this);
        this.handleViewChange = this.handleViewChange.bind(this);
        this.handleStartStream = this.handleStartStream.bind(this);
        this.handleStopStream = this.handleStopStream.bind(this);
        this.parseRespData = this.parseRespData.bind(this);

        this.state = {
            coins: [],
            page: 1,
            count: 0,
            pageSize: 10,
            ccy: "USD",
            table_view: true,
            coins_symbols: []

        }

        this.pageSizes = [10, 25, 50];
        this.ccyTypes = ["USD", "BTC", "TRY"];
    }


    componentDidMount() {
        this.getCoins();


    }

    componentWillUnmount() {
        this.handleStopStream();

    }


    getCoins() {
        Axios.get(`https://ciswebapi2.cryptoindexseries.com/api/Search/CoinSearch?page_size=${this.state.pageSize}&page_number=${this.state.page}&ccy=${this.state.ccy}`).then(resp => {
            let newCoinSymbols = [];
            for (let i = 0; i < resp.data.data.length; i++) {
                newCoinSymbols.push(resp.data.data[i].symbol + '-USD.CISCALC~TICKER');
            }


            this.setState({
                coins: resp.data.data,
                count: Math.round(resp.data.total_count / this.state.pageSize),
                coins_symbols: newCoinSymbols
            }, () => this.handleStartStream(this.state.coins_symbols));


        }).catch()
    }

    handlePageChange(event, value) {
        this.handleStopStream();
        this.setState({
                page: value
            },
            () => {
                this.getCoins();
            }
        );
    }

    handlePageSizeChange(event) {
        this.handleStopStream();
        this.setState({
                pageSize: event.target.value,
                page: 1
            },
            () => {
                this.getCoins();
            });

    }


    handleCcyChange(event) {
        this.handleStopStream();
        this.setState({
                ccy: event.target.value
            },
            () => {
                this.getCoins();
            })
    }

    handleViewChange(event) {

        if (event.target.value === "table") {
            this.setState({
                table_view: true
            })
        } else {
            this.setState({
                table_view: false
            })
        }


    }

    handleStartStream(subs) {

        Socket.emit("m", {action: "subscribe", data: subs});
        console.log("sub");
        const that = this;

        Socket.on('m', (resp) => {
            that.parseRespData(resp);

        });
    }

    parseRespData(resp) {

        let new_price;
        let symbol;
        var newCoins = Object.assign([], this.state.coins);

        try {
            new_price = JSON.parse(resp).lst;
            symbol = JSON.parse(resp).symbol;
            symbol = symbol.substring(0, symbol.indexOf("-"));

            for (let i = 0; i < newCoins.length; i++) {
                if (newCoins[i].symbol === symbol && newCoins[i].ticker != null) {
                    newCoins[i].ticker.l = new_price;
                }
            }

            this.setState({
                coins: [],
            })
            this.setState({
                coins: newCoins,
            })


        } catch (e) {

        }

    }

    handleStopStream() {

        Socket.emit("m", {action: "unsubscribe", data: this.state.coins_symbols});
        Socket.off();
        console.log("unsub");
    }


    render() {
        const {
            coins,
            page,
            count,
            pageSize,
            ccy,
            table_view
        } = this.state;

        if (table_view) {
            return (
                <div className="container">
                    <div className="list row paginationCustomCss">
                        <div className="col-md-4">
                            <Pagination className="my-lg-3" count={count} page={page} siblingCount={1} boundaryCount={1}
                                        variant="outlined" shape="rounded" color="primary"
                                        onChange={this.handlePageChange}>

                            </Pagination>
                        </div>
                        <div className="col-md-2 textwhite">
                            <Button variant="success" value={"table"}
                                    onClick={this.handleViewChange}>{'Table View'}</Button>
                        </div>
                        <div className="col-md-2 textwhite">
                            <Button variant="warning" value={"card"}
                                    onClick={this.handleViewChange}>{'Card View'}</Button>
                        </div>
                        <div className="col-md-2 textwhite">
                            {"Ccy: "}
                            <select className="" onChange={this.handleCcyChange} value={ccy}>
                                {this.ccyTypes.map((ccy) => (
                                    <option key={ccy} value={ccy}>
                                        {ccy}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2 textwhite">
                            {"Items per Page: "}

                            <select onChange={this.handlePageSizeChange} value={pageSize}>
                                {this.pageSizes.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}

                            </select>
                        </div>
                    </div>

                    <div>
                        <table className="table table-dark">
                            <thead className="tablehead">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Circ. Supply</th>
                                <th scope="col">Max. Supply</th>
                            </tr>
                            </thead>
                            {
                                coins.map((coin) => (
                                    <CoinTableList key={coin.symbol} coin={coin}/>
                                ))}

                        </table>
                    </div>


                </div>

            );
        } else {
            return (
                <div className="container">
                    <div className="list row paginationCustomCss">
                        <div className="col-md-4">
                            <Pagination className="my-lg-3" count={count} page={page} siblingCount={1} boundaryCount={1}
                                        variant="outlined" shape="rounded" color="primary"
                                        onChange={this.handlePageChange}>

                            </Pagination>
                        </div>
                        <div className="col-md-2 textwhite">
                            <Button variant="success" value={"table"}
                                    onClick={this.handleViewChange}>{'Table View'}</Button>
                        </div>
                        <div className="col-md-2 textwhite">
                            <Button variant="warning" value={"card"}
                                    onClick={this.handleViewChange}>{'Card View'}</Button>
                        </div>
                        <div className="col-md-2 textwhite">
                            {"Ccy: "}
                            <select className="" onChange={this.handleCcyChange} value={ccy}>
                                {this.ccyTypes.map((ccy) => (
                                    <option key={ccy} value={ccy}>
                                        {ccy}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-2 textwhite">
                            {"Items per Page: "}
                            <select onChange={this.handlePageSizeChange} value={pageSize}>
                                {this.pageSizes.map((size) => (
                                    <option key={size} value={size}>
                                        {size}
                                    </option>
                                ))}

                            </select>
                        </div>
                    </div>

                    <div>
                        {
                            coins.map((coin) => (
                                <CoinCardList key={coin.symbol} coin={coin}/>
                            ))}
                    </div>


                </div>

            );
        }


    }


}


export default Home;



