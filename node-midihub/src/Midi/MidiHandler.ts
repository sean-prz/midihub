import * as easymidi from 'easymidi';
import {MidiSender} from "./MidiSender";
import {MidiReceiver} from "./MidiReceiver";

export class MidiHandler {

    constructor() {
        const inputs = easymidi.getInputs();
        const outputs = easymidi.getOutputs();
        console.log(inputs.length);
        for (let input of inputs) {
            console.log(input);
           if (input.includes("Launch Control XL")) {
               console.log("Found Launch Control XL");
               const midiSender = new MidiSender(new easymidi.Output(outputs[inputs.indexOf(input)]));
               const midiReceiver = new MidiReceiver(midiSender);
               new easymidi.Input(input).on('noteon', (msg) => {
                   console.log(msg);
                   midiReceiver.handleNoteOn(msg);
               });
               new easymidi.Input(input).on('cc', (msg) => {
                     console.log(msg);
                   midiReceiver.handleControlChange(msg);
               });
           }
        }
    }
}
