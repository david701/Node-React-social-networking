import React from 'react';
import Slider from 'react-slick';

import DetailsContainer from './DetailsContainer';
import EditorContainer from './EditorContainer';
import TOCContainer from './TOCContainer';
import DescriptionContainer from './DescriptionContainer';

const apiUrl = '/api/v1';


function SampleNextArrow(props) {
  const {className, style, onClick} = props;
  return (
    <div
      className={className}
      style={{...style, display: 'block', background: 'red'}}
      onClick={onClick}
    ></div>
 );
}

function SamplePrevArrow(props) {
  const {className, style, onClick} = props;
  return (
    <div
      className={className}
      style={{...style, display: 'block', background: 'green'}}
      onClick={onClick}
    ></div>
 );
}

const Placeholder = props => (
  <div className="content-block content-block-standard-new">
    <div className="placeholder">
      <h4>Ad Space</h4>
    </div>
  </div>
);

export default class EditBookContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChapter: null,
      chapters: []
    };
  }

  componentDidMount() {
    this.loadChapters();
  }

  loadChapters = () => {
    fetch(`${apiUrl}/books/${bookId}/chapters`)
      .then(res => res.json())
      .then(res => {
        const nextState= { ...this.state, chapters: res.data };
        this.setState(nextState);
      });
  }

  selectChapter = id => {
    const nextState = { ...this.state, selectedChapter: id.toString() };
    this.setState(nextState);
  }

  render() {
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    const slides = [
      <DescriptionContainer description={this.props.description} />,
      <TOCContainer bookId={this.props.bookId} loadChapters={this.loadChapters} selectChapter={this.selectChapter} chapters={this.state.chapters} />,
      <EditorContainer bookId={this.props.bookId} chapterId={this.state.selectedChapter} />
    ];
    return (
      <div>
        <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'flex-start' }}>
          <DetailsContainer bookId={this.props.bookId} length={this.state.chapters.length} />
          <Placeholder />
        </div>
        <Slider {...settings}>
          {slides.length && slides.map((slide, index) => <div key={index}>{slide}</div>)}
          {/* {this.state.selectedChapter ? <EditorContainer bookId={this.props.bookId} chapterId={this.state.selectedChapter} /> : '' } */}
        </Slider>
      </div>
    );
  }
}
