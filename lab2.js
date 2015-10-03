'use strict';

// LAB 2: SORTING AND CAMPY SCI-FI

// Welcome to Lab 2 =)

// Be sure to read all the comments!

// All of the instructions are inline with the assignment below.
// Look for the word TODO in comments.  Each TODO will have a
// description of what is required.

// To run this file (in the terminal) use: node lab2.js

//*********************************************************
// SETUP
//*********************************************************

// We're going to use this special assert method again to
// test our code
function assert(expression, failureMessage) {
  if (!expression) {
    console.log('assertion failure: ', failureMessage);
  }
}

//*********************************************************
// PROBLEM 1: The Blob. 20 points
//*********************************************************

/* Dowington, PA had 1000 citizens on the night the blob escaped
 its meteorite. At first, the blob could only find and consume
 Pennsylvanians at a rate of 1/hour. However, each time it digested
 someone, it became faster and stronger: adding to its consumption
 rate by 1 person/hour.

    for the...      | starting rate of | persons consumed |
                    |  consumption     |    that hour     |
--------------------|------------------|------------------|
    first hour      |    1/hour        |        1         |
    second hour     |    2/hour        |        2         |
    third hour      |    3/hour        |        3         |
    fourth hour     |    4/hour        |        4         |

 TODO: First, make a constructor function, called Blob, that makes blobs.

 TODO: Next, create an instance of Blob named blob.

 TODO: Then, use a loop to calculate how long it took the blob to finish
 with Dowington.
*/
var Blob = function(townPopulation, initialRate) {
  this.townPopulation = townPopulation;
  this.initialRate = initialRate;
  this.rateIncrease = 1;
};

var blob = new Blob(1000, 1);

function timeToFinish() {
  var totalEaten = 0;
  var totalHours = 0;
  var currentRate = blob.initialRate;
  while (totalEaten < blob.townPopulation) {
    totalHours++;
    totalEaten += currentRate;
    currentRate += blob.rateIncrease;
  }
  return totalHours;
}

var hoursSpentInDowington = timeToFinish(); // TODO: assign me the value of the
                           // above calculation (how long it took
                           // the blob to eat Dowington)

// Now, write a method that takes a population for an arbitrary
// town, and the starting consumption rate, and returns the number
// of hours the blob needs to ooze its way through that town.

Blob.prototype.hoursToOoze = function(population, peoplePerHour) {
  // TODO: implement me based on the instructions above.
  // Be sure to then assign me to the Blob's prototype.
  var totalEaten = 0;
  var totalHours = 0;
  var currentRate = peoplePerHour;
  while (totalEaten < population) {
    totalHours++;
    totalEaten += currentRate;
    currentRate += this.rateIncrease;
  }
  return totalHours;
};

assert(blob.hoursToOoze(0, 1) === 0, 'no people means no time needed.');
assert(blob.hoursToOoze(1000, 1) === hoursSpentInDowington,
  'hoursSpentInDowington should match hoursToOoze\'s result for 1000');

// TODO: write three more assertions like the two above, testing out
// the hoursToOoze method.
assert(blob.hoursToOoze(1000, 1000) === 1, '1000 people per hour means population of 1000 are dead within one hour');
assert(blob.hoursToOoze(1, 0) === 2, 'if the blob rests for its first hour then the first person dies in the second hour');
assert(blob.hoursToOoze(3, 0) === 3, 'if the blob rests for its first hour then a total of three people are dead at the end of the third hour');

//*********************************************************
// PROBLEM 2: Universal Translator. 20 points
//*********************************************************

var hello = {
  klingon: 'nuqneH',  // home planet is Qo'noS
  romulan: 'Jolan\'tru', // home planet is Romulus
  'federation standard': 'hello' // home planet is Earth
};

// TODO: define a constructor that creates objects to represent
// sentient beings. They have a home planet, a language that they
// speak, and method (that you'll place on the prototype) called
// sayHello.
  // TODO: specify a home planet and a language
  // you'll need to add parameters to this constructor

var SentientBeing = function(homePlanet, homeLanguage) {
  this.homePlanet = homePlanet;
  this.homeLanguage = homeLanguage;
};

