/**
 * @fileoverview no-promise
 * @author zhichuya
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-promise-reject-object');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const messageId = 'no-promise-reject-object';

const ruleTester = new RuleTester({
    parserOptions: {
        ecmaVersion: 2020
    }
});
ruleTester.run('no-promise-reject-object', rule, {
    valid: [
        // give me some code that won't trigger a warning
        {
            code: `
                const rule = {
                    validator: (rule, value) => {
                        if (rule.valid(value)) {
                            return Promise.resolve(true);
                        }
                        return Promise.reject(new Error('Invalid Error'))
                    }
                }
            `
        },
        {
            code: `
                const rule = {
                    validator: function (rule, value) {
                        if (rule.valid(value)) {
                            return Promise.resolve(true);
                        }
                        return Promise.reject(new Error('Invalid Error'))
                    }
                }
            `
        },
        {
            code: `
                const rule = {
                    validator(rule, value) {
                        if (rule.valid(value)) {
                            return Promise.resolve(true);
                        }
                        return Promise.reject(new Error('Invalid Error'))
                    }
                }
            `
        },

        {
            code: `
                const validator = function (rule, value) {
                    if (rule.valid(value)) {
                        return Promise.resolve(true);
                    }
                    return Promise.reject(new Error('Invalid Error'))
                }
            `
        },
        {
            code: `
                const validator = (rule, value) => {
                    if (rule.valid(value)) {
                        return Promise.resolve(true);
                    }
                    return Promise.reject(new Error('Invalid Error'))
                }
            `
        }
    ],

    invalid: [
        {
            code: `
                const rule = {
                    validator: (rule, value) => {
                        if (rule.valid(value)) {
                            return Promise.resolve(true);
                        }
                        return Promise.reject('Invalid Error')
                    }
                }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        funcName: 'validator'
                    }
                }
            ]
        },
        {
            code: `
                const rule = {
                    validator: function (rule, value) {
                        if (rule.valid(value)) {
                            return Promise.resolve(true);
                        }
                        return Promise.reject(error)
                    }
                }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        funcName: 'validator'
                    }
                }
            ]
        },
        {
            code: `
                const rule = {
                    validator(rule, value) {
                        if (rule.valid(value)) {
                            return Promise.resolve(true);
                        }
                        const error = new Error('Invalid Error')
                        return Promise.reject(error)
                    }
                }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        funcName: 'validator'
                    }
                }
            ]
        },
        {
            code: `
                const validator = function (rule, value) {
                    if (rule.valid(value)) {
                        return Promise.resolve(true);
                    }
                    return Promise.reject()
                }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        funcName: 'validator'
                    }
                }
            ]
        },
        {
            code: `
                const validator = (rule, value) => {
                    if (rule.valid(value)) {
                        return Promise.resolve(true);
                    }
                    return Promise.reject(0)
                }
            `,
            errors: [
                {
                    messageId,
                    data: {
                        funcName: 'validator'
                    }
                }
            ]
        }
    ]
});
