interface Hello {
    name : string
}

export function HelloSystem(hello : Hello) : void {
    console.log(hello.name);
}