import {Observable} from 'rxjs';
/**
 * todo: doc.
 */
function rxObservableOfSqliteQuery(query, db) {
    return Observable.create(function Subscription(observer) {
        try {

            db.each(query, (err, row) => {
                    observer.next(row);
                },
                () => {
                    observer.complete()
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
