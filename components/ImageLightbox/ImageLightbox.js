import React, { Component } from "react";
import Lightbox from "react-image-lightbox";

export default class ImageLightbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
    };
  }

  render() {
    const { photoIndex } = this.state;

    return (
      <Lightbox
        mainSrc={this.props.ImagesList[photoIndex]}
        nextSrc={
          this.props.ImagesList[(photoIndex + 1) % this.props.ImagesList.length]
        }
        prevSrc={
          this.props.ImagesList[
            (photoIndex + this.props.ImagesList.length - 1) %
              this.props.ImagesList.length
          ]
        }
        onCloseRequest={this.props.onCloseRequest}
        onMovePrevRequest={() =>
          this.setState({
            photoIndex:
              (photoIndex + this.props.ImagesList.length - 1) %
              this.props.ImagesList.length,
          })
        }
        onMoveNextRequest={() =>
          this.setState({
            photoIndex: (photoIndex + 1) % this.props.ImagesList.length,
          })
        }
      />
    );
  }
}
