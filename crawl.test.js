const {normalizeURL, getURLsFromHTML} = require('./crawl.js')

const {test, expect } = require('@jest/globals')

test('normalizeURL strip protocol', () =>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
}) 

test('normalizeURL strip trailing  slash', () =>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
}) 

test('normalizeURL uppercase', () =>{
    const input = 'https://BLog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
}) 

test('normalizeURL strip http', () =>{
    const input = 'http://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
}) 

test('getURLsFromHTML', () =>{
    const inputHTML = `
    <html>
        <body>
            <a href="https://blog.boot.dev">
                Boot.dev.blog
            </a>
        </body>
    </html>    
    `
    const inputURL = 'blog.boot.dev'
    const actual = getURLsFromHTML(inputHTML, inputURL)
    const expected = ["https://blog.boot.dev/"]
    expect(actual).toEqual(expected)
}) 

test('getURLsFromHTML relative', () =>{
    const inputHTML = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1">
                Boot.dev.blog
            </a>
            <a href="/path2">
                Boot.dev.blog
            </a>
        </body>
    </html>    
    `
    const inputURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTML, inputURL)
    const expected = ["https://blog.boot.dev/path1", "https://blog.boot.dev/path2"]
    expect(actual).toEqual(expected)
}) 

test('getURLsFromHTML Invalid', () =>{
    const inputHTML = `
    <html>
        <body>
            <a href="invalid">
                Boot.dev.blog
            </a>
        </body>
    </html>    
    `
    const inputURL = 'blog.boot.dev'
    const actual = getURLsFromHTML(inputHTML, inputURL)
    const expected = []
    expect(actual).toEqual(expected)
}) 