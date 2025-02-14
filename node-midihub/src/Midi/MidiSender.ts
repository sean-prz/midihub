
import {LED_STATUS} from "./LedStatus";
import {Output} from "easymidi";
import {BOTTOM_ROW, COLORS, LIGHTS_LED} from "./MidiConstants";

export class MidiSender {
    private out: Output;
    constructor(out: Output) {
        this.out = out;
        this.resetLed();
    }

    /**
     * Reset the lights on launch or after midnight in the following way:
     * All lights are off except for the task lights on the bottom row which are red.
     */
    public resetLed() {

        for (let i = 0; i < 128; i++) {
            this.setLed(i, COLORS.OFF);
        }

        BOTTOM_ROW.forEach(note => {
            this.setLed(note, COLORS.RED);
        })
    }

    /**
     * Turn off all lights on the launch control
     */
    public nightMode() {
        for (let i = 0; i < 128; i++) {
            this.setLed(i, COLORS.OFF);
        }
    }

    /**
     * Restore the LEDS to the state stored in memory,
     */
    public restoreLed() {
        BOTTOM_ROW.forEach(note => { // The task LEDS
            this.setLed(note, LED_STATUS[note] ? COLORS.GREEN : COLORS.RED);
        })
        LIGHTS_LED.forEach(note => { // The lights LEDS
            this.setLed(note, LED_STATUS[note] ? COLORS.YELLOW : COLORS.OFF);
        })
    }


    /**
     * Set the LED of a button to a specific color
     * @param note
     * @param color
     * @private
     */
    public setLed(note : number, color: number) {
        console.log("Setting LED", note,  Math.floor(color*127));
        this.out.send('noteon', {
            note: note,
            velocity: Math.floor(color*127),
            channel: 1
        });
    }
    public toggleTaskLed(note: number) {
        this.setLed(
            note ,
            LED_STATUS[note] ? COLORS.RED : COLORS.GREEN
        );
        LED_STATUS[note] = !LED_STATUS[note];
    }
    public toggleLightLed(note: number) {
        this.setLed(
            note,
            LED_STATUS[note] ? COLORS.OFF : COLORS.YELLOW
        );
        LED_STATUS[note] = !LED_STATUS[note];
    }
}


