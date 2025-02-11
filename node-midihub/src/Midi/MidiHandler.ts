import {WebMidi} from "webmidi";
import {MidiSender} from "./MidiSender";
import {MidiReceiver} from "./MidiReceiver";

export class MidiHandler {

    constructor() {
        console.log('Happy developing ✨')
        WebMidi
            .enable()
            .then(onEnabled)
            .catch(err => alert(err));
    }
}

function onEnabled() {
    let midiSender: MidiSender | null = null;

    WebMidi.outputs.forEach(output => {
        if (output.name == "Launch Control XL") {
            console.log(output.manufacturer, output.name);
            midiSender = new MidiSender(output);
        }
    });

    if(midiSender) {
        const midiReceiver = new MidiReceiver(midiSender);
        WebMidi.inputs[0].addListener("controlchange", e => midiReceiver.handleControlChange(e));
        WebMidi.inputs[0].addListener("noteon", e => midiReceiver.handleNoteOn(e));
    }
}