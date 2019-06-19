
import {JsonObject, JsonProperty} from "json2typescript";


@JsonObject("TblContact")
export class TblContact {

    @JsonProperty("Id", Number)
    _Id:number = undefined;
    get Id() { return this._Id; }
    set Id(value: number) { this._Id = value; }


    @JsonProperty("ProviderId", Number)
    _ProviderId:number = undefined;
    get ProviderId() { return this._Id; }
    set ProviderId(value: number) { this._ProviderId = value; }



    @JsonProperty("Name", String)
    _Name:string = undefined;
    get Name() { return this._Name; }
    set Name(value: string) { this._Name = value; }

    
    @JsonProperty("Location", String)
    _Location:string = undefined;
    get Location() { return this._Location; }
    set Location(value: string) { this._Location = value; }


    @JsonProperty("Type", String)
    _Type:string = undefined;
    get Type() { return this._Type; }
    set Type(value: string) { this._Type = value; }


    @JsonProperty("Phone", String)
    _Phone:string = undefined;
    get Phone() { return this._Phone; }
    set Phone(value: string) { this._Phone = value; }


    @JsonProperty("Email", String)
    _Email:string = undefined;
    get Email() { return this._Email; }
    set Email(value: string) { this._Email = value; }


    @JsonProperty("Note", String)
    _Note:string = undefined;
    get Note() { return this._Note; }
    set Note(value: string) { this._Note = value; }

}