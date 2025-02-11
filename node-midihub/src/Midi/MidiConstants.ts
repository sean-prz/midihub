export class MidiConstants {
    public static readonly NOTE_ARRAY: number[] = [41, 42, 43, 44, 57, 58, 59, 60, 73, 74, 75, 76, 89, 90, 91, 92];
    public static readonly COLORS = {
        OFF: 12 / 127,
        RED: 15 / 127,
        GREEN: 60 / 127,
        YELLOW: 31 / 127
    };
}
export const COLORS = MidiConstants.COLORS;
export const TOP_ROW = [41, 42, 43, 44, 57, 58, 59, 60];
export const BOTTOM_ROW = [73, 74, 75, 76, 89, 90, 91, 92];