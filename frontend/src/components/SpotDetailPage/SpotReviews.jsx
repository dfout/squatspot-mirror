import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getAllSpotsThunk, getSpotsList } from '../../store/spot';
import { IoIosStar } from "react-icons/io";
import {useParams} from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import { useModal } from '../../context/Modal';
import ReviewModal from '../ReviewModal';

import * as reviewActions from '../../store/review'

import './SpotReview.css'

const SpotReviews = ({numReviews, avgRating, ownerId, reviews, spotId }) =>{
    const dispatch = useDispatch()

    

   useEffect(()=>{
    dispatch(reviewActions.getReviewsForSpotThunk(spotId))
   }, [dispatch, spotId])
    
    // For Post Review Button:
    // Check if user is logged in         T: GreenLight           F: RedLight
    const sessionUser = useSelector((state) => state.session.user);
    const userId = sessionUser.id
    
    // Check if user is the creator of the post   T: RedLight        F: GreenLight
    const isCreator = userId === ownerId;
    // Check if user has already posted a reivew for this spot      T: RightLight   F: GreenLight
    const reviewState = useSelector((state)=>state.reviews)
    // const alreadyReviewed = reviewState[userId]


    // Reviews is an array of two objects. This will not be iterable. unless we change it to be 
   // To Make reviews Iterable:
   const reviewsObj = useSelector((state)=>state.reviews, (reviews)=> Object.values)
    
   const reviewsList = Object.values(reviewsObj)
   const closeMenu = useModal()

//    reviews.forEach((review)=>console.log("a review"))
  

    const alreadyReviewed = ()=>{

        // const reviews = useSelector(
        //     (state)=>state.spots.
        // )
        const sessionUser = useSelector((state) => state.session.user);
        const currUserId = sessionUser.id

        reviews.forEach((entry)=> {
            
            if (entry.userId === currUserId) return true
            
        })
        return false
    }
    console.log(alreadyReviewed(reviews))
    
    

   const canPostReview = sessionUser && !isCreator && !alreadyReviewed(reviews);

    


   // Logic for displayButton will need to be flipped. Button will be disabled={!displayButton}
   // Because when the displayButton function is false, we want disabled to equal true. 



    // Need access to the user information on the review: COMPLETED. User is joined on the each review in the Reviews key. 


    return(
        <>
        <IoIosStar/>
        <span>{avgRating}</span>
        <span>{
            (numReviews === 0 || numReviews === null) ? "New" : numReviews + ' reviews'
        }</span>
        {canPostReview && (
            <OpenModalButton id='review-button' buttonText='Post Your Review' onButtonClick={closeMenu} modalComponent={<ReviewModal spotId={spotId}/>}/>
        )} 
        {alreadyReviewed(reviews) &&(
            <button id='review-button' disabled={true}>Review Submitted</button>
        )}
        {isCreator && (
            <button disabled={true}>You own this spot. Check out the reviews</button>
        )}
        <ul className='spot-reviews'>
        {reviews?.map(({id, userId, User, stars, review, createdAt, updatedAt })=>(
            <li className='review-tile' key={id}>
                <h4>{User.firstName}</h4>
                <span>{createdAt.split('-')[1]}/{createdAt.split('-')[2].split('T')[0]}/{createdAt.split('-')[0]}</span>
                <span>{stars} stars</span>
                <span>{review}</span>
            </li>

        ))}
         </ul>
        
        
        </>
    );
    

}




export default SpotReviews;