function evaluate(expr, scope) {
  if (expr.type == 'value') {
    return expr.value;
  } else if (expr.type == 'word') {
    if (expr.name in scope) {
      return scope[expr.name];
    } else {
      throw new ReferenceError(`Undefined binding: ${expr.name}`);
    }
  } else if (expr.type == 'apply') {
    let { operator, args } = expr;

    // Lazy import to avoid circular dependency (temporary)
    const { specialForms } = require('./environment/specialForms.js');

    if (operator.type == 'word' && operator.name in specialForms) {
      return specialForms[operator.name](expr.args, scope);
    } else {
      let op = evaluate(operator, scope);
      if (typeof op == 'function') {
        return op(...args.map((arg) => evaluate(arg, scope)));
      } else {
        throw new TypeError('Applying a non-function.');
      }
    }
  }
}

module.exports = { evaluate };
