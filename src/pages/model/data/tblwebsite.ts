import {JsonObject, JsonProperty} from "json2typescript";


@JsonObject("TblWebsite")
export class TblWebsite {

    @JsonProperty("Id", Number)
    _Id:number = undefined;
    get Id() { return this._Id; }
    set Id(value: number) { this._Id = value; }

    @JsonProperty("Website", String)
    _Website:string = undefined;
    get Website() { return this._Website; }
    set Website(value: string) { this._Website = value; }
    

    @JsonProperty("Url", String)
    _Url = undefined;
    get Url() { return this._Url; }
    set Url(value: string) { this._Url = value; }


}