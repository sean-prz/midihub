

export class HueController {
    private lightsState: boolean[] = [false, false, false]
    private queue :  { [key: number]: number[] }   =
        {
        1: [],
        2: [],
    }
    constructor() {
        setInterval(this.emptyQueue.bind(this), 100);
    }

    private async hueRequest(light: number, data: object): Promise<void> {
        let url = "http://192.168.1.102/api/Z2G2NTHFfDFc-BV0QMSyO4J2btOkPOgfbvq2T1vV/lights/" + light.toString() + "/state";
        try {
            const response = await fetch(
                url, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

            const result = await response.json();
            console.log('Success:', result);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    public turnOnLight(light: number): void {
        this.hueRequest(light, { on: true });
    }

    public turnOffLight(light: number): void {
        this.hueRequest(light, { on: false });
    }

    public switchLight(light: number): void {
       if (this.lightsState[light]) {
           this.turnOffLight(light);
       } else {
              this.turnOnLight(light);
       }
         this.lightsState[light] = !this.lightsState[light];
    }

    public changeBrightness(light: number, value: number): void {
       this.queue[light].push(value);
    }

    private emptyQueue() {
        for (let light in this.queue) {
            if (this.queue[parseInt(light)].length > 0) {
                console.log('emptying queue for light', light);
                let value = this.queue[light].pop();
                if(value === undefined) {
                    return;
                }
                console.log("new bri: ", value*256)
                this.hueRequest(parseInt(light), { bri: Math.floor(value*2)});
                this.queue[light] = [];
            }
        }
    }

}




//     putRequest('https://192.168.1.102/api/Z2G2NTHFfDFc-BV0QMSyO4J2btOkPOgfbvq2T1vV/lights/2/state', { bri: 2*lastValue });