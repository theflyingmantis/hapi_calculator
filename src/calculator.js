function sum(a, b) {
  return a+b;
}

function subtract(a,b){
	return a-b;
}

function divide(a,b){
	var div=a/b;
    if(isNaN(div)) throw new Error('Not a number error');
	else if(!isFinite(div)) return "Infinity";
	else return div;
}

function multiply(a,b){
	return a*b;
}

function abs(a){
  return Math.abs(a);
}

function sqr(a){
  return a*a;
}

function sqrRoot(a){
  if(a<0) throw new Error("Get a life bro!!")
  return Math.sqrt(a);
}

function neg(a)
{
  return -a;
}

function croot(a){
  return Math.cbrt(a);
}

function cube(a){
  return a*a*a;
}

function sin(a){
  return Math.sin(a);
}

module.exports = {
  sum: sum,
  subtract: subtract,
  divide: divide,
  multiply: multiply,
  absolute: abs,
  sqr: sqr,
  sqrRoot:sqrRoot,
  negation: neg,
  croot: croot,
  cube: cube,
  sin: sin
}


/*exports.sum = function (a, b) {
  return a + b;
}*/
// exports.sum = (a, b) => a + b;
