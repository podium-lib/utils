import { EventEmitter } from 'node:events';

export class Hints extends EventEmitter {
    #expectedHints = new Set();
    #receivedHints = new Set();

    // pointless constructor with super to appease TS which cryptically errors otherwise.
    constructor() {
        super();
    }

    /**
     * Adds a new expected hint to the set
     * Expected hints are used to determine if all hints have been received
     * @param {string} name - The name of the hint
     */
    addExpectedHint(name) {
        this.#expectedHints.add(name);
    }

    /**
     * Adds a new received hint to the set
     * After each hint has been received, we check if all hints have been received
     * and emit the 'complete' event if so
     * @param {string} name - The name of the hint
     */
    addReceivedHint(name) {
        this.#receivedHints.add(name);
        if (this.allHintsReceived) {
            this.emit('complete');
        }
    }

    /**
     * Value will be true if all expected hints have been received
     */
    get allHintsReceived() {
        return (
            this.#expectedHints.size === this.#receivedHints.size &&
            [...this.#expectedHints].every((x) => this.#receivedHints.has(x))
        );
    }
}
