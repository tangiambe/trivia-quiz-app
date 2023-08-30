const URI = "http://127.0.0.1:5000";

export const QuizApi = {

    getQuizSets: async (setQuizSets) => {

        try{
            const response = await fetch(URI + "/quizsets",)
    
            // console.log(response);
            if(response.ok){
                const data = await response.json();
                console.log("Quizsets: ", data);
                setQuizSets(data);
    
            } else{
                console.error("Error: ", response.status);
            }

       } catch(error){
            console.error("Error: ", error);
       }

    },

    getQuizById: async (id, setQuiz, setTotalQuestions, setShow) => {
        try{
            const response = await fetch(URI + `/quizset/${id}`);
        
            if(response.ok){
                const data = await response.json();
                console.log("Data: ", data);
                setQuiz(data);
                setTotalQuestions(data.questions.length);
                setShow(true);
               
            } else {
                console.error("Error:", response.status);
                
            }
           

        } catch(error){
            console.error("Error: ", error);
        }

    }
}