import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import CreateModal from './form/CreateModal';
import { BOOKS_API_URL } from '../constants';
class DataTable extends Component {
    deleteItem = id => {
        let confirmDeletion = window.confirm('Do you really wish to delete it?');
        if (confirmDeletion) {
            fetch(`${BOOKS_API_URL}/${id}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => {
                    this.props.deleteItemFromState(id);
                })
                .catch(err => console.log(err));
        }
    }
    render() {
        const items = this.props.items;
        return <Table striped>
            <thead className="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Publish Date</th>
                    <th>Genre</th>
                    <th>Author</th>
                    <th style={{ textAlign: "center" }}>Actions</th>
                </tr>
            </thead>
            <tbody>
                {!items || items.length <= 0 ?
                    <tr>
                        <td colSpan="6" align="center"><b>No Books yet</b></td>
                    </tr>
                    : items.map(item => (
                        <tr key={item.id}>
                            <th scope="row">
                                {item.id}
                            </th>
                            <td>
                                {item.title}
                            </td>
                            <td>
                                {item.publishDate}
                            </td>
                            <td>
                                {item.genre}
                            </td>
                            <td>
                                {item.author}
                            </td>
                            <td align="center">
                                <div>
                                    <CreateModal
                                        isNew={false}
                                        book={item}
                                        updateBookIntoState={this.props.updateState} />
                                    &nbsp;&nbsp;&nbsp;
                                    <Button color="danger" onClick={() => this.deleteItem(item.id)}>Delete</Button>
                                </div>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </Table>;
    }
}
export default DataTable;