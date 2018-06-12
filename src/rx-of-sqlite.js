import {Observable} from 'rxjs';

function rxObservableOfSqliteQuery(query, db) {
    return Observable.create(function Subscription(observer) {
        const conn = ConexionExample.generate();
        try {
            db.each(
                query,
                (err, row) => {
                    if (typeof(err) === "undefined") {
                        observer.error(err);
                    }
                   observer.next(row);
                },
                () => { observer.complete() }
            );
        } catch (e) {
            observer.error(e);
        }
        return () => {
            conn.close()
        };
    });
}
export default rxObservableOfSqliteQuery;
