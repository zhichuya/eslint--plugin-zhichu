# recommend-use-optional-chain (`recommend-use-optional-chain`)

When accessing properties and methods of variables declared by deconstructive assignment in development, it is recommended to use optional chain access to prevent undefined, null, and so onPlease describe the origin of the rule her

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
// fill me in
const obj = { name: 'John', age: 18 };
const { age, name } = obj;
age.len;
name.length;
```

Examples of **correct** code for this rule:

```js
// fill me in
const obj = { name: 'John', age: 18 };
const { age, name } = obj;
age?.len;
name?.length;
```

### Options

no options

## When Not To Use It

This rule can be waived if direct access to the properties and methods of variables declared by deconstructive assignment is allowed in development

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
