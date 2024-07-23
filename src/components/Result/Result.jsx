import './Result.scss'
import { useState, useEffect } from 'react'; 


const Result = ( {totalQuestions, result, onTryAgain} ) => {

    const [name, setName] = useState('');
    const [highScores, setHighScores] = useState([]);
    const [showScores, setShowScores] = useState(false);

    useEffect(() => {
        setHighScores(JSON.parse(localStorage.getItem('highScores')) || [])
    }, [])
    const handleSave = () => {
        const score ={
            name,
            score: result.score,
        };
        const newHighScores = [...highScores, score].sort((a, b) => b.score - a.score);
        setHighScores(newHighScores);
        setShowScores(true);
        localStorage.setItem('highScores', JSON.stringify(newHighScores))
    }
    const handleTryAgain = () => {
        setShowScores()
        setHighScores([])
        onTryAgain()
    }
    return(
        <div className="result">
                <h3>Результат</h3>
                <p>
                    Всего вопросов: <span>{totalQuestions}</span>
                </p>
                <p>
                    Общий балл: <span>{result.score}</span>
                </p>
                <p>
                    Правильных ответов: <span>{result.correctAnswers}</span>
                </p>
                <p>
                    Неправильных ответов: <span>{result.wrongAnswers}</span>
                </p>
                <button onClick={onTryAgain}>Попробовать еще раз</button>
                { !showScores ? <>
                <h3>
                    Введите Ваше имя ниже
                </h3>
                <input 
                placeholder='Ваше имя'
                value={name} onChange={(evt) => setName(evt.target.value)}/>
                <button className='buttomRes' onClick={handleSave}>сохранить</button>
                </> : (<> 
                <table>
                    <thead>
                        <tr>
                            <th>Рейтинг</th>
                            <th>Имя</th>
                            <th>Баллы</th>
                        </tr>
                        </thead>
                        <tbody>
                            {highScores.map((highScore, i) => {
                                return (
                                // eslint-disable-next-line react/jsx-key
                                <tr key={`${highScore.score}${highScore.name}${i}`}>
                                    <td>{i + 1}</td>
                                    <td>{highScore.name}</td>
                                    <td>{highScore.score}</td>
                                </tr>
                                );
                            })}
                        </tbody>     
                    </table>
                    </>
                    ) 
                    }
                
                </div>
    );
}

export default Result;