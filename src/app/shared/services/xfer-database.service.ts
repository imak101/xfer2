import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {XferDataEntry} from "../interfaces/xfer-data-entry";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class XferDatabaseService {
  private path = "http://127.0.0.1:5001/groupscrobbler/us-central1/xfer2"

  constructor(private http: HttpClient) { }

  getAllEntries(): any {
    return this.http.get(this.path, {
      params: {user: "imak101"}
    }).pipe(
      map((data) => {
        const x = JSON.parse(data as string);
        console.log(x)
        return data;
      })
    ).subscribe();
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
      params: {user: "imak101",},
      headers: {"Content-Type": "application/json"}
    });
  }
}
