import React, { useState, useEffect } from "react";

import axios from 'axios';

const Quiz = () => {

    
    const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [topic , setTopic ] = useState("")


  const [description , setDescription ]= useState("")

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("/api/Uw5CrX");
        setQuestions(res.data.questions); 

        setCurrentQuestion(res.data.questions[0].description); 
        setCurrentOptions(res.data.questions[0].options); 
        setTopic(res.data.topic) 
       
      } catch (err) {
        console.error("Error Details:", err); 
        alert("Failed to fetch data. Check the console for more details.");
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option); 
    if (option.is_correct) {
      setScore(score + 1); 
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex].description);
      setCurrentOptions(questions[nextIndex].options);
      setSelectedOption(null); 
    } else {
      setShowSummary(true); 
    }
  };

  return (
    <>
   <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-lg relative">
 


  <h1 className="text-3xl font-extrabold text-center mb-20 text-indigo-600">{topic}</h1>

 
  

  {questions.length > 0 ? (
    !showSummary ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  

        <div className="border-r-2 pr-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h2>
          <div className="text-sm font-medium text-gray-500">
            Score: <span className="text-green-600">{score}</span>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <p className="text-lg font-medium text-gray-800">
              {currentQuestionIndex + 1}. {currentQuestion}
            </p>
          </div>
        </div>

    
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Select an Option:</h3>
          <div className="grid gap-4">
            {currentOptions.map((option, index) => (
              <button
                key={index}
                className={`px-6 py-3 rounded-lg font-medium border transition-all text-lg shadow-sm w-full ${
                  selectedOption
                    ? option === selectedOption
                      ? option.is_correct
                        ? "bg-green-100 text-green-600 border-green-600"
                        : "bg-red-100 text-red-600 border-red-600"
                      : "bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed"
                    : "bg-indigo-500 text-white border-indigo-600 hover:bg-indigo-600"
                }`}
                onClick={() => handleOptionClick(option)}
                disabled={!!selectedOption} // Disable buttons after one is clicked
              >
                {option.description}
              </button>
            ))}
          </div>

     
     

          {selectedOption && (
            <div className="mt-6 text-center">
              <p
                className={`text-xl font-semibold ${
                  selectedOption.is_correct ? "text-green-600" : "text-red-600"
                }`}
              >
                {selectedOption.is_correct ? "Correct!" : "Incorrect!"}
              </p>
              <button
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            </div>
          )}
        </div>
      </div>
    ) : (



      <div>
        <h2 className="text-4xl font-bold text-center mb-6 text-indigo-600">Quiz Summary</h2>
        <p className="text-lg font-medium text-center text-gray-700 mb-6">
          You scored <span className="text-green-600 font-bold">{score}</span> out of{" "}
          <span className="text-indigo-600 font-bold">{questions.length}</span>.
        </p>

       

        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Review of Questions</h3>
          <ul className="space-y-4">
            {questions.map((question, index) => (
              <li key={index} className="bg-white p-4 rounded-lg shadow border">
                <p className="font-medium text-lg text-gray-800">
                  {index + 1}. {question.description}
                </p>
                <p className="mt-2 text-gray-600">
                  Correct Answer:{" "}
                  <span className="font-semibold text-green-600">
                    {question.options.find((opt) => opt.is_correct)?.description ||
                      "No correct answer provided"}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  ) : (

    <div class="animate-spin inline-block size-20 border-[3px] border-current border-t-transparent text-green-600 rounded-full" role="status" aria-label="loading">
  <span class="sr-only">Loading...</span>
</div>
  )}
</div>



    </>
  );
}

export default Quiz;
