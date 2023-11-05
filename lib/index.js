/**
 * @description Customize eslint rules
 * @author zhichu
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
module.exports = {
    rules: {
        'no-type-prefix': require('./rules/no-type-prefix'),
        'no-float-computation': require('./rules/no-float-computation'),
        'no-promise-reject-object': require('./rules/no-promise-reject-object'),
        'recommend-use-optional-chain': require('./rules/recommend-use-optional-chain')
    },
    configs: {
        recommended: require('./configs/recommended')
    }
};

// import processors
module.exports.processors = {
    // add your processors here
};
