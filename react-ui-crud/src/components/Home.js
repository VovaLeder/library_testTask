import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import DataTable from './DataTable';
import CreateModal from './form/CreateModal';
import { BOOKS_API_URL } from '../constants';
class Home extends Component {
    state = {
        items: []
    }
    componentDidMount() {
        this.getItens();
    }
    getItens = () => {
        fetch(BOOKS_API_URL)
            .then(res => res.json())
            .then(res => res.map(
                item => {
                    var date = item.publishDate;
                    var y = date.slice(0, 4);
                    var m = date.slice(5, 7);
                    var d = date.slice(8, 10);
                    item.publishDate = new Date(y, m - 1, d).toLocaleDateString("ru-RF");
                    return item;
                })
            )
            .then(res => this.setState({ items: res }))
            .catch(err => console.log(err));
    }
    addBookToState = book => {
        this.setState(previous => ({
            items: [...previous.items, book]
        }));
    }
    updateState = (id) => {
        this.getItens();
    }
    deleteItemFromState = id => {
        const updated = this.state.items.filter(item => item.id !== id);
        this.setState({ items: updated })
    }
    render() {
        return <Container style={{ paddingTop: "100px" }}>
            <Row>
                <Col>
                    <h3>Library</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <DataTable
                        items={this.state.items}
                        updateState={this.updateState}
                        deleteItemFromState={this.deleteItemFromState} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <CreateModal isNew={true} addBookToState={this.addBookToState} />
                </Col>
            </Row>
        </Container>;
    }
}
export default Home;