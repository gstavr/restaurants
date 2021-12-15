import mongodb from 'mongodb';

const ObjectID = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
  static async injectDB(conn) {
    if (reviews) {
      return;
    }

    try {
      reviews = await conn.db(process.env.RESTREVIEWS_NS).collection('reviews');
    } catch (error) {
      console.log(`Unable to establish collection handles in userDAO: ${error.message}`);
    }
  }

  static async addReview(restaurantId, user, review, date) {
    try {
      const reviewDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        text: review,
        restaurant_id: ObjectID(restaurantId),
      };
      return await reviews.insertOne(reviewDoc);
    } catch (error) {
      console.error(`Unable to post review: ${error}`);
      return { error: error };
    }
  }

  static async updateReview(reviewId, userId, text, date) {
    try {
      const updateReview = await reviews.updateOne({ user_id: userId, _id: ObjectID(reviewId) }, { $set: { text: text, date: date } });

      return updateReview;
    } catch (error) {
      console.error(`Unable to update review: ${error}`);
      return { error: error };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await reviews.deleteOne({ _id: ObjectID(reviewId), user_id: userId });
      return deleteResponse;
    } catch (error) {
      console.error(`Unable to delete review: ${error}`);
      return { error: error };
    }
  }
}
