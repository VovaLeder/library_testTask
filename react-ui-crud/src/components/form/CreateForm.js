import React from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { BOOKS_API_URL } from '../../constants';
class CreateForm extends React.Component {
    state = {
        id: 0,
        title: '',
        publishDate: new Date(),
        genre: '',
        author: ''
    }
    componentDidMount() {
        if (this.props.book) {
            const { id, title, publishDate, genre, author } = this.props.book
            this.setState({ id, title, publishDate, genre, author });
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitNew = e => {
        e.preventDefault();
        fetch(`${BOOKS_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                publishDate: this.state.publishDate,
                genre: this.state.genre,
                author: this.state.author
            })
        })
            .then(res => res.json())
            .then(book => {
                this.props.addBookToState(book);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
    submitEdit = e => {
        e.preventDefault();
        fetch(`${BOOKS_API_URL}/${this.state.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                publishDate: this.state.publishDate,
                genre: this.state.genre,
                author: this.state.author
            })
        })
            .then(() => {
                this.props.toggle();
                this.props.updateBookIntoState(this.state.id);
            })
            .catch(err => console.log(err));
    }
    render() {
        return <Form onSubmit={this.props.book ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="title">Title:</Label>
                <Input type="text" name="title" onChange={this.onChange} value={this.state.title === '' ? '' : this.state.title} />
            </FormGroup>
            <FormGroup>
                <Label for="publishDate">Publish Date:</Label>
                <Input type="date" name="publishDate" onChange={this.onChange} value={this.state.publishDate === null ? '' : this.state.publishDate} />
            </FormGroup>
            <FormGroup>
                <Label for="genre">Genre:</Label>
                <Input type="text" name="genre" onChange={this.onChange} value={this.state.genre === null ? '' : this.state.genre} />
            </FormGroup>
            <FormGroup>
                <Label for="author">Author:</Label>
                <Input type="text" name="author" onChange={this.onChange} value={this.state.author === null ? '' : this.state.author} />
            </FormGroup>
            <Button>Send</Button>
        </Form>;
    }
}
export default CreateForm;