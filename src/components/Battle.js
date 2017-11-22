import React from "react";
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

import PlayerPreview from './PlayerPreview';

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const val = e.target.value;
        this.setState(() => {
            return {
                username: val
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        this.props.onSubmit(
            this.props.id,
            this.state.username
        )

    }

    render() {
        return (
            <form className="column" onSubmit={this.handleSubmit}>
                <label htmlFor="username" className="header">
                    {this.props.label}
                </label>
                <input type="text" id="username" placeholder="github username" autoComplete="off"
                       value={this.state.username} onChange={this.handleChange}/>
                <button className="button" type="submit" disabled={!this.state.username}>Submit</button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default class Battle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleReset(id) {
        this.setState(() => {
            const newState = {};
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null;
            return newState;
        })
    }

    handleSubmit(id, username) {
        this.setState(() => {
            const newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
            return newState;
        });
    }

    render() {
        const match = this.props.match;
        const playerOneName = this.state.playerOneName;
        const playerTwoName = this.state.playerTwoName;
        const playerOneImage = this.state.playerOneImage;
        const playerTwoImage = this.state.playerTwoImage;
        return (
            <div>
                <div className="row">
                    {/* Player One */}
                    {!playerOneName && <PlayerInput id="playerOne" label="Player One" onSubmit={this.handleSubmit}/>}
                    {playerOneImage !== null && <PlayerPreview avatar={playerOneImage} username={playerOneName}>
                        <button className="reset" onClick={this.handleReset.bind(null, "playerOne")}>Reset!</button>
                    </PlayerPreview>}

                    {/* Player Two */}
                    {!playerTwoName && <PlayerInput id="playerTwo" label="Player Two" onSubmit={this.handleSubmit}/>}
                    {playerTwoImage !== null && <PlayerPreview avatar={playerTwoImage} username={playerTwoName}>
                        <button className="reset" onClick={this.handleReset.bind(null, "playerTwo")}>Reset!</button>
                    </PlayerPreview>}
                </div>

                {/* Battle Button */}
                {playerOneImage && playerTwoImage && <Link className="button" to={{
                    pathname: match.url + '/results',
                    search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                }}>Battle</Link>}
            </div>
        )
    }
}