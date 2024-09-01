function DBQuery(asyncDBFunction) {
  this.cache = new Map();
  this.asyncDBFunction = asyncDBFunction;

  return {
    getData: async (key) => {
      if (this.cache.has(key)) {
        console.log("from cache");
        return this.cache.get(key);
      }
      let data = await this.asyncDBFunction(key);
      this.cache.set(key, data);
      return data;
    },
    clearCache: () => {
      this.cache.clear();
    },
    deleteKey: (key) => {
      this.cache.delete(key);
    },
  };
}

function asyncFunc(key) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`data of ${key}`);
    }, 500);
  });
}

const instance1 = new DBQuery(asyncFunc);

(async function () {
  console.log(await instance1.getData(10));
  console.log(await instance1.getData(20));
  console.log(await instance1.getData(10));
  console.log(await instance1.getData(10));
  console.log(await instance1.getData(20));
  instance1.deleteKey(10);
  console.log(await instance1.getData(10));
  instance1.clearCache();
  console.log(await instance1.getData(20));
})();
