import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowBack } from "react-icons/io";
import "../../styles/quiz/QuizCreator.scss";

export const QuizCreator = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [questionType, setQuestionType] = useState("Multiple Choice");
  const [answers, setAnswers] = useState([
    { num: 1, text: "", correct: false },
    { num: 2, text: "", correct: false },
    { num: 3, text: "", correct: false },
    { num: 4, text: "", correct: false },
  ]);
  const [image, setImage] = useState(null);

  const textAreaRef = useRef(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;

      textAreaRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [questionContent]);

  useEffect(() => {
    if (questionType === "True/False") {
      setAnswers([
        { num: 1, text: "True", correct: false },
        { num: 2, text: "False", correct: false },
      ]);
    } else if (questionType === "Short Answer") {
      setAnswers([{ num: 1, text: "", correct: true }]); // 단답식은 하나의 정답만 존재
    } else {
      setAnswers([
        { num: 1, text: "", correct: false },
        { num: 2, text: "", correct: false },
        { num: 3, text: "", correct: false },
        { num: 4, text: "", correct: false },
      ]);
    }
  }, [questionType]);

  const handleAnswerChange = (index, field, value) => {
    const newAnswers = [...answers];
    newAnswers[index][field] = value;
    setAnswers(newAnswers);
  };

  const handleAddQuestion = () => {
    // 추후 추가
    // 빈 답들이 입력되었을때 처리하는 로직
  };

  const handleSubmitQuiz = () => {
    // 추후 추가
  };

  return (
    <div>
      <button className="back-button">
        <IoMdArrowBack />
      </button>
      <div className="container">
        <div className="quiz-creator">
          <h2 className="title">Quiz 생성</h2>
          <div className="form-group">
            <label>Quiz 제목</label>
            <input
              type="text"
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Quiz 내용</label>
            <textarea
              ref={textAreaRef}
              value={questionContent}
              onChange={(e) => setQuestionContent(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Quiz 유형</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
            >
              <option value="Multiple Choice">중복 정답</option>
              <option value="True/False">O/X</option>
              <option value="Short Answer">단답식</option>
            </select>
          </div>

          <div className="answers-container">
            {questionType === "Multiple Choice" &&
              answers.map((answer, index) => (
                <div key={index} className="answer-group">
                  <label className="answer-label" htmlFor={`answer-${index}`}>
                    Answer {answer.num}
                  </label>
                  <input
                    id={`answer-${index}`}
                    type="text"
                    value={answer.text}
                    onChange={(e) =>
                      handleAnswerChange(index, "text", e.target.value)
                    }
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={answer.correct}
                      onChange={(e) =>
                        handleAnswerChange(index, "correct", e.target.checked)
                      }
                    />
                    Correct
                  </label>
                </div>
              ))}

            {questionType === "True/False" &&
              answers.map((answer, index) => (
                <div key={index} className="answer-group">
                  <label className="answer-label" htmlFor={`answer-${index}`}>
                    {answer.text}
                  </label>
                  <input
                    id={`answer-${index}`}
                    type="radio"
                    name="correctAnswer"
                    checked={answer.correct}
                    onChange={(e) =>
                      handleAnswerChange(index, "correct", e.target.checked)
                    }
                  />
                </div>
              ))}

            {questionType === "Short Answer" && (
              <div className="answer-group">
                <label className="answer-label" htmlFor={`answer-1`}>
                  정답
                </label>
                <input
                  id={`answer-1`}
                  type="text"
                  value={answers[0].text}
                  onChange={(e) =>
                    handleAnswerChange(0, "text", e.target.value)
                  }
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>이미지</label>
            <input
              className="button-file-choose"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="button-box">
            <button onClick={handleSubmitQuiz}>Quiz 생성 완료</button>
          </div>
        </div>
      </div>
    </div>
  );
}
