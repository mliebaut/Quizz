import {isValidObjectId, Types} from 'mongoose';
import {ObjectId} from 'mongodb';

export default {
    canBeNull: function (data: unknown): boolean {
        const type: string = (typeof data);
        return (type === null) || (type === 'string ' && (data as string).trim() === '');
    },
    canBeInteger: function (data: unknown): boolean {
        const type: string = (typeof data);
        return (type === 'number' && Number.isInteger(data)) || (type === 'string' && (data as string).trim().match(/^[0-9]*$/) !== null);
    },
    canBeNumber: function (data: unknown, precision: number | null = null): boolean {
        precision = (precision !== null && Number.isInteger(precision)) ? precision : null;
        const type: string = (typeof data);
        const regex = new RegExp('^[0-9]+((.|,)[0-9]' + ((precision !== null) ? '{1,' + precision + '}' : '+') + ')?$');
        return ((type === 'number') || (type === 'string' && regex.test(data as string)));
    },
    integerOrNull: function (data: unknown): number | null | undefined {
        return this.canBeNull(data) ? null : this.integer(data);
    },
    integer: function (data: unknown): number | undefined {
        return this.canBeInteger(data) ? parseInt(data as any, 10) : undefined;
    },
    numberOrNull: function (data: unknown): number | null | undefined {
        return this.canBeNull(data) ? null : this.number(data);
    },
    number: function (data: unknown): number | undefined {
        if (this.canBeNumber(data)) {
            const type: string = (typeof data);
            if (type === 'number') {
                return (data as number);
            }
            if (type === 'string') {
                return parseFloat((data as string).replace(',', '.'));
            }
        }
        return undefined;
    },
    stringOrNull: function (data: unknown): string | null | undefined {
        const string: string | undefined = this.string(data);
        if (string !== undefined) {
            return string;
        }
        return (this.canBeNull(data) ? null : undefined);
    },
    string: function (data: unknown): string | undefined {
        const type: string = (typeof data);
        if (type === 'string') {
            return (data as string);
        } else if (type === 'number') {
            return (data as number).toString();
        }
        return undefined;
    },
    object: function (data: unknown): Record<string | number | symbol, unknown> | undefined {
        if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
            return data as Record<string | number | symbol, unknown>;
        }
        return undefined;
    },
    nonEmptyString: function (data: unknown): string | undefined {
        const string = this.string(data);
        return (((typeof string) === 'string') && (string as string).length > 0) ? string : undefined;
    },
    areDefined: function (data: unknown[]): boolean {
        return data.reduce((previous, current) => (this.isDefined(current) && previous), true) as boolean;
    },
    isDefined: function (data: unknown): boolean {
        return (data !== undefined);
    },
    mongoObjectId: function (data: unknown): Types.ObjectId | undefined {
        if (isValidObjectId(data) && (new ObjectId(data as Types.ObjectId)).toString() === data) {
            return new Types.ObjectId(data as any);
        }
        return undefined;
    },
    boolean: function (data: unknown): boolean | undefined {
        if (typeof data !== 'boolean') {
            return undefined;
        }
        return data as boolean;
    },
    isInEnum: function (data: unknown, enumToSearch: Record<string, string | number>): string | undefined {
        const string = this.string(data);
        if (typeof string !== 'string') {
            return undefined;
        }
        return Object.values(enumToSearch).includes(string) ? string : undefined;
    },
    array: function (data: unknown): unknown[] | undefined {
        if (Array.isArray(data)) {
            return (data as unknown[]);
        }
        return undefined;
    },
    arrayOfString: function (data: unknown): string[] | undefined {
        const array = this.array(data);
        const newArray = [];
        if (array === undefined) {
            return undefined;
        }
        for (const elt of array) {
            newArray.push(this.string(elt));
        }
        return newArray as string[];
    },
    arrayOfNumber: function (data: unknown): number[] | undefined {
        const array = this.array(data);
        const newArray = [];
        if (array === undefined) {
            return undefined;
        }
        for (const elt of array) {
            newArray.push(this.number(elt));
        }
        return newArray as number[];
    },
    arrayOfObjectId: function (data: unknown): Types.ObjectId[] | undefined {
        const array = this.array(data);
        const newArray = [];
        if (array === undefined) {
            return undefined;
        }
        for (const elt of array) {
            newArray.push(this.mongoObjectId(elt));
        }
        return newArray as Types.ObjectId[];
    },
    email: function (data: any): string | undefined {
        const string = this.string(data);
        if (!string) {
            return undefined;
        }
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (data.match(regex)) {
            return data;
        } else {
            return undefined;
        }
    },
    date: function (data: unknown): Date | undefined {
        const string = this.string(data);
        if (!string) {
            return undefined;
        }
        const timestamp = Date.parse(string);
        if (isNaN(timestamp)) {
            return undefined;
        }
        return data as Date;
    },
    any: function (data: unknown): unknown | undefined {
        return data !== undefined ? data : undefined;
    }
};
