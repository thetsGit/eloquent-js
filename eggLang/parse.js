function parseApply(expr, program) {
  program = skipSpacesAndComments(program);
  if (program[0] != '(') {
    return { expr: expr, rest: program };
  }

  program = skipSpacesAndComments(program.slice(1));
  expr = { type: 'apply', operator: expr, args: [] };
  while (program[0] != ')') {
    let arg = parseExpression(program);
    expr.args.push(arg.expr);
    program = skipSpacesAndComments(arg.rest);
    if (program[0] == ',') {
      program = skipSpacesAndComments(program.slice(1));
    } else if (program[0] != ')') {
      throw new SyntaxError("Expected ',' or ')'");
    }
  }
  return parseApply(expr, program.slice(1));
}

function parseExpression(program) {
  program = skipSpacesAndComments(program);
  let match, expr;
  if ((match = /^"([^"]*)"/.exec(program))) {
    expr = { type: 'value', value: match[1] };
  } else if ((match = /^\d+\b/.exec(program))) {
    expr = { type: 'value', value: Number(match[0]) };
  } else if ((match = /^[^\s(),#"]+/.exec(program))) {
    expr = { type: 'word', name: match[0] };
  } else {
    throw new SyntaxError('Unexpected syntax: ' + program);
  }

  return parseApply(expr, program.slice(match[0].length));
}

function skipSpacesAndComments(string) {
  let skipped = string.match(/^(\s|#[^\n\r]*)*/);
  return string.slice(skipped[0].length);
}

function parse(program) {
  let { expr, rest } = parseExpression(program);
  if (skipSpacesAndComments(rest).length > 0) {
    throw new SyntaxError('Unexpected text after program');
  }
  return expr;
}

module.exports = { parse };
