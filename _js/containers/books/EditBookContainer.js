import React from 'react';
import Slider from 'react-slick';
import $ from 'jQuery';

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
		reviews: []
	};

  componentDidMount() {
    this.loadChapters();
  }

  loadChapters = () => {
    $.get(`${apiUrl}/books/${bookId}/chapters`)
      .then(res => {
        const nextState= {chapters: res.data };
        this.setState(nextState);
      });
  }

	loadReviews = () => {
    $.get(`${apiUrl}/books/${bookId}/reviews`)
      .then(res => {
        this.setState({reviews: res.data});
      }).catch((err)=>{
				console.log(err);
			})
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
    let pages = [];

    this.state.chapters.map(function(chapter,index){
      pages.push(
        <div className="content-block content-block-standard-slide chapter-begin"><div><h4>Chapter {chapter.number}</h4><span className="chapter-name">{chapter.name}</span></div></div>,
        <EditorContainer bookId={bookId} chapterNumber={chapter.number} chapterId={chapter._id} />,
        //<ViewBookContainer bookId={bookId} chapterId={chapter.number} />
      )
    })

    if(this.state.chapters.length){
      slides.push(...pages);
    }

    return slides.map(function(slide, index) {
      return (
        <div key={index}>{slide}</div>
      )
    })
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
      <DescriptionContainer bookId={this.props.bookId} authorized={this.props.authorized} following={this.props.following} admin={this.props.admin} getBook={this.props.getBook}/>,
      <TOCContainer bookId={this.props.bookId} loadChapters={this.loadChapters} selectChapter={this.selectChapter} chapters={this.state.chapters} authorized={this.props.authorized}/>,
    ];
    return (
      <div>
        <div className="book-top-half">
          <DetailsContainer bookId={this.props.bookId} toggleStatus={this.props.toggleStatus} toggleScreen={this.props.toggleScreen} book={this.props.book} length={this.state.chapters.length} following={this.props.following} authorized={this.props.authorized}/>
          <Placeholder />
        </div>
        <Slider ref='slider' {...settings}>
          {this.loadSlides(slides)}
        </Slider>
      </div>
    );
  }
}
