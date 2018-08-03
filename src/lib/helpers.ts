export function realTypeOf(obj: any): string {
    return {}.toString
        .call(obj)
        .replace(/\[object\s(.*?)\]/, '$1')
        .toLowerCase()
}

export function toBoolean(value: any): boolean {
    if (typeof value === 'number') {
        return [1, 0].includes(value) ? !!value : false
    } else if (typeof value === 'string') {
        return value.toLowerCase() === 'true' || value === '1'
    } else if (typeof value === 'boolean') {
        return value
    }
    return false
}

export function parseValue(option: {type: string}, value: any) {
    switch (option.type) {
        case 'number':
            return parseFloat(value)
        case 'boolean':
            return toBoolean(value)
    }
    if (value.toString().toLowerCase() === 'null') {
        return null
    }
    return value
}
