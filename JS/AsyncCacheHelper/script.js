/**
 * Given that your team has a lot of async functions (or apis ).
 * Can you build a helper/wrapper to optimise their functions, by caching the results across executions.
 *
 * Requirements:
 *  Cache respponse - localstorage
 *  Time based Expiry
 *  LRU expiry
 *  avoid making duplicate API calls while the first one is in progress
 */

function asyncWrapper(asyncFn) {
  function createKey(args) {
    let key = asyncFn.name;
    if (args.length) {
      key += args.join("-");
    }
    return key;
  }

  function fetchFromCache(key, resolve) {
    const cachedRes = localStorage.getItem(key);
    if (cachedRes) {
      if (cachedRes === "pending") {
        setTimeout(() => {
          fetchFromCache(key, resolve);
        }, 1000);
      } else {
        const { data, validTill } = JSON.parse(cachedRes);
        if (validTill < new Date().getTime()) {
          localStorage.removeItem(key);
          return false;
        }
        console.log("From cache");
        resolve(data);
      }
      return true;
    }
  }

  async function makeAPICall(key, resolve, args) {
    localStorage.setItem(key, "pending");
    const { data, validTill } = await asyncFn(...args);
    localStorage.setItem(key, JSON.stringify({ data, validTill }));
    resolve(data);
  }

  return async function (...args) {
    return new Promise(async (resolve, reject) => {
      try {
        const key = createKey(args);
        const found = fetchFromCache(key, resolve);
        if (found) {
          return;
        }
        // Call the original async function if no cache found
        await makeAPICall(key, resolve, args);
      } catch (err) {
        console.log("catch", err);
        reject("Error while making the request");
      }
    });
  };
}

function asyncAdd(a, b) {
  return new Promise((resolve) => {
    console.log(`Calling the API for ${a} and ${b}...`);
    setTimeout(() => {
      resolve({ data: a + b, validTill: new Date().getTime() + 2000 }); // 2 second future timestamp
    }, 1000);
  });
}

const helperAsyncAdd = asyncWrapper(asyncAdd);

helperAsyncAdd(1, 2).then((res) => {
  console.log(`Call-1 output = ${res}`);
});
helperAsyncAdd(3, 4).then((res) => {
  console.log(`Call-2 output = ${res}`);
});
setTimeout(() => {
  helperAsyncAdd(1, 2).then((res) => {
    console.log(`Call-3 output = ${res}`);
  });
}, 1000);

setTimeout(() => {
  helperAsyncAdd(1, 2).then((res) => {
    console.log(`Call-4 output = ${res}`);
  });
  setTimeout(() => {
    helperAsyncAdd(1, 2).then((res) => {
      console.log(`Call-5 output = ${res}`);
    });
  }, 1000);
}, 3000);
