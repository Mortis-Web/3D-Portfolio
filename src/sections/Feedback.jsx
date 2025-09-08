import { TiStarFullOutline } from 'react-icons/ti';
import { clientReviews } from '../constants';
import Header from '../utils/Header';

const Feedback = () => {
  return (
    <section className="c-space my-20 select-none group">
      <div className="container">
        <Header headerText={'Hear From My Clients'} />
        <div className="client-container">
          {clientReviews.map(review => (
            <article key={review.id} className="client-review hover:brightness-140 duration-200">
              <div>
                <p className="min-h-[96px] font-light text-white">
                  {review.review}
                </p>
              </div>
              <div className="client-content">
                <div className="flex gap-3">
                  <img
                    loading='lazy'
                    src={review.img}
                    alt={review.name}
                    className="h-12 w-12 rounded-full"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-white-800 font-semibold">
                      {review.name}
                    </h3>
                    <h4 className="text-white-500 text-sm font-light md:text-base">
                      {review.position}
                    </h4>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-end gap-2 self-end">
                  {Array.from({ length: review.rating }).map((_, index) => (
                    <TiStarFullOutline
                      key={index}
                      className="text-2xl text-yellow-300"
                    />
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feedback;
