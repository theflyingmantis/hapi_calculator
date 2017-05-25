var assert = require('assert');

var Calculator = require('../src/calculator');

describe('Calculator', function() {

  describe('sum', function() {
    it('should return 1 when inputs are 1,0', function(){
      assert.equal(1, Calculator.sum(1,0))	
    });

  });  
  
  describe('subtract', function(){
     it('should return 0 when inputs are 1,1',function(){
       assert.equal(0,Calculator.subtract(1,1))
     });
  });
  
  describe('divide',function(){

  	 it('should return 4 when inputs are 8,2',function(){
  	 	assert.equal(4,Calculator.divide(8,2))
  	 });

  	 it('Infinity when inputs are 3,0',function(){
  	 	assert.equal("Infinity",Calculator.divide(3,0));
  	 });

  	 it('should return Error when Not a number', function() {
      assert.throws(function(){return Calculator.divide(0,0)}, Error, 'Calculator.divide() did not work in test');
    });
  });
  
  describe('multiply', function(){
     it('should return 10 when inputs are 5,2',function(){
       assert.equal(10,Calculator.multiply(5,2))
     });
  });

  describe('absolute',function(){
    it('should return 3 when input is -3',function(){
      assert.equal(3,Calculator.absolute(-3));
    });
    it('should return 3 when input is 3',function(){
      assert.equal(3,Calculator.absolute(3));
    });
  });

  describe('sqr',function(){
    it('should return 4 when input is 2',function(){
      assert.equal(4,Calculator.sqr(2));
    });
    it('should return 4 when input is -2',function(){
      assert.equal(4,Calculator.sqr(2));
    });
  });
  
  describe('sqrRoot',function(){
    it('should return 4 when input is 16',function(){
      assert.equal(4,Calculator.sqrRoot(16));
    });
    it('should return Error when input is -16',function(){
      assert.throws(function(){return Calculator.sqrRoot(-16),Error,'Function dod not work'});
    });
  });
  
  describe('Negation',function(){
    it('should return 3 when input is -3',function(){
      assert.equal(3,Calculator.negation(-3));
    });
    it('should return -3 when input is 3',function(){
      assert.equal(-3,Calculator.negation(3));
    });
  });

  describe('Cuberoot',function(){
    it('should return -3 when input is -27',function(){
      assert.equal(-3,Calculator.croot(-27));
    });
  });

  describe('Cube',function(){
    it('should return 27 when input is 3',function(){
      assert.equal(27,Calculator.cube(3));
    });
  });
  
  describe('sin',function(){
    it('should return 1 when input is Pi',function(){
      assert.equal(1.2246467991473532e-16,Calculator.sin(Math.PI));
    });
    it('should return -1 when input is -Pi',function(){
      assert.equal(-1.2246467991473532e-16,Calculator.sin(-Math.PI));
    });
    it('should return 0 when input is 0',function(){
      assert.equal(0,Calculator.sin(0));
    });

  });



});
