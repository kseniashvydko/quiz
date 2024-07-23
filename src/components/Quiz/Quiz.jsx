import { useState } from "react"
import { resultInitialState } from "../../constants";

import '../Quiz/Quiz.scss';
import AnswerTimer from "../AnswerTimer/AnswerTimer.jsx";
import Result from "../Result/Result.jsx";

// eslint-disable-next-line react/prop-types
const Quiz = ( { questions } ) => {
    
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitialState);
    const [showResult, setShowResult] = useState(false);
    const [showAnswerTimer, setShowAnswerTimer] = useState(true)

    const { question, choices, correctAnswer } = questions[currentQuestion];

    const onAnswerClick = (answer, index) => {
        setAnswerIdx(index);
        if (answer === correctAnswer) {
            setAnswer(true);
        } else {
            setAnswer(false);
        }
    };

    const onClickNext = (finalAnswer) => {
        setAnswerIdx(null)
        setShowAnswerTimer(false);
        setResult((prev) => 
            finalAnswer 
            ? {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1,
            }
            : {
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1,
            }
        );
        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setCurrentQuestion(0);
            setShowResult(true);
        }
        
        setTimeout(() => {
            setShowAnswerTimer(true);
        })
    };

    const onTryAgain = () => {
        setResult(resultInitialState)
        setShowResult(false)
    }

    const handleTimeOut = () => {
        setAnswer(false)
        onClickNext(false)
    } 

    return (
    <div className="quiz-container">
        {!showResult ? ( 
            <>
            {showAnswerTimer && <AnswerTimer duration={30} onTimeUp={handleTimeOut} />}

            <span className="active-question-no">{currentQuestion + 1}</span>
            <span className="total-question">/{questions.length}</span>
            <h2>{question}</h2>
            <ul>
                { choices.map((choice, index) => (
                    <li 
                    onClick={() => onAnswerClick(choice, index)}
                    key={choice} 
                    className={answerIdx === index ? 'selected-answer' : null}>
                        {choice}
                    </li>
                ))}
            </ul>
            <div className="footer">
                <button onClick={() => onClickNext(answer)} disabled={answerIdx === null}>
                    {currentQuestion === questions.length - 1 ? "Закончить" : "Следующий"}
                </button>
            </div>
            </>) : (
                <Result result={result} onTryAgain={onTryAgain} totalQuestions={questions.length}/>
            )}
        
            </div>

            );
        }

export default Quiz;