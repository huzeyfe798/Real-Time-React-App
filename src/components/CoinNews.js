import React, {Component} from 'react';
import Axios from "axios";
import Card from 'react-bootstrap/Card'


export class CoinNews extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coinNews: [],
            coin_symbol: props.coinSymbol,

        }
    }

    componentDidMount() {
        this.getNews();
    }

    componentWillUnmount() {

    }

    getNews() {
        Axios.get(`https://ciswebapi2.cryptoindexseries.com/api/News/NewsSearch?language_code=en&page_size=18&page_number=1&tags=COIN_${this.state.coin_symbol}`).then(resp => {
            console.log(resp.data.data);
            this.setState({
                coinNews: resp.data.data
            });
        }).catch()
    }


    render() {
        const {
            coinNews,
            coin_symbol
        } = this.state;
        return (

            <div className="row">
                <div className="col-md-12">

                    <h1 style={{color: "white", textAlign: "center"}}>{coin_symbol} NEWS</h1>

                </div>
                {
                    coinNews.map((coinNew) => (
                        <div className="col-md-4 coinNewsCardCol">
                            <a style={{color: "black"}} className="link-text" target="_blank" href={coinNew.link}
                               rel="noreferrer noopener">
                                <Card>
                                    <Card.Img variant="top" src={coinNew.image_url}/>
                                    <Card.Body>
                                        <Card.Title>{coinNew.title}:</Card.Title>
                                        <Card.Text>
                                            {coinNew.summary}
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <small className="text-muted">Last updated 3 mins ago</small>
                                    </Card.Footer>
                                </Card>
                            </a>

                        </div>
                    ))
                }

            </div>


        )


    }


}


export default CoinNews;



