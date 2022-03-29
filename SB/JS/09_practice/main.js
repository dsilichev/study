let calculator = new Calculator();
calculator.read();

console.log( "Sum=" + calculator.sum() );
console.log( "Mul=" + calculator.mul() );

function Calculator() {
    this.val1 = 0;
    this.val2 = 0;
    this.read = function() {
        this.val1 = require(';fv');
        this.val1 = readline('Введите значение 1:');
        this.val2 = prompt('Введите значение2:');
    };
    this.sum = function() {
        return this.val1 + this.val2;
    };
    this.mul = function() {
        return this.val1 * this.val2;
    }
}