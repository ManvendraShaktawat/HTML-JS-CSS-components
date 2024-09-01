class RateLimiter {
  constructor(limit, interval) {
    this.limit = limit;
    this.interval = interval;
    this.timestamps = [];
  }

  isAllowed() {
    const now = Date.now();

    // Remove timestamps that are outside the interval
    while (
      this.timestamps.length > 0 &&
      now - this.timestamps[0] > this.interval
    ) {
      this.timestamps.shift();
    }

    if (this.timestamps.length < this.limit) {
      this.timestamps.push(now);
      return true;
    } else {
      return false;
    }
  }
}

// Usage example
const limiter = new RateLimiter(3, 1000); // Limit to 3 requests per 1 second

function makeRequest() {
  if (limiter.isAllowed()) {
    console.log("Request allowed");
    // Perform the request or action
  } else {
    console.log("Request denied");
  }
}

// Simulate requests
makeRequest();
makeRequest();
makeRequest();
makeRequest();
makeRequest();
setTimeout(makeRequest, 2000);
