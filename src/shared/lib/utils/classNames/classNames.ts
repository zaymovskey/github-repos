type TypeModes = Record<string, boolean | string>;

export function classNames(
    cls: string,
    mods: TypeModes = {},
    additional: (string | undefined)[] = [],
): string {
    return [
        cls,
        ...additional.filter(Boolean),
        ...Object.entries(mods)
            .filter(([, value]) => Boolean(value))
            .map(([key]) => key),
    ]
        .join(' ')
        .replace(/\s+$/, '');
}
