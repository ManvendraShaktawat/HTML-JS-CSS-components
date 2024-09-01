// returns the state of *all* features for current user
function fetchAllFeatures() {
  // in reality, this would have been a `fetch` call:
  // `fetch("/api/features/all")`
  return new Promise((resolve) => {
    const sampleFeatures = {
      "extended-summary": true,
      "feedback-dialog": false,
    };

    setTimeout(resolve, 100, sampleFeatures);
  });
}

function getFeatureState(featureFlagStr, defaultValue = "default") {
  this.sampleFeatures =
    JSON.parse(localStorage.getItem("sampleFeatures")) || {};
  if (this.sampleFeatures) {
    fetchAllFeatures()
      .then((sampleFeatures) => {
        this.sampleFeatures = sampleFeatures;
        localStorage.setItem("sampleFeatures", JSON.stringify(sampleFeatures));
      })
      .catch(() => console.log("error fetchAllFeatures"));
  }

  return new Promise((resolve, reject) => {
    if (this.sampleFeatures[featureFlagStr] === undefined) {
      this.sampleFeatures[featureFlagStr] = defaultValue;
    }
    resolve(this.sampleFeatures[featureFlagStr]);
  });
}

// src/feature-x/summary.js
getFeatureState("extended-summary").then(function (isEnabled) {
  if (isEnabled) {
    console.log("extended-summary enabled");
  } else {
    console.log("extended-summary disabled");
  }
});

// src/feature-y/feedback-dialog.js
getFeatureState("feedback-dialog").then(function (isEnabled) {
  if (isEnabled) {
    console.log("feedback-dialog enabled");
  }
});

// src/feature-y/feedback-dialog.js
getFeatureState("feedback-dialog-2", true).then(function (isEnabled) {
  if (isEnabled) {
    console.log("feedback-dialog-2 enabled");
  }
});
