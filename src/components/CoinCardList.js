import React, {Component}  from 'react';
import ListGroup from 'react-bootstrap/ListGroup'
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";



export class CoinCardList extends Component{
    constructor(props) {
        super(props);

        this.state  ={
            coin_id : props.coin.coin_id,
            coin_img_url:props.coin.image_url,
            coin_symbol:props.coin.symbol,
            coin_business:props.coin.business_classification,
            coin_transaction:props.coin.transaction_anonimity,
            coin_consensus:props.coin.consensus_model,
            coin_website:props.coin.website_url,
            coin_asset_type:props.coin.asset_type,
            coin_decentralization:props.coin.decentralisation_perspective,
            coin_name:props.coin.name,
            coin_sub_business:props.coin.business_sub_classification,
            coin_algorithm:props.coin.algorithm,
            coin_whitepaper:props.coin.whitepaper_url
        }
    }


    componentDidMount() {
        this.arrangeSetstates();

    }

    arrangeSetstates(){
        if(this.state.coin_symbol == null || this.state.coin_symbol === "" ){
            this.setState({
                coin_symbol:"-"
            })
        }
        if(this.state.coin_business == null || this.state.coin_business === "" ){
            this.setState({
                coin_business:"-"
            })
        }
        if(this.state.coin_transaction == null || this.state.coin_transaction === "" ){
            this.setState({
                coin_transaction:"-"
            })
        }
        if(this.state.coin_consensus == null || this.state.coin_consensus === "" ){
            this.setState({
                coin_consensus:"-"
            })
        }
        if(this.state.coin_website == null || this.state.coin_website === "" ){
            this.setState({
                coin_website:"#"
            })
        }
        if(this.state.coin_asset_type == null || this.state.coin_asset_type === "" ){
            this.setState({
                coin_asset_type:"-"
            })
        }
        if(this.state.coin_decentralization == null || this.state.coin_decentralization === "" ){
            this.setState({
                coin_decentralization:"-"
            })
        }
        if(this.state.coin_name == null || this.state.coin_name === "" ){
            this.setState({
                coin_name:"-"
            })
        }
        if(this.state.coin_sub_business == null || this.state.coin_sub_business === "" ){
            this.setState({
                coin_sub_business:"-"
            })
        }
        if(this.state.coin_algorithm == null || this.state.coin_algorithm === "" ){
            this.setState({
                coin_algorithm:"-"
            })
        }
        if(this.state.coin_whitepaper == null || this.state.coin_whitepaper === "" ){
            this.setState({
                coin_whitepaper:"-"
            })
        }

    }


    render(){
        const {
            coin_img_url,
            coin_symbol,
            coin_business,
            coin_transaction,
            coin_consensus,
            coin_website,
            coin_asset_type,
            coin_decentralization,
            coin_name,
            coin_sub_business,
            coin_algorithm,
            coin_whitepaper
        }=this.state;
        return(
            <div className="cardBorder">
                <div className="row cardCoin">

                    <div className="col-md-2">
                        <Link to={{
                            pathname: '/coinDetail/' + coin_symbol,
                        }}>
                            <img className="img-thumbnail img-fluid img-new" width={500} height={500} src={coin_img_url} alt={coin_symbol}/>
                        </Link>

                    </div>
                    <div className="col-md-3">
                        <ListGroup>
                            <ListGroup.Item variant="dark"><b>Symbol:</b> {coin_symbol}</ListGroup.Item>
                            <ListGroup.Item variant="dark"><b>Business:</b> {coin_business}</ListGroup.Item>
                            <ListGroup.Item variant="dark"><b>Transaction Anonymity:</b> {coin_transaction}</ListGroup.Item>
                            <ListGroup.Item variant="dark"><b>Consensus:</b> {coin_consensus}</ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div className="col-md-3">
                        <ListGroup>
                            <ListGroup.Item variant="dark"><b>Name:</b> {coin_name}</ListGroup.Item>
                            <ListGroup.Item variant="dark"><b>Sub-Business:</b> {coin_sub_business}</ListGroup.Item>
                            <ListGroup.Item variant="dark"><b>Decentralization Perspective:</b> {coin_decentralization}</ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div className="col-md-2">
                        <ListGroup>
                            <ListGroup.Item variant="dark"><b>Website: </b>
                                <a className="link-text" target="_blank" href={coin_website} rel="noreferrer noopener">
                                    <svg width="1em" height="1em" viewBox="0 0 16 16"
                                         className="bi bi-box-arrow-in-up-right" fill="currentColor">
                                        <path fill-rule="evenodd"
                                              d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"/>
                                        <path fill-rule="evenodd"
                                              d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"/>
                                    </svg>
                                </a>
                            </ListGroup.Item>
                            <ListGroup.Item variant="dark"><b>Asset Type:</b> {coin_asset_type}</ListGroup.Item>
                            <ListGroup.Item variant="dark"><b>Algorithm:</b> {coin_algorithm}</ListGroup.Item>
                        </ListGroup>
                    </div>
                    <div className="col-md-2">
                        <ListGroup variant="flush">
                            <ListGroup.Item variant="dark"><a className="link-text" target="_blank" href={coin_whitepaper} rel="noreferrer noopener"><Button>{"Whitepaper"}</Button></a></ListGroup.Item>
                        </ListGroup>
                    </div>

                </div>
            </div>




        );


    }


}

export default CoinCardList;




