const URI = "http://127.0.0.1:5000";

export const UserApi = {

    createUser: async () => {
        const response = await fetch(URI + "signup", {

        });
        console.log(response);
    },

    getUserByCredentials: async (username, password,setUser) => {
        try{
            const response = await fetch(URI + "/login", {
                // Specify the type of HTTP request being made -> POST
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                // Send the username and password as a JSON object
                body: JSON.stringify({username: username, password: password})
            });
        
            if(response.ok){
                const data = await response.json();
                console.log("Data: ",data);
                setUser(data);
            } else {
                console.error("Error:", response.status);
            }
           

        } catch(error){
            console.error("Error: ", error);
        }

    //     fetch(URI + "/login",{
    //         method: "POST",
    //         body: JSON.stringify({
    //             username: username,
    //             password: password,
    //         }),
    //         headers: {
    //             "Content-type": "application/json; charset=UTF-8"
    //         }
    //     })
    //     .then((result) => {
    //         return result.json();
    //     })
    //     .then((data) =>{
    //         console.log(data)
    //         setUser(data);
                       
    //     })
    //     .catch((error)=>{console.log(error)});
    }
}