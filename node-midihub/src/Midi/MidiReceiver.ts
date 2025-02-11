import {MidiSender} from "./MidiSender";
import {ControlChangeMessageEvent, NoteMessageEvent} from "webmidi";
import {BOTTOM_ROW, COLORS} from "./MidiConstants";


export class MidiReceiver {

    private midiSender : MidiSender;

    constructor(midiSender: MidiSender) {
        this.midiSender = midiSender;
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
        let note = e.note.number;
        // Bottom row is for task
        if (BOTTOM_ROW.includes(note)) {
            this.midiSender.toggleTaskLed(note);
        }
    }
}