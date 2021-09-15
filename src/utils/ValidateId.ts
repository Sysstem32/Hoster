export function isValidId(id: string): boolean {
    return new RegExp(/[0-9]{18}/).test(id)
}