
import {JsonObject, JsonProperty} from "json2typescript";


@JsonObject("TblSymptom")
export class TblSymptom {

    @JsonProperty("Id", Number)
    _Id:number = undefined;
    get Id() { return this._Id; }
    set Id(value: number) { this._Id = value; }

    @JsonProperty("Symptom", String)
    _Symptom:string = undefined;
    get Symptom() { return this._Symptom; }
    set Symptom(value: string) { this._Symptom = value; }
    

    @JsonProperty("Type", String)
    _Type:string = undefined;
    get Type() { return this._Type; }
    set Type(value: string) { this._Type = value; }


    @JsonProperty("Detail", String)
    _Detail:string = undefined;
    get Detail() { return this._Detail; }
    set Detail(value: string) { this._Detail = value; }

}