# no-promise (`no-promise-reject-object`)

It is not recommended to pass an object directly in Promise.reject() in the form validation function, doing so may cause the error message to be lost, it is recommended to use Promise.reject(new Error())

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
// fill me in
const validator = (rule, value) => {
	if (rule.valid(value)) {
		return Promise.resolve(true);
	}

	return Promise.reject('Invalid Error');
}

```

Examples of **correct** code for this rule:

```js
// fill me in
const validator = (rule, value) => {
	if (rule.valid(value)) {
		return Promise.resolve(true);
	}

	return Promise.reject(new Error('Invalid Error'));
}

```

### Options

```js
rule: {
	'@eslint-plugin-zhichu/no-promise-reject-object': ['error', {
		'restrctList': ['validator'] // 表单校验函数名
	}]
}
```

## When Not To Use It

This rule does not apply if the development is running on Promise.reject() passing in a fly new Error() object

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
