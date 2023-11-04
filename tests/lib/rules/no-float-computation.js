/**
 * @description Avoid float number computing
 * @author zhichuya
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester;
const rule = require('../../../lib/rules/no-float-computation');

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const messageId = 'no-float-computation';
const ruleTester = new RuleTester();
ruleTester.run('no-float-computation', rule, {
    valid: [
        // give me some code that won't trigger a warning
        '1 + 2',
        '1 - 2',
        '1 * 2',
        '1 / 2',
        '1 %2',

        'num += 1',
        'num -= 1',
        'num *= 1',
        'num /= 1',
        'num %= 1',

        'var num = 1 + 2',
        'var num = 1 - 2',
        'var num = 1 * 2',
        'var num = 1 / 2',
        'var num = 1 % 2',

        'var num = len + len',
        'var num = len + 100',
        'var num = len() + len()',
        'var num = len() + 10000',

        '1 + 2 + 3',
        'var num = 1; num += 2',
        'var num = obj.width + 1',
        'var num = 1 +obj.width()',
        'var num = 1 * 2 * 4 * 8',
        'var num = 1; num += 1 + 2 + 3'
    ],

    invalid: [
        {
            code: '1 + 2.2',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '+'
                    }
                }
            ]
        },
        {
            code: '1 - 2.2',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '-'
                    }
                }
            ]
        },
        {
            code: '1 * 2.2',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '*'
                    }
                }
            ]
        },
        {
            code: '1 / 2.2',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '/'
                    }
                }
            ]
        },
        {
            code: '1 % 2.2',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '%'
                    }
                }
            ]
        },

        {
            code: 'num += 1.1',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '+='
                    }
                }
            ]
        },
        {
            code: 'num -= 1.1',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '-='
                    }
                }
            ]
        },
        {
            code: 'num *= 1.1',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '*='
                    }
                }
            ]
        },
        {
            code: 'num /= 1.1',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '/='
                    }
                }
            ]
        },
        {
            code: 'num %= 1.1',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '%='
                    }
                }
            ]
        },

        {
            code: 'var num = 1.1 + 2',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '+'
                    }
                }
            ]
        },
        {
            code: 'var num = 1.1 - 2',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '-'
                    }
                }
            ]
        },
        {
            code: 'var num = 1.1 * 2',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '*'
                    }
                }
            ]
        },
        {
            code: 'var num = 1.1 / 2',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '/'
                    }
                }
            ]
        },
        {
            code: 'var num = 1.1 % 2',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '%'
                    }
                }
            ]
        },

        {
            code: 'var num = len + 100.1',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '+'
                    }
                }
            ]
        },
        {
            code: 'var num = len() + 10000.1',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '+'
                    }
                }
            ]
        },

        {
            code: '1.1 + 2.2 + 3.3',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '+'
                    }
                },
                {
                    messageId,
                    data: {
                        operator: '+'
                    }
                },
                {
                    messageId,
                    data: {
                        operator: '+'
                    }
                }
            ]
        },
        {
            code: 'var num = 1; num += 2.2',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '+='
                    }
                }
            ]
        },
        {
            code: 'var num = obj.width + 1.1',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '+'
                    }
                }
            ]
        },
        {
            code: 'var num = 1.1 +obj.width()',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '+'
                    }
                }
            ]
        },
        {
            code: 'var num = 1 * 2 * 4.4 * 8',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '*'
                    }
                }
            ]
        },
        {
            code: 'var num = 1; num += 1.1 + 2 + 3',
            errors: [
                {
                    messageId,
                    data: {
                        operator: '+'
                    }
                }
            ]
        }
    ]
});
