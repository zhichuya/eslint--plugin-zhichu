# Avoid float number computing (`no-float-computation`)

In order to prevent the loss of precision caused by floating-point numbers, it is recommended to prohibit the use of floating-point numbers in development.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

// fill me in
1 + 1.1;
1 - 1.1;
1 * 1.1;
1 / 1.1;

const num1 = 1 + 1.1;
const num2 = len + 1.1;

let num3 = 10; num3 += 1.1

```

Examples of **correct** code for this rule:

```js

// fill me in
1 + 1;
1 - 1;
1 * 1;
1 / 1;

const num1 = 1 + 1;
const num2 = len + 1;

let num3 = 10; num3 += 1
```

### Options

No options

## When Not To Use It

You can allow floating point numbers to be used for arithmetic, so you don't need to use this rule if you're not worried about losing precision.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
