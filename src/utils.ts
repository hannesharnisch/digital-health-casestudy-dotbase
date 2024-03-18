import fs from 'fs'

export function readJson(jsonPath: string) : any {
    const jsonData: string = fs.readFileSync(jsonPath, 'utf-8');
    return JSON.parse(jsonData);
}

export function showObject(obj: any) {
    return JSON.stringify(obj)
}