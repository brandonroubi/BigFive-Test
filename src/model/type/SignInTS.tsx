export type SignInTS = {
    data : {
        email : string ;
        password : string ;
        role_slug: string ;
    },
    label : {
        email : string ;
        password : string ;
    },
    rules : {
        email : string ;
        password : string ;
    },
    sanitize : {
        email : string ;
        password : string ;
    }
};

export const signInTSImp : SignInTS = {
    data : {
        email : '',
        password : '' ,
        role_slug: 'client',
    },
    label : {
        email : `Email`,
        password : `Password`,
    },
    rules : {
        email : 'required|email',
        password : 'required',
    },
    sanitize : {
        email : 'trim|strip_tags',
        password : 'trim|strip_tags',
    }
};
