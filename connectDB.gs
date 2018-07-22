  var instanceName = 'composed-sun-209421:asia-east1:openhackdb';
  var db = 'salesMembar';
  var userId = PropertiesService.getScriptProperties().getProperty("ID");
  var pass = PropertiesService.getScriptProperties().getProperty("PASS");
  var dbUrl = 'jdbc:google:mysql://' + instanceName + '/' + db; 

function access() {
  //DBに接続
  var conn = Jdbc.getCloudSqlConnection(dbUrl,userId,pass);
  Logger.log(conn.getCatalog());
  return conn;
}

//SELECT
function selectTable(){
  var conn = access();

  var str_id = 'dev@thewaggle.co.jp';  
  var stmt = conn.createStatement();
  stmt.setMaxRows(100);
  var rs = stmt.executeQuery('SELECT * FROM accounts;');

  while(rs.next()){
    var id = rs.getString('id');
    var mail = rs.getString("mail");
    var tel = rs.getString('tel');
    var name = rs.getString('name');
    var pass = rs.getString('password');
    var res = "id = " + id + "name = " + name + " mail = " + mail + " tel = " + tel + " pass = " + pass;
    Logger.log(res)
  }
  stmt.close();
  closeDb(conn);  
}

function closeDb(conn){
  //DBをクローズ
  conn.close();
}



