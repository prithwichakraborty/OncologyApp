
import {JsonObject, JsonProperty} from "json2typescript";


@JsonObject("TblSspedi")
export class TblSspedi {

    @JsonProperty("Id", Number)
    _Id:number = undefined;
    get Id() { return this._Id; }
    set Id(value: number) { this._Id = value; }

    @JsonProperty("Date", String)
    _Date:string = undefined;
    get Date() { return this._Date; }
    set Date(value: string) { this._Date = value; }

    
    @JsonProperty("Day", String)
    _Day:string = undefined;
    get Day() { return this._Day; }
    set Day(value: string) { this._Day = value; }


    @JsonProperty("Disappointed", Number)
    _Disappointed:number = undefined;
    get Disappointed() { return this._Disappointed; }
    set Disappointed(value: number) { this._Disappointed = value; }


    @JsonProperty("Scared", Number)
    _Scared:number = undefined;
    get Scared() { return this._Scared; }
    set Scared(value: number) { this._Scared = value; }


    @JsonProperty("Cranky", Number)
    _Cranky:number = undefined;
    get Cranky() { return this._Cranky; }
    set Cranky(value: number) { this._Cranky = value; }

}