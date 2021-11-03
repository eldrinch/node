

// const re = /Capitulo (\d+)\.\d*/;
// console.log(re);

// let re1 = new RegExp('Capitulo (\d+)\.\d*')
// console.log(re1);

// var myRe = new RegExp(/d(b+)d/g);
// var myArray = myRe.exec("cdbbdbsbz");
// console.log(myRe);
// console.log(myArray); //["dbbd", "bb"]

var se = /(\w+)\s(\w+)/;
var str = "John Smith";
var newstr = str.replace(se, "$2, $1");
console.log(newstr); //Smith, John
