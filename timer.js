class Timer {
  // Constructor function called automatically when we create new instance of Timer
  // Pass in references to DOM elements which Timer class will listen to
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }


  start = () => {
    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }
    this.tick();
    this.interval = setInterval(this.tick, 50);
  };

  pause = () => {
    clearInterval(this.interval);
  };

  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - .05;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };

  // ParseInt removes decimal
  // ParseFloat supports decimals inside timer
  get timeRemaining() {
    return parseFloat(this.durationInput.value);
  };

  set timeRemaining(time) {
    this.durationInput.value = time.toFixed(2);
  }
}