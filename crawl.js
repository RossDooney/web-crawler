const { JSDOM } = require('jsdom')

async function crawlPage(currentURL){
    console.log(`Crawling ${currentURL}`)
    try {
        const resp = await fetch(currentURL)       

        if (resp.status > 399){
            console.log(`error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return
        }
        
        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")){
            console.log(`non html reponse on page ${currentURL}, content type: ${contentType}`)
            return

        }

        console.log(await resp.text())
    } catch (error) {
        console.log(`fetch error: ${error.message}, on page: ${currentURL} `)
    }




}


function getURLsFromHTLM(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkEles = dom.window.document.querySelectorAll('a')
    for(let linkEle of linkEles){ 
  
        if (linkEle.href.slice(0,1) === "/"){
            try {
                const urlObject = new URL(`${baseURL}${linkEle}`)
                urls.push(removeTrailingSlash(urlObject.href) )
            } catch (error) {
                console.log("error with url give: " + error.message)   
            }
        }else{    
            try {
                const urlObject = new URL(`${baseURL}${linkEle}`)
                urls.push(removeTrailingSlash(linkEle.href))
            } catch (error) {
                console.log("error with url give: " + error.message)   
            }             
           
        }
    }
    return urls

}

function normalizeURL(urlString){
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`    
    return removeTrailingSlash(hostPath)
}

function removeTrailingSlash(url){
    if(url.slice(-1) === "/"){
        return url.slice(0,-1)
    }
    return url
}


module.exports = {
    normalizeURL,
    getURLsFromHTLM,
    crawlPage
}