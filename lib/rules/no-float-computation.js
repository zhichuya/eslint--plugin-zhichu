/**
 * @description Avoid float number computing
 * @author zhichuya
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const {isFloat} = require('../utils');

const messageId = 'no-float-computation';
const operatorSet = new Set(['+', '-', '*', '/', '%', '+=', '-=', '*=', '/=', '%=']);

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'Floating point numbers are not allowed to participate in math operations',
            url: null
        },
        schema: [],
        messages: {
            [messageId]: 'Avoid float number computing {{ operator }}'
        }
    },

    create(context) {
        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------
        const checkNode = (node, side) => {
            if (operatorSet.has(node.operator) && node[side].type === 'Literal' && isFloat(node[side].value)) {
                context.report({
                    messageId,
                    node: node[side],
                    data: {
                        operator: node.operator
                    }
                });
            }
        };
        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            // visitor functions for different types of nodes
            // 二元运算符，判断左右节点是否是浮点数
            BinaryExpression(node) {
                checkNode(node, 'left');
                checkNode(node, 'right');
            },
            // 复合复制运算符，判断右节点是否为浮点数
            AssignmentExpression(node) {
                checkNode(node, 'right');
            }
        };
    }
};
