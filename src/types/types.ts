export interface ServerData {
    data: Data;
}


export interface TokenData {
    respid: string;
    command: string;
    status: number;
    result: {
        rtn: boolean;
        token: string;
    };
    error: Error[];
    path: any[];
}

export interface Data {
    respid: string;
    command: string;
    status: number;
    result: Result[];
    error: Error[];
    path: any[];
}

interface Error {
    err: number;
    code: string;
    line: string;
    col: string;
    msg: string;
}

export interface Result {
    Status: string;
    TotalCount: number;
    BOLs: BOL[];
}

export interface BOL {
    Terminal: string;
    TransDate: string;
    TransRefNo: string;
    TransTime: string;
    doc_no: string;
    selected: boolean;
    trailer1: string;
    trailer2: string;
    trailer3: string;
    truck: string;
    unformattedDate: string;
    BLOB?: string;
}


export interface IBlobData {
    command: string;
    error: any[];
    path: any[];
    respid: string;
    result: IBlobDataResult[];
    status: number;
}
export interface IBlobDataResult {
    BLOB: string;
    Status: string;
    trans_ref_no: string;
    uploaded_on: string;
}

export interface BLOBROOT {
    key: string
    name: string
    params: BLOBParams
    path: string
  }
  
  export interface BLOBParams {
    Terminal: string
    TransDate: string
    TransRefNo: string
    TransTime: string
    doc_no: string
    unformattedDate: string
  }
  