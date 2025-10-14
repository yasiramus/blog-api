import { rateLimit } from 'express-rate-limit';

/**rate limit configuration */
const limiter = rateLimit({
  windowMs: 60000, //1 minute
  limit: 60, //max 60 requests per windowMs per IP
  standardHeaders: 'draft-8', //to return rate limit info in the `RateLimit-*` headers according to the latest draft-8 version of the rate limit spec
  legacyHeaders: false, //disable the `X-RateLimit-*` headers
  message: {
    status: 429,
    error:
      'You have sent too many requests in a given amount of time, Please try again later',
  },
});

export default limiter;
