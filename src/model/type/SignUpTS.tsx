export type SignUpTS = {
    data : {
        first_name:  string ;
        last_name : string  ;
        username : string ;
        email : string ;
        password : string ;
        role_slug: string;
    },
    label : {
        first_name:  string ;
        last_name : string  ;
        username : string ;
        email : string ;
        password : string ;
    },
    rules : {
        first_name:  string ;
        last_name : string  ;
        username : string ;
        email : string ;
        password : string ;
    },
    sanitize : {
        first_name:  string ;
        last_name : string  ;
        username : string ;
        email : string ;
        password : string ;
    }
}

export const signUpTSImp : SignUpTS = {
    data : {
        first_name : ``,
        last_name : ``,
        username : ``,
        email : '',
        password : '',
        role_slug: 'client',
    },
    label : {
        first_name : `First name`,
        last_name : `Last name`,
        username : `Username`,
        email : `Email`,
        password : `Password`,
    },
    rules : {
        first_name: 'required|alpha',
        last_name: 'required|alpha',
        username: 'required|alpha_numeric',
        email : 'required|email',
        password : 'required',
    },
    sanitize : {
        first_name: 'trim|strip_tags',
        last_name: 'trim|strip_tags',
        username: 'trim|strip_tags',
        email : 'trim|strip_tags',
        password : 'trim|strip_tags',
    }
};
