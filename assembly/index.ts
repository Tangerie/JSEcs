// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
	return a + b;
}

export function fib(num: i32): i32 {
	if(num == 0) return 0;
	if(num == 1) return 1;
	return fib(num - 1) + fib(num - 2);
}