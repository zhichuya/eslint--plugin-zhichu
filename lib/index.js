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
    rules: {},
    configs: {
        recommended: require('./configs/recommended')
    }
};

// import processors
module.exports.processors = {
    // add your processors here
};
