
import {JsonObject, JsonProperty} from "json2typescript";


@JsonObject("TblBloodResult")
export class TblBloodResult {

    @JsonProperty("Id", Number)
    _Id:number = undefined;
    get Id() { return this._Id; }
    set Id(value: number) { this._Id = value; }

    @JsonProperty("Wcc", Number)
    _Wcc:number = undefined;
    get Wcc() { return this._Wcc; }
    set Wcc(value: number) { this._Wcc = value; }

    
    @JsonProperty("Neutrophils", Number)
    _Neutrophils:number = undefined;
    get Neutrophils() { return this._Neutrophils; }
    set Neutrophils(value: number) { this._Neutrophils = value; }


    @JsonProperty("Weight", Number)
    _Weight:number = undefined;
    get Weight() { return this._Weight; }
    set Weight(value: number) { this._Weight = value; }


    @JsonProperty("Height", Number)
    _Height:number = undefined;
    get Height() { return this._Height; }
    set Height(value: number) { this._Height = value; }


    @JsonProperty("Hb", Number)
    _Hb:number = undefined;
    get Hb() { return this._Hb; }
    set Hb(value: number) { this._Hb= value; }


    @JsonProperty("Platelets", Number)
    _Platelets:number = undefined;
    get Platelets() { return this._Platelets; }
    set Platelets(value: number) { this._Platelets = value; }

    @JsonProperty("Date", String)
    _Date:string = undefined;
    get Date() { return this._Date; }
    set Date(value: string) { this._Date = value; }


    @JsonProperty("Day", String)
    _Day:string = undefined;
    get Day() { return this._Day; }
    set Day(value: string) { this._Day = value; }

}