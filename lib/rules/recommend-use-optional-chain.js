/**
 * @description recommend-use-optional-chain
 * @author zhichu
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const {getVariablesByName} = require('../utils');

const messageId = 'recommend-use-optional-chain';

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description:
                'It is recommended that variables declared by deconstructive assignment be optionally chained for member access to prevent undefined, null.',
            url: null
        },
        schema: [],
        messages: {
            [messageId]:
                'The variable {{variableName}} is declared by destructuring assignment, it is recommended to use optional chaining for access.'
        }
    },

    create(context) {
        // variables should be defined here
        const patternList = ['ObjectPattern', 'ArrayPattern', 'RestElement'];
        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------
        // 判断函数参数节点是否为解构类型
        const isParamPatternType = param =>
            patternList.includes(param.type) ||
            (param.type === 'AssignmentPattern' && patternList.includes(param.left.type));

        // 判断函数定义中是否有解构
        const isFunctionDeclarationWithPattern = node => {
            if (node.type !== 'FunctionDeclaration' || !node.params) {
                return false;
            }

            return node.params.some(param => isParamPatternType(param));
        };

        // 判断函数表达式中是否有解构
        const isFunctionExpressionWithPattern = node => {
            if (node.type !== 'FunctionExpression' || !node.params) return false;

            return node.params.some(param => isParamPatternType(param));
        };

        // 判断箭头函数表达式中是否有解构
        const isArrowFunctionExpressionWithPattern = node => {
            if (node.type !== 'ArrowFunctionExpression' || !node.params) return false;

            return node.params.some(param => isParamPatternType(param));
        };

        // 判断变量定义是否有解构
        const isVariableDeclaratorWithPattern = node =>
            node.type === 'VariableDeclarator' && patternList.includes(node.id.type);

        // 判断变量节点的声明方式是否为解构赋值声明
        const isDestructuringAssignment = variable => {
            const defs = variable.defs || [];

            for (let i = 0; i < defs.length; i++) {
                const {node} = defs[i];

                if (node.type === 'FunctionDeclaration' && isFunctionDeclarationWithPattern(node)) return true;

                if (node.type === 'FunctionExpression' && isFunctionExpressionWithPattern(node)) return true;

                if (node.type === 'ArrowFunctionExpression' && isArrowFunctionExpressionWithPattern(node)) return true;

                if (node.type === 'VariableDeclarator' && isVariableDeclaratorWithPattern(node)) return true;

                return false;
            }
        };
        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            // visitor functions for different types of nodes
            MemberExpression(node) {
                // 非可选链访问，检查变量是否是通过解构赋值声明
                if (node.optional === false) {
                    const callerName = (node.object && node.object.name) || '';
                    const variables = getVariablesByName(context, callerName);

                    for (let i = 0; i < variables.length; i++) {
                        const variable = variables[i];
                        if (isDestructuringAssignment(variable)) {
                            context.report({
                                node,
                                messageId,
                                data: {
                                    variableName: callerName
                                }
                            });
                        }
                    }
                }
            }
        };
    }
};
