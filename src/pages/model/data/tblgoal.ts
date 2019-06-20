import {JsonObject, JsonProperty} from "json2typescript";


@JsonObject("TblGoal")
export class TblGoal {

    @JsonProperty("Id", Number)
    _Id:number = undefined;
    get Id() { return this._Id; }
    set Id(value: number) { this._Id = value; }

    @JsonProperty("Goal", String)
    _Goal:string = undefined;
    get Goal() { return this._Goal; }
    set Goal(value: string) { this._Goal = value; }
    

    @JsonProperty("CompletionDate", String)
    _CompletionDate:string = undefined;
    get CompletionDate() { return this._CompletionDate; }
    set CompletionDate(value: string) { this._CompletionDate = value; }


    @JsonProperty("Complete", Number)
    _Complete:number = undefined;
    get Complete() { return this._Complete; }
    set Complete(value: number) { this._Complete = value; }


    @JsonProperty("DateCompleted", String)
    _DateCompleted:string = undefined;
    get DateCompleted() { return this._DateCompleted; }
    set DateCompleted(value: string) { this._DateCompleted = value; }

}