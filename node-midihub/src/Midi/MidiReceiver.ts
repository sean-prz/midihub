import {MidiSender} from "./MidiSender";
import {ControlChangeMessageEvent, NoteMessageEvent} from "webmidi";
import {COLORS} from "./MidiConstants";
import {LedStatus} from "./LedStatus";


export class MidiReceiver {

    private midiSender : MidiSender;
    private readonly LED_STATUS: {[key: number]: boolean} = {};

    constructor(midiSender: MidiSender) {
        this.midiSender = midiSender;
        this.LED_STATUS = new LedStatus().LED_STATUS;
    }

    /**
     * Handle all controls change event and dispatch them
     * @param e
     */
    public handleControlChange(e: ControlChangeMessageEvent) {
        console.log(e.controller.number, e.value);
    }

    /**
     * Handle all note on event and dispatch them
     * @param e
     */
    public handleNoteOn(e: NoteMessageEvent) {
        this.midiSender.setLed(
            e.note.number,
            this.LED_STATUS[e.note.number] ? COLORS.RED : COLORS.GREEN
        );
        this.LED_STATUS[e.note.number] = !this.LED_STATUS[e.note.number];
    }
}