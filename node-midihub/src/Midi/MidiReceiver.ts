import {MidiSender} from "./MidiSender";
import {BOTTOM_ROW, COLORS} from "./MidiConstants";
import {HueController} from "../Hue/HueController";
import {ControlChange, Note} from "easymidi";


export class MidiReceiver {
    private nightMode: boolean = false;
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
        } else if (note == 83) {
            console.log("Changing brightness");
            this.hueController.changeBrightness(3, e.value);
        }
        // 19, 35, 55
        else if (note == 19) {
            this.hueController.changeHue(3, {red: e.value})
        } else if (note == 35) {
            this.hueController.changeHue(3, {green: e.value})
        } else if (note == 55) {
            this.hueController.changeHue(3, {blue: e.value})
        }
    }

    /**
     * Handle a button press event on the launch control and dispatch it.
     * @param n - The note pressed
     */
    public handleNoteOn(n: Note) {
        console.log(n.note);
        let note = n.note
        // Bottom row is for task
        if (BOTTOM_ROW.includes(note)) {
            this.midiSender.toggleTaskLed(note);
        }
        // Last 2 Buttons of top row are for light on/off
        if (note == 60) {
           this.hueController.switchLight(2)
            this.midiSender.toggleLightLed(note)
        }
        else if (note == 59) {
            this.hueController.switchLight(3)
            this.midiSender.toggleLightLed(note)
        }
        else if (note == 58) {
            this.hueController.hueRequest(3, {xy: [0.43, 0.40]})
        } else if (note == 41) {
            this.nightMode = !this.nightMode;
            this.nightMode ? this.midiSender.nightMode() :  this.midiSender.restoreLed()
        }
    }
}