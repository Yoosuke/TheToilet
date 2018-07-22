function doGet(e) {
  var page = e.parameter["page"];
  
  if( page == "index" || page == null){
       
       return HtmlService.createTemplateFromFile('index')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1')
      .setTitle('The Toillet');
    
  } else {
      
    try {
      
      return HtmlService.createTemplateFromFile(page)
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle('The Toillet の' + page);
      
    } catch (e) {
      
      handleError(e);

    } finally {
      Logger.log(page);
    }
  } 
}

/*html templateに外部htmlを追加する関数*/
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
