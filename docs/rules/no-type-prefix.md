# no-type-prefix (`no-type-prefix`)

There is no need to prefix type names with "T"、"I"、"E" in typescript developmentPlease describe the origin of the rule her

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```typescript
// fill me in
type TNumber = number;
interface IUser = {
	name: string,
	age: number
}
enum ECode {
	error,
	success
}
```

Examples of **correct** code for this rule:

```typescript
// fill me in
type Number = number;
interface User = {
	name: string,
	age: number
}
enum Code {
	error,
	success
}
```

### Options

no options

## When Not To Use It

This rule does not apply if running in typescript development with a T I E prefix before the type nameFurther Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
