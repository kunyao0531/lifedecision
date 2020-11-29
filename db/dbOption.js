//填入你的本機端資料庫連線資訊
var db_option = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'germany',
    port: 3306
}

exports.db_option = function() {
    return db_option;
}