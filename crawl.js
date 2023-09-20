const { JSDOM } = require('jsdom')

function getURLsFromHTLM(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkEles = dom.window.document.querySelectorAll('a')
    for(const linkEle of linkEles){
        
        if (linkEle.href.slice(0,1) === "/"){
            urls.push(`${baseURL}${linkEle.href}`)
        }
        else{         
            
            if (linkEle.href.length > 0 && linkEle.href.slice(-1) == "/"){
                urls.push(linkEle.href.slice(0,-1))
            }else{
               urls.push(linkEle.href)
            }
        }
    }
    return urls

}

function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) == "/"){
        return hostPath.slice(0, -1)
    }
    return hostPath
}


module.exports = {
    normalizeURL,
    getURLsFromHTLM
}