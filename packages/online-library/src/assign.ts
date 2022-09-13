export function assign<T, U>(target: T, source: U): asserts target is T & U {
   Object.assign({}, target, source)
}
