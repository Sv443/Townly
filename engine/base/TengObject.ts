/**
 * Base class of all instantiatable Teng classes
 */
export class TengObject
{
    /** Unique identifier of type `Symbol` that's assigned to each Teng object at instantiation */
    readonly uid: Symbol;

    constructor(objectName: string, identifier?: string)
    {
        if(typeof identifier === "string")
            identifier = `/${identifier}`;
        else
            identifier = "";

        this.uid = Symbol(`TE/${objectName}${identifier}`);
    }

    /**
     * Limits the length of a passed teng object descriptor (string)
     * @param descriptor A descriptor to limit
     * @param limit How many characters to limit the descriptor to
     */
    static limitedLengthDescriptor(descriptor: string, limit: number = 16): string
    {
        const suffix = "…";

        if(limit < 1 || limit % 1 != 0)
            throw new TypeError(`Limit has to be a number bigger than 0 (got ${limit})`);

        if(descriptor.length > limit)
            descriptor = `${descriptor.substr(0, (limit - suffix.length))}${suffix}`;

        return descriptor;
    }
}