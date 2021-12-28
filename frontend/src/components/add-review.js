import React, { useState } from 'react';
import RestaurantDataService from '../services/restaurant';
import { Link, useParams } from 'react-router-dom';

function AddReview(props) {
  console.log(props);
  let params = useParams();

  console.log(params);
  let initialReviewState = '';
  let editing = false;

  if (props?.state && props?.state?.currentReview) {
    editing = true;
    initialReviewState = props.location.state.currentReview.text;
  }

  const [review, setReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (event) => {
    setReview(event.target.value);
  };

  const saveReview = () => {
    let data = {
      text: review,
      name: props.user.name,
      user_id: props.user.id,
      restaurant_id: params.id,
    };

    if (editing) {
      data.review_id = params.state.currentReview._id;
      RestaurantDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(`Response`, response.data);
        })
        .catch((e) => {
          console.log(`Error`, e);
        });
    } else {
      RestaurantDataService.createReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => console.log(`Error`, e));
    }
  };

  return (
    <div>
      {props.user ? (
        <div className='submit-form'>
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <Link to={`/restaurants/${params.id}`} className='btn btn-success'>
                Back to Restaurant
              </Link>
            </div>
          ) : (
            <div>
              <div className='form-group'>
                <label htmlFor='description'> {editing ? 'Edit' : 'Create'}</label>
                <input type={'text'} className='form-control' id='text' required value={review} onChange={handleInputChange} name='text' />
              </div>
              <button onClick={saveReview} className='btn btn-success'>
                Submit
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>Please log in.</div>
      )}
    </div>
  );
}

export default AddReview;
