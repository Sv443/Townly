class StatePromise
{
    constructor(promise)
    {
        if(!(promise instanceof Promise))
            throw new TypeError(`Wrong type provided in constructor of StatePromise - expected instance of "Promise" class`);

        /** @type {Promise} */
        this.intPromise = promise;
        this.state = "initialized";
    }

    exec()
    {
        this.state = "pending";

        return new Promise((res, rej) => {
            this.intPromise.then((...args) => {
                this.state = "fulfilled";
                return res(...args);
            }).catch((...args) => {
                this.state = "rejected";
                return rej(...args);
            });
        });
    }

    getState()
    {
        return this.state;
    }
}

module.exports = StatePromise;
