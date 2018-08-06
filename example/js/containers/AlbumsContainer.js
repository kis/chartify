import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chartActions from '../actions/chart';
import Chart from '../components/Chart/Chart';

class AlbumsContainer extends Component {
  constructor(props) {
    super();
    const { actions } = props;

    this.state = {
      albumsMetadata: {
        container: 'songs-container',
        header: 'Music albums dataset',
        total: 'music albums total ( X - album release year, Y - times played )',
        chart: 'music',
        getDataset: actions.getAlbums,
      },
    };
  }

  render() {
    const {
      albums, actions,
    } = this.props;
    const { albumsMetadata } = this.state;

    return (
      <Chart
        data={albums}
        metadata={albumsMetadata}
        actions={actions}
      />
    );
  }
}

const mapStateToProps = state => ({
  albums: state.albums,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(chartActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsContainer);
