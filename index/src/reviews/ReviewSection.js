import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import ProductReview from "./ProductReview";
import {getCookie} from "../api/cookies";
import {sendApiRequest} from "../api/request";
import{useNavigate} from "react-router-dom";

export default function ReviewSection(props) {

    const user = useSelector(state => state.userStore.user)
    const reviews = useSelector(state => state.reviewStore.reviews)
    const [areReviewsShown, setAreReviewsShown] = useState(false)
    const [isAddReviewSectionShown, setIsAddReviewSectionShown] = useState(false)
    const [error, setError] = useState("");
    const nav = useNavigate();

    const [reviewFormData, setReviewFormData] = useState({
        productId: props.productId,
        reviewUserName: getCookie("current_username"),
        reviewText: undefined,
        rating: undefined
    })

    function handleReviewChange(event) {
        const {name, value} = event.target
        setReviewFormData(prevReviewFormData => {
            return {
                ...prevReviewFormData,
                [name]: value
            }
        })
    }

    const reviewElements = reviews.map(review => {
        if(review.productId === props.productId){
            return  <ProductReview review={review} key={review.id}/>
        }}
    )

    function toggleShowReviews() {
        return setAreReviewsShown(!areReviewsShown)
    }

    function toggleShowAddReviewSection() {
        return setIsAddReviewSectionShown(!isAddReviewSectionShown)
    }

    function handleSubmitReview() {
        const submitReviewData = {
            "productId": reviewFormData.productId,
            "reviewUserName": reviewFormData.reviewUserName,
            "reviewText": reviewFormData.reviewText,
            "rating": reviewFormData.rating
        };
        sendApiRequest("POST", "/api/addReview", onSubmitReviewSuccess, submitReviewData, errorMessage => setError(errorMessage))
    }

    function onSubmitReviewSuccess() {
        nav("/produkter")
    }

    return (
        <>
            <div className="reviewButtons">
                <button id="readCourseReviewBtn" onClick={toggleShowReviews}>Les kommentarer</button>
                {user && <button id="addCourseReviewBtn" onClick={toggleShowAddReviewSection}>Legg til kommentar</button>}
            </div>

            {areReviewsShown && <div id="prodCommentSection">{reviewElements}</div>}

            {isAddReviewSectionShown &&
                <div id="addProdComment">
                    <p>Skriv en tilbakemelding til oss!</p>
                    <input className="reviewTextField"
                           type="text"
                           placeholder={"Skriv hva du føler om produktet her"}
                           value={reviewFormData.reviewText}
                           name={"reviewText"}
                           onChange={handleReviewChange}
                           />
                    <select className="ratingDrop"
                            value={reviewFormData.rating}
                            name={"rating"}
                            onChange={handleReviewChange}
                            >
                        <option value="hide">{"Din vurdering"}</option>
                        <option value="1">{"1/5"}</option>
                        <option value="2">{"2/5"}</option>
                        <option value="3">{"3/5"}</option>
                        <option value="4">{"4/5"}</option>
                        <option value="5">{"5/5"}</option>
                    </select>
                    <button id="sendCommentBtn" onClick={handleSubmitReview}>Send inn</button>
                </div>}
        </>
    )
}