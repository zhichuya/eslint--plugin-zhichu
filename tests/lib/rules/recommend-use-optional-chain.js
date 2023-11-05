/**
 * @description recommend-use-optional-chain
 * @author zhichu
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/recommend-use-optional-chain');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const messageId = 'recommend-use-optional-chain';

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2020
    }
});

ruleTester.run('recommend-use-optional-chain', rule, {
    valid: [
        // give me some code that won't trigger a warning
        // 对象解构赋值
        `
        const obj = { name: 'John', age: 18 };
        const { age, name } = obj;
        age?.len;
        name?.length;
        `,
        // 解构赋值剩余参数
        `
        const obj = { name: 'John', age: 18, email: 'email@example.com', address: 'earth' }
        const { age, name, ...othersInfo } = obj
        othersInfo?.len;
        `,
        // 解构赋值取别名
        `
        const obj = { name: 'John', age: 18, email: 'email@example.com', address: 'earth' };
        const { age: aliasAge, name: aliasName } = obj;
        aliasAge?.len;
        `,
        // 嵌套解构赋值取别名
        `
        const obj = { name: 'John', age: 18, email: 'email@example.com', address: 'earth' };
        const { age: aliasAge, name: { length: nameLength } } = obj;
        nameLength?.len;
        `,
        // 数组解构赋值
        `
        const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        const [a, b, c] = arr;
        a?.len;
        `,
        // 数组解构赋值剩余参数
        `
        const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        const [a, b, c, ...othersStr] = arr;
        othersStr?.len;
        `,
        // 数组嵌套解构赋值
        `
        const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        const [a, b, c, ...[d, ...othersStr]] = arr;
        d?.len;
        othersStr?.len;
        `,

        // 函数作用域下解构赋值
        `
        function func({name, age} = props) {
            name?.len;
            age?.len;
        }
        `,
        // 函数表达式作用域下解构赋值
        `
        const func = function ({name, age} = props) {
            name?.len;
            age?.len;
        };
        `,

        `
        let func;
        func = function ({name, age} = props) {
            name?.len;
            age?.len;
        };
        `,
        // 对象方法作用域下解构赋值
        `
        const obj = {
            func: function func({name, age} = props) {
                name?.len;
                age?.len;
            }
        };
        `,

        `
        const obj = {
            func: function ({name, age} = props) {
                name?.len;
                age?.len;
            }
        };
        `,

        `
        const obj = {
            func({name, age}) {
                name?.len
            }
        };
        `,

        // 箭头函数作用域下解构赋值
        `
        ({name, age}) => {
            name?.len;
            age?.len;
        };
        `,

        `
        const func = ({name, age} = props) => {
            name?.len;
            age?.len;
        }
        `,

        `
        const func = ({name, age} = props, [a, b, c] = arr) => {
            name?.len;
            age?.len;

            a?.len;
            b?.len;
            c?.len;
        };
        `,

        // 嵌套解构赋值
        `
        const obj = {
            age: {
                nominalAge: 18,
                actualAge: 19
            },
            name: {
                firstName: 'John',
                lastName: 'Smith'
            },
            address: 'china',
            id: '10001'
        };
        const {
            age: {nominalAge, actualAge},
            name: {firstName, lastName}
        } = obj;
        nominalAge?.len;
        actualAge?.len;
        firstName?.len;
        lastName?.len;
        `,

        `
        const arr = ['a', ['b', ['c', 'd', 'e', 'f'], 'g'], 'h'];
        const [a, [b, [c, ...others]]] = arr;
        b?.len;
        c?.len;
        others?.len;
        `,

        // 块级作用域下解构赋值
        `
        const obj = { name: 'John', age: 18 };
        const {name, age} = obj;
        {
            const {name: aliasName, age: aliasAge} = obj;
            name?.len;
            age?.len;
            aliasName?.len;
            aliasAge?.len;
        }
        `,

        `
        const obj = { name: 'John', age: 18 };
        {
            const {name, age} = obj;
            name?.len;
            {
                const {length: nameLength} = name;
                nameLength?.len;
            }
            age?.len;
        }
        `,

        // for for-in for-of if switch tyr-catch等语句的块级作用域下解构赋值
        `
        const obj = { name: 'John', age: 18 };
        const {name, age} = obj;
        if(obj) {
            const {name: innerName, age: innerAge} = obj;
            innerName?.len;
            innerAge?.len;
            name?.len
        }
        name?.len;
        age?.len;
        `,

        `
        const obj = {name: 'John', age: 18};
        const {name, age} = obj;
        for (let i = 0; i < Object.values(obj); i++) {
            name?.len;
            age?.len;
        }
        `,

        `
        const obj = {name: 'John', age: 18};
        for (let {name, age} = obj, i = 0; i < Object.values(obj); i++) {
            name?.len;
            age?.len;
        }
        `,

        `
        const obj = {name: 'John', age: 18};
        const {name, age} = obj;
        for (const key in obj) {
            name?.len;
        }
        `,

        `
        const obj = {name: 'John', age: 18};
        const {name, age} = obj;
        for (const key of obj) {
            name?.len;
        }
        `,

        `
        const obj = {name: 'John', age: 18};
        const {name, age} = obj;
        switch (name) {
            case 'John':
                name?.len;
                break;
            case 'Jack':
                name?.len;
                break;
            default:
                name?.len;
                break;
        }
        `,

        `
        const obj = {name: 'John', age: 18};
        const {name, age} = obj;
        try {
            name?.len;
        } catch (err) {
            age?.len;
        }
        `
    ],
    invalid: [
        // 对象解构赋值，不使用可选链访问成员
        {
            code: `
                const obj = { name: 'John', age: 18 };
                const { age, name } = obj;
                age.len;
                name.len;
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'age'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                }
            ]
        },
        // 解构赋值剩余参数，不使用可选链访问成员
        {
            code: `
                const obj = { name: 'John', age: 18, email: 'email@example.com', address: 'earth' };
                const { age, name, ...othersInfo } = obj
                othersInfo.len;
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'othersInfo'
                    }
                }
            ]
        },
        // 解构赋值取别名，不使用可选链访问成员
        {
            code: `
                const obj = { name: 'John', age: 18, email: 'email@example.com', address: 'earth' };
                const { age: aliasAge, name: aliasName } = obj;
                aliasAge.len;
                aliasName.len;
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'aliasAge'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'aliasName'
                    }
                }
            ]
        },
        // 嵌套解构赋值取别名，不使用可选链访问成员
        {
            code: `
                const obj = { name: 'John', age: 18, email: 'email@example.com', address: 'earth' };
                const { age: aliasAge, name: { length: nameLength } } = obj;
                aliasAge.len;
                nameLength.len;
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'aliasAge'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'nameLength'
                    }
                }
            ]
        },
        // 数组解构赋值，不使用可选链访问成员
        {
            code: `
                const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
                const [a, b, c] = arr;
                a.length;
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'a'
                    }
                }
            ]
        },
        // 数组解构赋值剩余参数，不使用可选链访问成员
        {
            code: `
                const arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
                const [a, b, c, ...othersStr] = arr;
                othersStr.len;
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'othersStr'
                    }
                }
            ]
        },
        // 函数参数解构赋值，不使用可选链访问成员
        {
            code: `
                function func({name, age} = props) {
                    name.len;
                    age.len;
                }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'age'
                    }
                }
            ]
        },
        // 函数表达式参数解构赋值，不使用可选链访问成员
        {
            code: `
                const func = function ({name, age} = props) {
                    name.len;
                    age;
                };
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                }
            ]
        },
        {
            code: `
            let func;
            func = function ({name, age} = props) {
                name;
                age.len;
                };
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'age'
                    }
                }
            ]
        },
        // 对象方法参数解构赋值，不使用可选链访问成员
        {
            code: `
                const obj = {
                    func: function func({name, age} = props) {
                        name;
                        age.len;
                    }
                };
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'age'
                    }
                }
            ]
        },
        {
            code: `
                const obj = {
                    func: function ({name, age} = props) {
                        name.len;
                        age.len;
                    }
                };
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'age'
                    }
                }
            ]
        },
        // 对象方法简写时参数解构赋值，不使用可选链访问成员
        {
            code: `
                const obj = {
                    func({name, age}) {
                        name.len
                    }
                };
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                }
            ]
        },
        // 箭头函数参数解构赋值，不使用可选链访问成员
        {
            code: `
                ({name, age}) => {
                    name;
                    age.len;
                };
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'age'
                    }
                }
            ]
        },
        {
            code: `
                const func = ({name, age} = props) => {
                    name.len;
                    age;
                }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                }
            ]
        },
        {
            code: `
                const func = ({name, age} = props, [a, b, c] = arr) => {
                name.len;
                age;

                a.len;
                b;
                c;
                };
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'a'
                    }
                }
            ]
        },
        // 对象嵌套解构赋值，不使用可选链访问成员
        {
            code: `
            const obj = {
                age: {
                    nominalAge: 18,
                    actualAge: 19
                },
                name: {
                    firstName: 'John',
                    lastName: 'Smith'
                },
                address: 'china',
                id: '10001'
            };
            const {
                age: {nominalAge, actualAge},
                name: {firstName, lastName}
            } = obj;
            nominalAge.len;
            actualAge.len;
            firstName.len;
            lastName.len;
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'nominalAge'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'actualAge'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'firstName'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'lastName'
                    }
                }
            ]
        },
        // 数组嵌套解构赋值，不使用可选链访问成员
        {
            code: `
                const arr = ['a', ['b', ['c', 'd', 'e', 'f'], 'g'], 'h'];
                const [a, [b, [c, ...others]]] = arr;
                b.len;
                c.len;
                others.len;
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'b'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'c'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'others'
                    }
                }
            ]
        },
        // 块级作用域下解构赋值，不使用可选链访问成员
        {
            code: `
            const obj = { name: 'John', age: 18 };
            const {name, age} = obj;
                {
                    const {name: aliasName, age: aliasAge} = obj;
                    obj.len;
                    name.len;
                    age.len;
                    aliasName.len;
                    aliasAge.len;
                }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'age'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'aliasName'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'aliasAge'
                    }
                }
            ]
        },
        // 多重块级作用域解构赋值，不使用可选链访问成员
        {
            code: `
            const obj = { name: 'John', age: 18 };
            {
                const {name, age} = obj;
                name.len;
                {
                    const {length: nameLength} = name;
                    nameLength.len;
                }
                    age.len;
            }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'nameLength'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'age'
                    }
                }
            ]
        },
        // for for-in for-of if switch tyr-catch等语句的块级作用域下解构赋值，不使用可选链访问成员
        {
            code: `
            const obj = { name: 'John', age: 18 };
            const {name, age} = obj;
            if(obj) {
                const {name: innerName, age: innerAge} = obj;
                innerName.len;
                innerAge.len;
            }
            name.len;
            age.len;
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'innerName'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'innerAge'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'age'
                    }
                }
            ]
        },
        {
            code: `
            const obj = {name: 'John', age: 18};
            const {name, age} = obj;
            for (let i = 0; i < Object.values(obj); i++) {
                name.len;
                age.len;
            }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'age'
                    }
                }
            ]
        },
        {
            code: `
            const obj = {name: 'John', age: 18};
            for (let {name, age} = obj, i = 0; i < Object.values(obj); i++) {
                name.len;
            }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                }
            ]
        },
        {
            code: `
            const obj = {name: 'John', age: 18};
            const {name, age} = obj;
            for (const key in obj) {
                name.len;
            }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                }
            ]
        },
        {
            code: `
            const obj = {name: 'John', age: 18};
            const {name, age} = obj;
            for (const key of obj) {
                name.len;
            }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                }
            ]
        },
        {
            code: `
            const obj = {name: 'John', age: 18};
            const {name, age} = obj;
            switch (name) {
                case 'John':
                    name.len;
                    break;
                case 'Jack':
                    name;
                    break;
                default:
                    age.len;
                    break;
            }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'age'
                    }
                }
            ]
        },
        {
            code: `
            const obj = {name: 'John', age: 18};
            const {name, age} = obj;
            try {
                name.len;
            } catch (err) {
                age.len;
            }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        variableName: 'name'
                    }
                },
                {
                    messageId,
                    data: {
                        variableName: 'age'
                    }
                }
            ]
        }
    ]
});
