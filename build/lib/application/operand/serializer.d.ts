import { Operand } from '../../domain';
export declare class OperandSerializer {
    clone(sentence: Operand): Operand;
    serialize(sentence: Operand): string;
    deserialize(value: string): Operand;
    private _serialize;
    private _deserialize;
}
