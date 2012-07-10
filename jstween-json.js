(function() {
  var $, TweenJSON;

  $ = jQuery;

  TweenJSON = (function() {

    function TweenJSON(json) {
      if (typeof json !== "object") throw "Woops! You need to load a json object.";
      this.id = json.id || (function() {
        throw "No id specified.";
      })();
      this.steps = json.steps || (function() {
        throw "No steps specified.";
      })();
      this.stepCount = 0;
    }

    TweenJSON.prototype.loadStep = function(tweenObject) {
      var oldFunc, self;
      if (typeof json !== "object") {
        throw "Woops! Each step has to be a json object.";
      }
      self = this;
      oldFunc = tweenObject.onStop || function() {};
      tweenObject.onStop = function(element) {
        oldFunc(element);
        self.stepCount++;
        console.log(self.steps);
        if (this.stepCount === (self.steps.length - 1)) {
          console.log("tweening finished");
        } else {
          return self.loadStep(self.steps[self.stepCount]);
        }
      };
      $(this.id).tween(tweenObject);
      return $(this.id).play();
    };

    TweenJSON.prototype.play = function() {
      return this.loadStep(this.steps[this.stepCount]);
    };

    return TweenJSON;

  })();

  window.TweenJSON = TweenJSON;

}).call(this);
