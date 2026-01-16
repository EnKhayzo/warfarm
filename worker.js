self.onmessage = function(event) {
    const { data } = event;
    // Perform some heavy computation or task here
    const result = data * 2; // Example task
    self.postMessage(result);
};
