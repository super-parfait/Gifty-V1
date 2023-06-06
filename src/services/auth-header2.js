

export default function authID(){
        const UserId = JSON.parse(localStorage.getItem('generate_id_user')).UserId;

        if (UserId){
                return {"UserId":UserId}
        }else{
                return {}
        }
}