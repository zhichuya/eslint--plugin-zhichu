/*
 * @Author: zhichuya 1830695417@qq.com
 * @Date: 2023-11-05
 * @LastEditors: zhichuya 1830695417@qq.com
 * @LastEditTime: 2023-11-05
 * @FilePath: /eslint--plugin-zhichu/lib/utils/index.js
 * @Description: 一些工具函数
 */

/**
 * 判断给定数值是否是浮点数
 * @param {number} number
 * @returns boolean
 */
const isFloat = number => {
    if (typeof number !== 'number') return false;
    return number !== Math.floor(number);
};

/**
 * 获取节点所在的函数节点
 * @param {Node} node
 * @returns Node 函数节点
 */
const getFunctionNode = node => {
    let funcNode = node;
    const funcDeclarationType = ['FunctionDeclaration', 'FunctionExpression', 'ArrowFunctionExpression'];
    while (funcNode.parent) {
        if (funcDeclarationType.includes(funcNode.type)) {
            return funcNode;
        }

        funcNode = funcNode.parent;
    }

    return null;
};

/**
 * 获取函数的函数名
 * @param {Node} node 函数节点
 * @returns string 函数名
 */
const getFunctionName = node => {
    if (!node) return '';

    // 1、函数定义语句
    if (node.type === 'FunctionDeclaration') return node.id.name;

    // 2、箭头函数表达式、函数表达式
    if (['FunctionExpression', 'ArrowFunctionExpression'].includes(node.type)) {
        const {parent} = node;
        // 变量值为一个函数，定义方式如： const func = function () {}; const func = () => {}
        if (parent && parent.type === 'VariableDeclarator') {
            return parent.id.name;
        }

        // 定义在对象上的方法，定义方式如：const obj = {func: () => {}}; const obj = {func(){}}
        if (parent && parent.type === 'Property') {
            return parent.key.name || '';
        }
    }

    return '';
};

/**
 *
 * @param {Context} context eslint的context对象
 * @param {string} attrName 从options上获取的属性
 * @param {any} defaultValue 默认值
 * @returns 从options中取得的属性值，若不存在返回defaultValue
 */
const getContextOptions = (context, attrName, defaultValue) => {
    const {options} = context;
    if (options[0] && options[0][attrName]) {
        return options[0][attrName];
    }

    return defaultValue;
};

module.exports = {
    isFloat,
    getFunctionNode,
    getFunctionName,
    getContextOptions
};
