import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {XferDataEntry} from "../../interfaces/xfer-data-entry";
import {map, Observable} from "rxjs";
import {XferLocalStorageService} from "../local-storage/xfer-local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class XferDatabaseService {/
  constructor(private http: HttpClient, private xferLocalStorage: XferLocalStorageService) { }

  private defaultEntry(): XferDataEntry {
    return {
      date: new Date().toLocaleDateString(),
      callsXfer: 0,
      callsTaken: 0,
    }
  }

  private convertLocalEntries(): object[] {
    const json = JSON.parse(localStorage.getItem("dataTest") ?? JSON.stringify(this.defaultEntry()))
    const keys = Object.keys(json);

    const output = [];
    for (let key of keys) {
      output.push({
        date: key,
        callsXfer: json[key].callsXfer,
        callsTaken: json[key].callsTaken,
      });
    }
    return output;
  }

  getAllEntries(): Observable<XferDataEntry[]> {
    return this.http.get("", {
      responseType: "text",
    }).pipe(
      map(() => {
        return this.convertLocalEntries() as XferDataEntry[]
      })
    );
  }

  saveEntry(entry: XferDataEntry) {
    const pastData = localStorage.getItem("dataTest") ?? "{}"
    const json = JSON.parse(pastData);
    json[entry.date.replaceAll('/', '-')] = {
      callsTaken: entry.callsTaken,
      callsXfer: entry.callsXfer
    }
    localStorage.setItem("dataTest", JSON.stringify(json));

    return new Observable()
  }
}