// sb is a SentientBeing object
  // TODO: say hello prints out (console.log's) hello in the
  // language of the speaker, but returns it in the language
  // of the listener (the sb parameter above).
  // use the 'hello' object at the beginning of this exercise
  // to do the translating
    //TODO: put this on the SentientBeing prototype
SentientBeing.prototype.sayHello = function(sb) {
    console.log(hello[this.homeLanguage]);
    return hello[sb.homeLanguage];
  };

// TODO: create three subclasses of SentientBeing, one for each
// species above (Klingon, Human, Romulan).

var Klingon = function() {
  this.homeLanguage = 'klingon';
};

var Human = function() {
  this.homeLanguage = 'federation standard';
};

var Romulan = function() {
  this.homeLanguage = 'romulan';
};

Human.prototype = new SentientBeing();
Klingon.prototype = new SentientBeing();
Romulan.prototype = new SentientBeing();

assert((new Human()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

// TODO: write five more assertions, to complete all the possible
// greetings between the three types of sentient beings you created above.

assert((new Human()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');
assert((new Klingon()).sayHello(new Human()) === 'hello',
  'the human should hear hello');
assert((new Klingon()).sayHello(new Romulan()) === 'Jolan\'tru',
  'the romulan should hear Jolan\'tru');
assert((new Romulan()).sayHello(new Human()) === 'hello',
  'the human should hear hello');
assert((new Romulan()).sayHello(new Klingon()) === 'nuqneH',
  'the klingon should hear nuqneH');

//*********************************************************
// PROBLEM 3: Sorting. 20 points.
//
// Implement the following functions. Write at least 2
// assertions for each one (the assertions are how you
// will test your code)
//*********************************************************

function lastLetterSort(stringArray) {
  function byLastLetter(a, b) {
    //TODO: implement me. sort the strings in alphabetical
    // order using their last letter
    // Read this about how the sort function works:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    // this byLastLetter function is a "compare function"
    // And check out the "comparing strings" section  here:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
    var lastA = a.charAt(a.length - 1);
    var lastB = b.charAt(b.length - 1);
    if (lastA > lastB) {
      return 1;
    } else if (lastA < lastB) {
      return -1;
    } else if (lastA === lastB) {
      return 0;
    }
  }
  stringArray.sort(byLastLetter);
}

function compareArrays(test, answer) {
  for (var i = 0; i < test.length; i++) {
    if (test[i] != answer[i]) {
      return false;
    }
  }
  return true;
}

var test1 = ['b', 'd', 'a', 'c'];
var test1Answer = ['a', 'b', 'c', 'd'];
lastLetterSort(test1);

var test2 = ['bart', 'dick', 'aaron', 'carl'];
var test2Answer = ['dick', 'carl', 'aaron', 'bart'];
lastLetterSort(test2);

assert(compareArrays(test1, test1Answer), 'the correct order is ' + test1Answer);
assert(compareArrays(test2, test2Answer), 'the correct order is ' + test2Answer);

function sumArray(numberArray) {
  var sum = 0;
  // TODO: implement me using forEach
  function addToSum(currentValue) {
    sum += currentValue;
  }
  numberArray.forEach(addToSum);
  return sum;
}

var arrayTest1 = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
sumArray(arrayTest1);

var arrayTest2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
sumArray(arrayTest2);

assert(sumArray(arrayTest1) === 5500, 'should add to 5500');
assert(sumArray(arrayTest2) === 55, 'should add to 55');

function sumSort(arrayOfArrays) {
  arrayOfArrays.sort(function(a, b) {
    // TODO: implement me using sumArray
    //  order the arrays based on the sum of the numbers
    //  inside each array
    return sumArray(a) - sumArray(b);
  });
}

var nestedArrays = [arrayTest1, arrayTest2];
sumSort(nestedArrays);

assert(sumArray(nestedArrays[0]) === 55, 'first array should be' + arrayTest2);
assert(sumArray(nestedArrays[1]) === 5500, 'first array should be' + arrayTest1);

//*********************************************************
// PROBLEM 4: Cleanup: 10 points
// Makes sure this file passes jshint and jscs
//
// ./node_modules/.bin/grunt jshint
// ./node_modules/.bin/grunt jscs
//*********************************************************
