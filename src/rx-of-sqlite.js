import {Observable} from 'rxjs';

/**
 * Creates an Observable of an SQL query from SQLite db
 * @param query plain sql text.
 * @param db SQLite DataBase
 * @returns {*}
 */
function rxObservableOfSqliteQuery(query, db) {
    return Observable.create(function Subscription(observer) {
        try {
            db.each(//https://www.npmjs.com/package/sqlite3
                query,
                function onEachRow(err, row){
                    if(err) observer.error(err);
                    observer.next(row);
                },
                function onComplete() {
                     observer.complete();
                }
            );
        } catch (e) {
            observer.error(e);
        }
        return function unsubscribe() {
            console.log('unsubscribed.',);//TODO: borrame.
        }
    });
}
export default rxObservableOfSqliteQuery;
