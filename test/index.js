import test from 'tape';
import BinarySearchIndex from '../index.js';

var values = [
  { value: 0, id: 0 },
  { value: 10, id: 1 },
  { value: 20, id: 2 },
  { value: 30, id: 3 },
  { value: 40, id: 4 },
  { value: 50, id: 5 },
  { value: 60, id: 6 },
  { value: 70, id: 7 },
  { value: 80, id: 8 },
  { value: 90, id: 9 },
  { value: 100, id: 10 }
];

test('should exist', function (t) {
  t.ok(BinarySearchIndex);
  t.end();
});

test('should init with values', function (t) {
  var index = new BinarySearchIndex(values);
  t.deepEqual(index.values, values);
  t.end();
});

test('should sort values', function (t) {
  var index = new BinarySearchIndex([
    values[0],
    values[9],
    values[3],
    values[5],
    values[2]
  ]);

  index.sort();

  t.equal(index.values[0].id, 0);
  t.equal(index.values[index.values.length - 1].id, 9);

  t.end();
});

test('should get an index of a value', function (t) {
  var index = new BinarySearchIndex(values);
  var result = index.getIndex(50);
  t.equal(result, 5);
  t.end();
});

test('should get items between 2 values', function (t) {
  var index = new BinarySearchIndex(values);
  var result = index.between(25, 60);
  t.deepEqual(result, [
    { value: 30, id: 3 },
    { value: 40, id: 4 },
    { value: 50, id: 5 },
    { value: 60, id: 6 }
  ]);
  t.end();
});

test('should query for insertion point', function (t) {
  var index = new BinarySearchIndex(values);
  var insertAt = index.getIndex(55);
  t.equal(insertAt, 6);
  index.insert({value: 55, id: 5.5}, insertAt);
  var result = index.between(25, 60);
  t.deepEqual(result, [
    { value: 30, id: 3 },
    { value: 40, id: 4 },
    { value: 50, id: 5 },
    { value: 55, id: 5.5 },
    { value: 60, id: 6 }
  ]);
  t.end();
});

test('should query for insertion point', function (t) {
  var index = new BinarySearchIndex(values);
  index.bulkAdd([
    { value: 30, id: 3 },
    { value: 40, id: 4 },
    { value: 50, id: 5 }
  ]);
  var results = index.between(30, 55);
  t.equal(results.length, 6);
  t.end();
});