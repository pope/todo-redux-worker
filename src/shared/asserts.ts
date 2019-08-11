/**
 * Asserts that the value is not null or undefined.
 * @param val The value to assert on.
 */
export function assert<T>(val: T | null | undefined): T {
    if (val === null || val === undefined) {
        throw Error('Expected value to not be null or undefined');
    }
    return val;
}
