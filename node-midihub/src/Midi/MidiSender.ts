
import {LED_STATUS} from "./LedStatus";
import {Output} from "easymidi";
import {BOTTOM_ROW, COLORS} from "./MidiConstants";

export class MidiSender {
    private out: Output;
    constructor(out: Output) {
        this.out = out;
        this.resetLed();
    }

    /**
     * Set the LED of all buttons to a specific color
     * @param color
     * @private
     */
    public resetLed() {

        for (let i = 0; i < 128; i++) {
            this.setLed(i, COLORS.OFF);
        }

        BOTTOM_ROW.forEach(note => {
            this.setLed(note, COLORS.RED);
        })
    }
    public nightMode() {
        for (let i = 0; i < 128; i++) {
            this.setLed(i, COLORS.OFF);
        }
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
            note ,
            LED_STATUS[note] ? COLORS.OFF : COLORS.YELLOW
        );
        LED_STATUS[note] = !LED_STATUS[note];
    }
}


