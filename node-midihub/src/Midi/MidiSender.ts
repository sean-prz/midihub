import {Output, WebMidi} from "webmidi";
import {MidiHandler} from "./MidiHandler";
import {MidiConstants, COLORS, BOTTOM_ROW} from "./MidiConstants";
import {LED_STATUS} from "./LedStatus";

export class MidiSender {
    private out: Output;
    constructor(out: Output) {
        this.out = out;
        this.resetLed(COLORS.RED);
    }

    /**
     * Set the LED of all buttons to a specific color
     * @param color
     * @private
     */
    private resetLed(color: number) {

        for (let i = 0; i < 128; i++) {
            this.setLed(i, COLORS.OFF);
        }

        BOTTOM_ROW.forEach(note => {
            this.setLed(note, color);
        })
    }

    /**
     * Set the LED of a button to a specific color
     * @param note
     * @param color
     * @private
     */
    public setLed(note : number, color: number) {
        this.out.channels[1].playNote(note, {attack: color})
    }
    public toggleTaskLed(note: number) {
        this.setLed(
            note ,
            LED_STATUS[note] ? COLORS.RED : COLORS.GREEN
        );
        LED_STATUS[note] = !LED_STATUS[note];
    }
}


