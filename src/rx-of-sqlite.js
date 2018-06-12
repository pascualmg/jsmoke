import {Observable} from 'rxjs';
import ConexionExample from "./core/ConexionExample"; // A tomar por culo los problemas de asincronía , Cuenca 2017.
import sqlite from 'sqlite3';

sqlite.verbose();

function rxObservableOfSqliteQuery(query, db) {
    return Observable.create(function Subscription(observer) {
        const conn = ConexionExample.generate();
        try {
            conn.query(
                query,
                (item) => observer.next(item),
                () => {
                    observer.complete()
                }
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
