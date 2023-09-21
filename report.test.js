const {sortPages} = require('./report.js')

const {test, expect } = require('@jest/globals')

test('sortPages', () =>{
    const input = {
        'https://wagslane.dev.ie': 3,
        'https://wagslane.dev.ie/path': 1
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev.ie', 3],
        ['https://wagslane.dev.ie/path', 1]
    ]
    expect(actual).toEqual(expected)
}) 


test('sortPages multiple pages', () =>{
    const input = {
        'https://wagslane.dev.ie': 3,
        'https://wagslane.dev.ie/path1': 1,
        'https://wagslane.dev.ie/path2': 11,
        'https://wagslane.dev.ie/path3': 21,
        'https://wagslane.dev.ie/path4': 2,
        'https://wagslane.dev.ie/path5': 6
    }
    const actual = sortPages(input)
    const expected = [
        ['https://wagslane.dev.ie/path3', 21],
        ['https://wagslane.dev.ie/path2', 11],
        ['https://wagslane.dev.ie/path5', 6],
        ['https://wagslane.dev.ie', 3],
        ['https://wagslane.dev.ie/path4', 2],
        ['https://wagslane.dev.ie/path1', 1]
    ]
    expect(actual).toEqual(expected)
}) 