import { Attendace } from './../app/models/attendance.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Service{

    BASE_URL = "http://192.168.1.107:8080";
    
    constructor(private http: HttpClient) { 
    
    }

    getGetLastAttendanceByMemberId(memberId) {
        return this.http.get(this.BASE_URL + "/attendances/get-last-attendance/" + memberId);
    }

    isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
    
        return JSON.stringify(obj) === JSON.stringify({});
    }
    
}