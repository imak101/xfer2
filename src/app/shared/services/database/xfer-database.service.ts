import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {XferDataEntry} from "../../interfaces/xfer-data-entry";
import {map, Observable} from "rxjs";
import {XferLocalStorageService} from "../local-storage/xfer-local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class XferDatabaseService {
  // private path = "http://127.0.0.1:5001/groupscrobbler/us-central1/xfer2";
  private path = "https://xfer2-tbxfifckza-uc.a.run.app";

  constructor(private http: HttpClient, private xferLocalStorage: XferLocalStorageService) { }

  getAllEntries(): Observable<XferDataEntry[]> {
    return this.http.get(this.path, {
      params: {user: this.xferLocalStorage.getUsername() ?? "null"}
    }).pipe(
      map((data) => {
        return data as XferDataEntry[];
      })
    );
  }

  saveEntry(entry: XferDataEntry) {
    const payload = {
      [entry.date]: {
        callsTaken: entry.callsTaken,
        callsXfer: entry.callsXfer
      }
    };

    return this.http.post(this.path,
    payload,
    {
      params: {user: this.xferLocalStorage.getUsername() ?? "null"},
      headers: {"Content-Type": "application/json"}
    });
  }
}
