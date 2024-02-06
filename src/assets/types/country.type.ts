export interface SingleOption {
    label: string,
    value: any,
    allData: CountryType
}

export interface CountryOption {
    [key: string]: { label: string, value: any, allData: CountryType }
}

export interface CountryType {
    flags: Flags
    postalCode: PostalCode
    name: Name
    ccn3: string
    cca3: string
    cca2: string
    idd: Idd
}

export interface Flags {
    png: string
    svg: string
    alt: string
}

export interface PostalCode {
    format: string
    regex: string
}

export interface Name {
    common: string
    official: string
    nativeName: NativeName
}

export interface NativeName {
    eng: Eng
}

export interface Eng {
    official: string
    common: string
}

export interface Idd {
    root: string
    suffixes: string[]
}
