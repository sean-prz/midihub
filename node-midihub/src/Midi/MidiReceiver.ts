import {MidiSender} from "./MidiSender";
import {BOTTOM_ROW, COLORS} from "./MidiConstants";
import {HueController} from "../Hue/HueController";
import {ControlChange, Note} from "easymidi";


export class MidiReceiver {

    private midiSender : MidiSender;
    private hueController: HueController;
    constructor(midiSender: MidiSender) {
        this.midiSender = midiSender;
        this.hueController = new HueController();
    }

    /**
     * Handle all controls change event and dispatch them
     * @param e
     */
    public handleControlChange(e: ControlChange) {
        console.log(e.controller, e.value);
        let note = e.controller;
        if (note == 84) {
            this.hueController.changeBrightness(2, e.value);
        }
    }

    /**
     * Handle all note on event and dispatch them
     * @param e
     */
    public handleNoteOn(e: Note) {
        console.log(e.note);
        let note = e.note
        // Bottom row is for task
        if (BOTTOM_ROW.includes(note)) {
            this.midiSender.toggleTaskLed(note);
        }
        // Last 2 Buttons of top row are for light on/off
        if ( note == 60) {
           this.hueController.switchLight(2)
            this.midiSender.toggleLightLed(note)
        }
    }
}