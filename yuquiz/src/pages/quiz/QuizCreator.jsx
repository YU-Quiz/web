import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowBack } from "react-icons/io";
import "../../styles/quiz/QuizCreator.scss";

export default function QuizCreator() {
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

      // textarea가 커질 때 화면에서 잘리지 않도록 조정
      textAreaRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [questionContent]);

  const handleAnswerChange = (index, field, value) => {
    const newAnswers = [...answers];
    newAnswers[index][field] = value;
    setAnswers(newAnswers);
  };

  const handleAddQuestion = () => {
    // 추후 추가
  };

  const handleSubmitQuiz = () => {
    // 추후 추가
  };

  return (
    <div>
      <button className="back-button">
        <IoMdArrowBack />
      </button>
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
          {answers.map((answer, index) => (
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
        </div>

        <div className="form-group">
          <label>이미지</label>
          <input
            className="button-file-choose"
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="button-group">
          <button className="button-quiz-add" onClick={handleAddQuestion}>
            Quiz 추가
          </button>
          <button onClick={handleSubmitQuiz}>Quiz 생성 완료</button>
        </div>
      </div>
    </div>
  );
}
