/**
 * @description no-type-prefix
 * @author zhichu
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const messageId = 'no-type-prefix';

module.exports = {
    meta: {
        type: 'suggestion',
        docs: {
            description: 'The "T"、"I"、"E" prefix is not recommended for type names in typescript',
            url: null
        },
        schema: [],
        messages: {
            [messageId]: '"{{typeName}}" is a type name, it does not need to add "T"、"I"、"E" prefixes.'
        }
    },

    create(context) {
        // variables should be defined here

        //----------------------------------------------------------------------
        // Helpers
        //----------------------------------------------------------------------
        const checkTypeNamePrefix = node => {
            if (node.id && node.id.name) {
                const {name} = node.id;
                const regExp = /^[TIE][A-Z]/;

                if (regExp.test(name)) {
                    context.report({
                        node,
                        messageId,
                        data: {
                            typeName: name
                        }
                    });
                }
            }
        };
        // any helper functions should go here or else delete this section

        //----------------------------------------------------------------------
        // Public
        //----------------------------------------------------------------------

        return {
            // visitor functions for different types of nodes
            TSTypeAliasDeclaration: checkTypeNamePrefix,
            TSInterfaceDeclaration: checkTypeNamePrefix,
            TSEnumDeclaration: checkTypeNamePrefix
        };
    }
};
