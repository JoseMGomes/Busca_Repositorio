import React, { Component } from "react";
import { Container, Form, SubmitButton } from "./styles";
import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";
import api from "../../services/api";

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
    };

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value });
    }

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({ loading: true});

        const {newRepo, repositories} = this.state;

        const response = await api.get(`/repos/${newRepo}`)

        const data = {
            name: response.data.full_name,
        };

        this.state({
            repositories: [...repositories, data],
            newRepo: '',
            loading: false,
        });
    };


    render() {
        const { newRepo, loading } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositórios
                </h1>

                <Form onSubmit={this.handleSubmit}>
                    <imput
                     type="text"
                      pleaceholder="Adicionar repositório"
                    value={newRepo}
                    onChange={this.handleInputChange}
                      />

                    <SubmitButton loading={loading}>
                        { loading ? (<FaSpinner color="#FFF" size={14} />):(<FaPlus color="#fff" size={14} />)};
                    </SubmitButton>
                </Form>
            </Container>
        );
    }
}
