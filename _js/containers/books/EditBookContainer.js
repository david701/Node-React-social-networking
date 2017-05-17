import React from 'react';
import Slider from 'react-slick';

import DetailsContainer from './DetailsContainer';
import EditorContainer from './EditorContainer';
import TOCContainer from './TOCContainer';
import DescriptionContainer from './DescriptionContainer';
import ViewBookContainer from './ViewBookContainer';

const apiUrl = '/api/v1';

const Placeholder = props => (
  <div className="content-block content-block-standard-new">
    <div className="placeholder">
      <h4>Ad Space</h4>
    </div>
  </div>
);


export default class EditBookContainer extends React.Component {
	state = {
		selectedChapter: null,
		chapters: [],
		authorized: false
	};

  componentDidMount() {
    this.loadChapters();
  }

  loadChapters = () => {
    fetch(`${apiUrl}/books/${bookId}/chapters`)
      .then(res => res.json())
      .then(res => {
        const nextState= {chapters: res.data };
        this.setState(nextState);
      });
  }

  selectChapter = id => {
    const nextState = {selectedChapter: id.toString() };
    this.setState(nextState, (id) => {
      this.refs.slider.slickGoTo(parseInt(this.state.selectedChapter)); // manual, can change later
    });
  }

  loadSlides = slides => {
    const { bookId } = this.props;
    const { selectedChapter } = this.state;
    const shownSlides = [
      ...slides,
      <EditorContainer bookId={bookId} chapterNumber={selectedChapter} />,
      <ViewBookContainer bookId={bookId} chapterId={selectedChapter} />,
      <div className="content-block content-block-standard-slide"><h4>Chapter {selectedChapter}</h4></div>
    ];
    return shownSlides.map((slide, index) => <div key={index}>{slide}</div>);
  }

  render() {
    const { bookId } = this.props;
    const { chapters, selectedChapter } = this.state;
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1
    };
    const slides = [
      <DescriptionContainer bookId={this.props.bookId} authorized={this.props.authorized} />,
      <TOCContainer bookId={this.props.bookId} loadChapters={this.loadChapters} selectChapter={this.selectChapter} chapters={this.state.chapters} authorized={this.props.authorized}/>,
      <EditorContainer bookId={this.props.bookId} chapterId={this.state.selectedChapter} authorized={this.props.authorized} />
    ];
    return (
      <div>
        <div style={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'flex-start' }}>
          <DetailsContainer bookId={this.props.bookId} book={this.props.book} length={this.state.chapters.length} following={this.props.following} authorized={this.props.authorized}/>
          <Placeholder />
        </div>
        <Slider ref='slider' {...settings}>
          {this.loadSlides(slides)}
        </Slider>
      </div>
    );
  }
}
