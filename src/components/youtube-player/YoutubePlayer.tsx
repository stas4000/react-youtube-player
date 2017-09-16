import * as React from 'react';
import YouTube from '../../../node_modules/react-youtube';
import './YoutubePlayer.css';

class YoutubePlayer extends React.Component {
    props: any;
    playCount: number;
    stateChangeCount: number;

    constructor(props: any) {
        super(props);

        this._onStateChange = this._onStateChange.bind(this);
        this._onReady = this._onReady.bind(this);
        this._onEnd = this._onEnd.bind(this);

        this.playCount = 0;
        this.stateChangeCount = 0;
    }
    render() {
        const opts = {
            height: '450',
            width: '739',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1,
                // controls: 0
            }
        };

        return (
            <div className="player">
                <YouTube
                    opts={opts}
                    onReady={this._onReady}
                    onEnd={this._onEnd}
                    onStateChange={this._onStateChange}
                />
            </div>
        );
    }
    _onStateChange(event: any) {
        if (this.stateChangeCount === 0) {
            this.stateChangeCount++;
            if (event.data === -1) {
                event.target.loadPlaylist(this.props.idValues);
            }
        }
    }
    _onReady(event: any) {
        if (this.props.idValues.length !== 0) {
            event.target.loadPlaylist(this.props.idValues);
        }
    }
    _onEnd(event: any) {
        // handle 0 id values
        this.props.idValues.shift();
        this.props.updateIds(this.props.idValues);
        event.target.loadPlaylist(this.props.idValues);
        this.playCount = 0;
    }
}

export default YoutubePlayer;
