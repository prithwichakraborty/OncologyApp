
import {JsonObject, JsonProperty} from "json2typescript";


@JsonObject("TblProvider")
export class TblProvider {

    @JsonProperty("Id", Number)
    _Id:number = undefined;
    get Id() { return this._Id; }
    set Id(value: number) { this._Id = value; }

    @JsonProperty("Name", String)
    _Name:string = undefined;
    get Name() { return this._Name; }
    set Name(value: string) { this._Name = value; }

    
    @JsonProperty("Address", String)
    _Address:string = undefined;
    get Address() { return this._Address; }
    set Address(value: string) { this._Address = value; }


    @JsonProperty("Type", String)
    _Type:string = undefined;
    get Type() { return this._Type; }
    set Type(value: string) { this._Type = value; }


    @JsonProperty("Website", String)
    _Website:string = undefined;
    get Website() { return this._Website; }
    set Website(value: string) { this._Website = value; }


    @JsonProperty("Latitude", Number)
    _Latitude:number = undefined;
    get Latitude() { return this._Latitude; }
    set Latitude(value: number) { this._Latitude = value; }


    @JsonProperty("Longitude", Number)
    _Longitude:number = undefined;
    get Longitude() { return this._Longitude; }
    set Longitude(value: number) { this._Longitude = value; }

}