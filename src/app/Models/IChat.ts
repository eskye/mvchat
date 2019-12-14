export interface IChatCommand{
    cmd:string;
    
}

export interface IChatNick{
    nick:string;
}

export interface IChatJoin extends IChatCommand, IChatNick{
    channel:string;
    
}

export interface IChatMessage extends IChatCommand{
    text:string;
}

export interface IChatHelp extends IChatCommand{
    category:string;
    command:string;
}


export interface IChatIp extends IChatCommand{
    ip:string;
    hash:string;
}

export interface IChatGeneric<T>{
     
}