class DataService {
    constructor() {
        this.subscribers = {}; // Store event subscribers
        this.data = {};

        setInterval(() => {
            for (let i = 0; i < 28; i++) {
                if (!this.data[i + 1]) {
                    this.data[i + 1] = 100;
                }
                this.data[i + 1]++; // Increment value
            }
            this.publish("plcData", this.data); // Publish the new data
        }, 1000);
    }

    // Subscribe to an event
    subscribe(event, callback) {
        if (!this.subscribers[event]) {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(callback);
    }

    // Unsubscribe from an event
    unsubscribe(event, callback) {
        if (this.subscribers[event]) {
            this.subscribers[event] = this.subscribers[event].filter(cb => cb !== callback);
        }
    }

    // Publish an event
    publish(event, data) {
        if (this.subscribers[event]) {
            this.subscribers[event].forEach(callback => callback(data));
        }
    }
}

// Create a singleton instance
const dataService = new DataService();
export default dataService;
