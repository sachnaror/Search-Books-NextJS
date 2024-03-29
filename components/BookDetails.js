import { Col, Image, Row } from 'react-bootstrap';
import Moment from 'react-moment';

import { BookMeta, BookRating, Loading } from '../components';
import { isEmpty, languages, truncate } from '../utils';

const BookDetails = (props) => {
  let title, imageLink, averageRating, ratingsCount, publishedDate, authors, pageCount, categories, language, description, pdfLink, webReaderLink;

  // Set treatise to variables
  if (!isEmpty(props.data)) {
    const { volumeInfo, accessInfo } = props.data;

    title = volumeInfo.title;
    if (volumeInfo.imageLinks !== undefined && !isEmpty(volumeInfo.imageLinks)) {
      imageLink = volumeInfo.imageLinks.thumbnail;
    }
    averageRating = volumeInfo.averageRating;
    ratingsCount = volumeInfo.ratingsCount;
    publishedDate = volumeInfo.publishedDate;
    authors = volumeInfo.authors;
    pageCount = volumeInfo.pageCount;
    categories = volumeInfo.categories;
    language = volumeInfo.language;
    description = volumeInfo.description;
    if (accessInfo.pdf !== undefined && !isEmpty(accessInfo.pdf)) {
      if (accessInfo.pdf.isAvailable) {
        pdfLink = accessInfo.pdf.acsTokenLink;
      }
    }
    webReaderLink = accessInfo.webReaderLink;
  }

  return (
    <article className="BookDetails">
      {
        !isEmpty(props.data) ?
          <Row>
            <Col md="3">
              <Image src={imageLink !== undefined ? imageLink : './static/empty-cover.jpeg'} thumbnail />
              <BookRating rating={averageRating} count={ratingsCount} />
            </Col>
            <Col md="9">
              <h1 className="BookDetails-Heading">
                {title}
                {publishedDate !== undefined && <span> – <Moment date={new Date(publishedDate)} format="YYYY" /></span>}
              </h1>
              <Row>
                {authors !== undefined && authors.length > 0 && <BookMeta name="Author" value={authors.join(', ')} />}
                {pageCount !== undefined && <BookMeta name="Page number" value={pageCount} />}
                {categories !== undefined && <BookMeta name="Category" value={categories} />}
                {language !== undefined && <BookMeta name="Language" value={languages.filter(item => { return item.code === language })[0].name} />}
              </Row>
              {description !== undefined && <p className="BookDetails-Desc">{truncate(description, 500).replace(/<[^>]+>/g, '')}</p>}
              {
                webReaderLink !== undefined &&
                <a
                  target="_blink"
                  href={webReaderLink}
                  className="btn btn-success mr-3"
                >Read Now</a>
              }
              {
                pdfLink !== undefined &&
                <a
                  target="_blink"
                  href={pdfLink}
                  className="btn btn-danger"
                >Download PDF</a>
              }
            </Col>
          </Row> : <Loading />
      }
    </article>
  );
}

export default BookDetails;
