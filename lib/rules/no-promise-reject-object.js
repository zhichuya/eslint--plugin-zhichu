/**
 * @description no-promise-reject-object
 * @author zhichuya
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const {getContextOptions, getFunctionNode, getFunctionName} = require('../utils');

const messageId = 'no-promise-reject-object';

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description:
                'In the form validation function, it is forbidden to pass the object directly in the Promise.reject() method, this kind of writing may cause the loss of error messages. It is recommended to pass in "new Error()"',
            url: null
        },
        schema: [],
        messages: {
            [messageId]:
                'If the function "{{funcName}}" is a form validation function, Promise.reject() must pass in "new Error()".'
        }
    },

    create(context) {
        // variables should be defined here
        // 获取配置的表单校验函数名
        const restrictList = getContextOptions(context, 'restrictList', ['validator', 'validation']);
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------
        // 判断是否是Promise.reject()语句
        const isCallPromiseReject = node => {
            const {callee} = node;
            if (
                callee &&
                callee.type === 'MemberExpression' &&
                callee.object.name === 'Promise' &&
                callee.property.name === 'reject'
            ) {
                return true;
            }

            return false;
        };

        // 判断参数是否是：new Error()
        const isArgumentsNewError = node => {
            const {arguments: args = []} = node;
            if (!args.length) return false;

            if (args[0].type === 'NewExpression' && args[0].callee.name === 'Error') {
                return true;
            }

            return false;
        };

        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            // visitor functions for different types of nodes
            CallExpression(node) {
                if (isCallPromiseReject(node)) {
                    const funcNode = getFunctionNode(node);
                    const funcName = getFunctionName(funcNode);
                    if (restrictList.includes(funcName) && !isArgumentsNewError(node)) {
                        context.report({
                            node,
                            messageId,
                            data: {
                                funcName
                            }
                        });
                    }
                }
            }
        };
    }
};
