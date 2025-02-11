class LedStatus {
    public LED_STATUS: {[key: number]: boolean} = {};
    constructor() {
        for (let i = 0; i < 100; i++) {
            this.LED_STATUS[i] = false;
        }
    }
}

export const LED_STATUS = new LedStatus().LED_STATUS;
