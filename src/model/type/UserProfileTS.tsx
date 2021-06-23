export type UserProfileTS = {
    data : {
        id: string ;
        first_name:  string ;
        last_name : string  ;
        username : string ;
        email : string ;
        slug: string;
    },
    label : {
        first_name:  string ;
        last_name : string  ;
        username : string ;
        email : string ;
    },
    rules : {
        first_name:  string ;
        last_name : string  ;
        username : string ;
        email : string ;
    },
    sanitize : {
        first_name:  string ;
        last_name : string  ;
        username : string ;
        email : string ;
    },
    token : {
        token_type:  string ;
        expires_in : string  ;
        access_token : string ;
        refresh_token : string ;
    }
};


export const UserProfileTSImp : UserProfileTS = {
    data : {
        id: '',
        first_name : ``,
        last_name : ``,
        username : ``,
        email : '',
        slug: 'client'
    },
    label : {
        first_name : `First name`,
        last_name : `Last name`,
        username : `Username`,
        email : 'Email',
    },
    rules : {
        first_name: 'required|alpha',
        last_name: 'required|alpha',
        username: 'required|alpha_numeric',
        email : 'required|email',
    },
    sanitize : {
        first_name: 'trim|strip_tags',
        last_name: 'trim|strip_tags',
        username: 'trim|strip_tags',
        email : 'trim|strip_tags',
    },
    token : {
        token_type: '',
        expires_in: '',
        access_token: '',
        refresh_token: '',
    },
};

