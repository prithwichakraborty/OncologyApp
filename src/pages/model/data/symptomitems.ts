import { Component } from '@angular/core';

export class SymptomItems {

    private _Id: number;
    get Id(): number { return this._Id; }
    set Id(value: number) { this._Id = value; }

    private _Value: string;
    get Value(): string { return this._Value; }
    set Value(value: string) { this._Value = value; }

    private _Type: string;
    get Type(): string { return this._Type; }
    set Type(value: string) { this._Type = value; }

    private _Detail: string;
    get Detail(): string { return this._Detail; }
    set Detail(value: string) { this._Detail = value; }


}