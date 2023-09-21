const {sortPages} = require('./report.js')

const {test, expect } = require('@jest/globals')

test('sortPages', () =>{
    const input = {
        'https://rte.ie': 3
    }
    const actual = sortPages(input)
    const expected = []
    expect(actual).toEqual(expected)
}) 