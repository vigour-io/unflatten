'use strict'

const test = require('tape')
const unflatten = require('../')

const testCases = {
  separator: '/',
  plain: [
    // ['object', unflattened]
    [{ 'a.b.c': 'd' }, { a: { b: { c: 'd' } } }],
    [{ 'a.b.c': 'd', 'a.b.e': 'f' }, { a: { b: { c: 'd', e: 'f' } } }],
    [{ a: 'b' }, { a: 'b' }],
    [{ 'a.0': 'hello', 'a.1': 'world' }, { a: ['hello', 'world'] }]
  ],
  withSeparator: [
    // ['object', unflattened]
    [{ 'a/b/c': 'd' }, { a: { b: { c: 'd' } } }],
    [{ 'a/b/c': 'd', e: 'f' }, { a: { b: { c: 'd' } }, e: 'f' }],
    [{ 'a/0': 'hello', 'a/1': 'world' }, { a: ['hello', 'world'] }]
  ],
  objectModeOff: [
    // ['object', unflattened]
    [{ 'a.0': 'hello', 'a.1': 'world' }, { a: ['hello', 'world'] }]
  ],
  objectModeOn: [
    // ['object', unflattened]
    [{ 'a.0': 'hello', 'a.1': 'world' }, { a: { 0: 'hello', 1: 'world' } }]
  ]
}

test('unflatten with no arguments', function (t) {
  t.plan(testCases.plain.length)
  testCases.plain.forEach(function (item) {
    t.deepEqual(unflatten(item[0]),
      item[1],
      'unflatten(' + JSON.stringify(item[0]) + ') === ' + JSON.stringify(item[1]))
  })
})

test('unflatten with a different separator', function (t) {
  t.plan(testCases.withSeparator.length)
  testCases.withSeparator.forEach(function (item) {
    t.deepEqual(unflatten(item[0], { separator: testCases.separator }),
      item[1],
      'unflatten(' + JSON.stringify(item[0]) + ', { separator: \'' +
        testCases.separator + '\' }) === ' + JSON.stringify(item[1]))
  })
})

test('separator shortcut', function (t) {
  t.plan(testCases.withSeparator.length)
  testCases.withSeparator.forEach(function (item) {
    t.deepEqual(unflatten(item[0], testCases.separator),
      item[1],
      'unflatten(' + JSON.stringify(item[0]) + ', \'' +
        testCases.separator + '\') === ' + JSON.stringify(item[1]))
  })
})

test('unflatten with object mode off', function (t) {
  t.plan(testCases.objectModeOff.length * 2)
  testCases.objectModeOff.forEach(function (item) {
    const unflattened = unflatten(item[0])
    t.deepEqual(unflattened,
      item[1],
      'unflatten(' + JSON.stringify(item[0]) + ') === ' + JSON.stringify(item[1]))
    t.equal(unflattened.a instanceof Array, true, 'converts array-like things to arrays')
  })
})

test('unflatten with object mode on', function (t) {
  t.plan(testCases.objectModeOn.length * 2)
  testCases.objectModeOn.forEach(function (item) {
    const unflattened = unflatten(item[0], { objectMode: true })
    t.deepEqual(unflattened,
      item[1],
      'unflatten(' + JSON.stringify(item[0]) + ', { objectMode: true }) === ' + JSON.stringify(item[1]))
    t.equal(unflattened.a instanceof Array, false, 'converts array-like things to objets')
  })
})

test('object mode shortcut', function (t) {
  t.plan(testCases.objectModeOn.length * 2)
  testCases.objectModeOn.forEach(function (item) {
    const unflattened = unflatten(item[0], true)
    t.deepEqual(unflattened,
      item[1],
      'unflatten(' + JSON.stringify(item[0]) + ', true) === ' + JSON.stringify(item[1]))
    t.equal(unflattened.a instanceof Array, false, 'converts array-like things to objets')
  })
})
