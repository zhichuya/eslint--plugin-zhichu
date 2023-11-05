/*
 * @Author: zhichuya 1830695417@qq.com
 * @Date: 2023-11-04
 * @LastEditors: zhichuya 1830695417@qq.com
 * @LastEditTime: 2023-11-05
 * @FilePath: /eslint--plugin-zhichu/lib/configs/recommended.js
 * @Description: 推荐配置
 */

module.exports = {
    extends: [],
    rules: {
        // 添加规则
        '@eslint-plugin-zhichu/no-type-prefix': 'error',
        '@eslint-plugin-zhichu/no-float-computation': 'error',
        '@eslint-plugin-zhichu/no-promise-reject-object': 'error',
        '@eslint-plugin-zhichu/recommend-use-optional-chain': [
            'error',
            {
                restrictList: ['validator', 'validation']
            }
        ]
    }
};
