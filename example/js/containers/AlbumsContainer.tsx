import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as chartActions from '../actions/chart';
import Chart from '../components/Chart/Chart';

interface Props {
  albums: any;
	actions: any;
}

class AlbumsContainer extends Component<Props, any> {
  constructor(props: Props) {
    super(props);
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

const mapStateToProps = (state: any) => ({
  albums: state.albums,
});

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(chartActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsContainer);
