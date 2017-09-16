import * as React from 'react';
import './Playlist.css';
import YoutubePlayer from '../../components/youtube-player/YoutubePlayer';

class Playlist extends React.Component {
    state: any;
    listItems: any;
    videoIds: Array<string>;
    constructor(props: any) {
        super(props);
        this.state = {value: ''};
        this.videoIds = [];

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdateIds = this.handleUpdateIds.bind(this);

    }

    handleChange(event: any) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event: any) {
        // To Danny: I have not used here object keys because later i will need to convert
        // to array, then unshift from it, as object doesn't have order, i decided to go with
        // indexOf for simplicity
        if (this.videoIds.indexOf(this.state.value) === -1) {
            this.videoIds.push(this.state.value);
            this.listItems = this.videoIds.map((videoId) =>
                <li key={videoId}>https://www.youtube.com/watch?v={videoId}</li>
            );
            this.setState(this.state);
        }
        event.preventDefault();
    }

    handleUpdateIds(data: Array<string>) {
        this.videoIds = data;
        this.listItems = this.videoIds.map((videoId) =>
            <li key={videoId}>https://www.youtube.com/watch?v={videoId}</li>
        );
        this.setState(this.state);
    }

    render() {
        return (
            <div className="app-body">
                <div className="playlist-body">
                    <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                        <div className="input-body">
                            <label>
                                <input type="text" className="input" value={this.state.value} />
                            </label>
                            <input type="submit" className="input" value="Add" />
                        </div>
                    </form>
                    <div className="list-body">
                        <ul>{this.listItems}</ul>
                    </div>
                </div>
                <YoutubePlayer idValues={this.videoIds} updateIds={this.handleUpdateIds}/>
            </div>
        );
    }
}

export default Playlist;
