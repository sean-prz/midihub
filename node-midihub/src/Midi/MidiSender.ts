import {Output, WebMidi} from "webmidi";
import {MidiHandler} from "./MidiHandler";
import {MidiConstants, COLORS} from "./MidiConstants";

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
        MidiConstants.NOTE_ARRAY.forEach(note => {
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
}


