(function () {
  function Stream() {
    this.subscribedFunctions = [];
    return {
      subscribe: (callback) => {
        this.subscribedFunctions.push(callback);
      },
      unsubscribe: (callback) => {
        this.subscribedFunctions = this.subscribedFunctions.filter(
          (c) => c !== callback
        );
      },
      push: (value) => {
        for (let callback of this.subscribedFunctions) {
          callback(value);
        }
      },
    };
  }

  let stream1 = new Stream();
  let stream2 = new Stream();

  function subscriber1(value) {
    console.log(`subscriber1 value=${value}`);
  }

  function subscriber2(value) {
    console.log(`subscriber2 value=${value * 10}`);
  }

  function subscriber3(value) {
    console.log(`subscriber3 value=${value * 100}`);
  }

  stream1.subscribe(subscriber1);
  stream2.subscribe(subscriber2);
  stream2.subscribe(subscriber3);

  stream1.push(1);
  stream2.push(2);

  stream1.unsubscribe(subscriber1);
  stream2.unsubscribe(subscriber3);

  stream1.push(3);
  stream2.push(5);
})();
