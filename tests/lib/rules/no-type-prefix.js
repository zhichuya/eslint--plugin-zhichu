/**
 * @description no-type-prefix
 * @author zhichu
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/no-type-prefix');
const RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const messageId = 'no-type-prefix';

const ruleTester = new RuleTester({
    // eslint-disable-next-line node/no-missing-require
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
        ecmaVersion: 2020
    }
});
ruleTester.run('no-type-prefix', rule, {
    // give me some code that won't trigger a warning
    valid: [
        {
            code: `
                type AliasNumber = number;
            `
        },
        {
            code: `
                type AliasUnionBool = true | false;
            `
        },
        {
            code: `
                type StringArray = Array<string>;
            `
        },
        {
            code: `
                type AddFuncType = (x: number, y: number) => number;
            `
        },
        {
            code: `
                type Title = 'Title';
            `
        },
        {
            code: `
                interface User {
                    name: string;
                    id: number;
                }
            `
        },
        {
            code: `
                interface InterfaceUser {
                    name: string;
                    id: number;
                }
            `
        },
        {
            code: `
                enum Direction {
                    Up,
                    Down,
                    Left,
                    Right
                }
            `
        },
        {
            code: `
                enum EnumDirection {
                    Up,
                    Down,
                    Left,
                    Right
                }
            `
        }
    ],
    invalid: [
        {
            code: `
                type TAliasNumber = number;
            `,
            errors: [
                {
                    messageId,
                    data: {
                        typeName: 'TAliasNumber'
                    }
                }
            ]
        },
        {
            code: `
                type TAliasUnionBool = true | false;
            `,
            errors: [
                {
                    messageId,
                    data: {
                        typeName: 'TAliasUnionBool'
                    }
                }
            ]
        },
        {
            code: `
                type IStringArray = Array<string>;
            `,
            errors: [
                {
                    messageId,
                    data: {
                        typeName: 'IStringArray'
                    }
                }
            ]
        },
        {
            code: `
                type EAddFuncType = (x: number, y: number) => number;
            `,
            errors: [
                {
                    messageId,
                    data: {
                        typeName: 'EAddFuncType'
                    }
                }
            ]
        },
        {
            code: `
                type TTitle = 'Title';
            `,
            errors: [
                {
                    messageId,
                    data: {
                        typeName: 'TTitle'
                    }
                }
            ]
        },
        {
            code: `
                interface IUser {
                    name: string;
                    id: number;
                }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        typeName: 'IUser'
                    }
                }
            ]
        },
        {
            code: `
                enum EDirection {
                    Up,
                    Down,
                    Left,
                    Right
                }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        typeName: 'EDirection'
                    }
                }
            ]
        }
    ]
});
