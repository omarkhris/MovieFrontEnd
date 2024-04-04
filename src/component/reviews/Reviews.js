import React, { useEffect, useRef, useState } from "react";
import api from '../../api/axiosConfig';
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "../reviewForm/ReviewForm";

function Reviews({ getMovieData, movie, reviews, setReviews }) {
    const [reviewError, setReviewError] = useState(false); // State variable to track empty review error
    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {
        getMovieData(movieId);
    }, [getMovieData, movieId]);

    const addReview = async (e) => {
        try {
            e.preventDefault();
            const rev = revText.current;

            // Check if the review body is empty
            if (!rev.value.trim()) {
                setReviewError(true); // Set review error to true
                return; // Exit the function early
            }

            // If the review body is not empty, proceed with the API request
            const response = await api.post("/api/v1/reviews", { reviewBody: rev.value, imdbId: movieId });
            const updatedReviews = [...reviews, { body: rev.value }];
            rev.value = "";
            setReviews(updatedReviews);
            setReviewError(false); // Reset review error to false
        } catch (err) {
            console.log(err);
        }
    };

    const title = movie?.title;

    return (
        <Container>
            <Row>
                <Col><h3>Reviews</h3></Col>
                <Col><h2>{title}</h2></Col>
            </Row>
            <Row className="mt-2">
                <Col>
                    <img src={movie?.poster} alt="" />
                </Col>
                <Col>
                    <>
                        <Row>
                            <Col>
                                <ReviewForm handleSubmit={addReview} revText={revText} labelText="Share your experience by writing a Review?" />
                                {reviewError && <p style={{ color: 'red' }}>Review cannot be empty</p>} {/* Display error message if review is empty */}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <hr />
                            </Col>
                        </Row>
                    </>
                    {
                        reviews?.map((r, index) => (
                            <React.Fragment key={index}>
                                <Row>
                                    <Col>{r.body}</Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <hr />
                                    </Col>
                                </Row>
                            </React.Fragment>
                        ))
                    }
                </Col>
            </Row>
            <Row>
                <Col>
                    <hr />
                </Col>
            </Row>
        </Container>
    )
}

export default Reviews;
