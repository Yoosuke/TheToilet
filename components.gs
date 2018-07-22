/* プロパティからKEYを取得するグローバル変数 */
var appId = PropertiesService.getScriptProperties().getProperty("HEREID");
var appCode = PropertiesService.getScriptProperties().getProperty("HERECODE");

/* HEREAPPCODEを取得する関数 */
function getHereCode(){
     return appCode;
}

/* HEREAPPIDを取得する関数 */
function getHereId(){
  return appId;
}

/*doGet関数 htmlテンプレート表示*/
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

/*エラーを出力する関数*/
function handleError(e) {
    var errMsg = "【エラーが発生しました】\n";
 
    errMsg += "メッセージ：" + e.message + "\n";
    
    if (e.fileName && e.lineNumber) {
        errMsg += "ファイル名：" + e.fileName + "、 行番号：" + e.lineNumber + "\n";
    }
 
    if (e.stack) {
        errMsg += "---- スタックトレース： ----\n";
        errMsg += e.stack + "\n";
        errMsg += "---------------------------\n";
    }
 
    console.error(errMsg);
}

/*アップロードしたファイルのURIを取得する*/

var readFileData;//Global変数

function processForm(formObject) {
  var evaluationText = formObject.myText;
  
  if(typeof(formObject.myFile) != "undefined" && formObject.myFile.getBytes().length > 0){
    var formBlob = formObject.myFile;
    var driveFile = DriveApp.createFile(formBlob);
    var image = {myfile:formBlob};
    
  }else{
    var formBlob = null;
    var image = {}; 
  }
  
  if (formBlob){
    return driveFile.getUrl();
  }else{
    return "";
  }  
}

/*取得した全角を半角にする*/
function getData() {    
  
  // 読み込んだテキストデータの全角英数字を半角に変換する
  return readFileData.replace(/[ａ-ｚＡ-Ｚ０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 65248);
  });
  
}

/*２点間の距離を求める関数*/
function distanceTwoPoints() {
  var rPolar = 6356.752;
  var rEquator = 6378.137;
  var pi = 3.14;
  var deg = 360; //degrees  
  var LatDist = rPolar * 2 * pi /　deg; //Latitude distance
　　　　var LngDist = rEquator * 2　* pi / deg;//Longitude distance
  var getlat;
  var getlng; 
  var toilletLat;
  var toilletLng;
 
  //cos（　【地点の緯度】　÷　180　×　π　）　×　【赤道半径】
  //【地点の緯度における半径】　×　2　×　π　÷　360
  
}

//SpreadSheetの取得
var SpreadID = PropertiesService.getScriptProperties().getProperty("SPID");
var sh = SpreadsheetApp.openById(SpreadID);
var getSheet = sh.getSheets()[0];

/* spreadSheetへの緯度経度のセット*/
function setLatLngSheet(lat,lng){
  getSheet.getRange(1,1).setValue(lat);
  getSheet.getRange(1,2).setValue(lng);
}

/* spreadSheetから現在地の緯度経度の取得　*/
function getLat(){
  return getSheet.getActiveRange(1,1).getValue();
}

function getLng(){
  return getSheet.getActiveRange(1,2).getValue();
}



