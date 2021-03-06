var remapAsyncToGenerator = require("babel-helper-remap-async-to-generator");
var t = require("babel-types");

function bluebirdCoroutine() {
  return {
    inherits: require("babel-plugin-syntax-async-functions"),
    visitor: {
      Function: function(path, state) {
        if (!path.node.async || path.node.generator) return;

        remapAsyncToGenerator(
          path,
          t.memberExpression(t.identifier(t.toIdentifier('Promise')), t.identifier(t.toIdentifier('coroutine')))
        );
      }
    }
  };
}

module.exports = {
  plugins: [
    require("babel-plugin-transform-es2015-template-literals"),
    require("babel-plugin-transform-es2015-literals"),
    require("babel-plugin-transform-es2015-function-name"),
    require("babel-plugin-transform-es2015-arrow-functions"),
    require("babel-plugin-transform-es2015-block-scoped-functions"),
    require("babel-plugin-transform-decorators"),
    [require("babel-plugin-transform-class-properties"), {loose: true}],
    require("babel-plugin-transform-es2015-classes"),
    require("babel-plugin-transform-es2015-object-super"),
    require("babel-plugin-transform-es2015-shorthand-properties"),
    require("babel-plugin-transform-es2015-computed-properties"),
    require("babel-plugin-transform-es2015-for-of"),
    require("babel-plugin-transform-es2015-sticky-regex"),
    require("babel-plugin-transform-es2015-unicode-regex"),
    require("babel-plugin-transform-es2015-constants"),
    require("babel-plugin-transform-es2015-spread"),
    require("babel-plugin-transform-es2015-parameters"),
    require("babel-plugin-transform-es2015-destructuring"),
    require("babel-plugin-transform-es2015-block-scoping"),
    require("babel-plugin-transform-es2015-typeof-symbol"),
    require("babel-plugin-transform-es2015-modules-commonjs"),
    //[require("babel-plugin-transform-async-to-module-method"), {module: 'bluebird', method: 'coroutine'}],
    bluebirdCoroutine,
    //require("babel-plugin-transform-regenerator"),
    require("babel-plugin-transform-object-rest-spread"),
    require("babel-plugin-transform-react-jsx"),
    require("babel-plugin-transform-flow-strip-types"),
    require("babel-plugin-syntax-flow"),
    require("babel-plugin-syntax-jsx")
  ]
};
