import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowBack } from "react-icons/io";
import "../../styles/quiz/QuizCreator.scss";
import { Link, useNavigate } from "react-router-dom";
import { handlerSubmitQuiz } from "../../services/quiz/quizCreator";

export const QuizCreator = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [questionType, setQuestionType] = useState("MULTIPLE_CHOICE");
  const [answers, setAnswers] = useState([
    { num: 1, text: "", correct: false },
    { num: 2, text: "", correct: false },
    { num: 3, text: "", correct: false },
    { num: 4, text: "", correct: false },
  ]);
  const [image, setImage] = useState(null);

  const textAreaRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;

      textAreaRef.current.scrollIntoView({ block: "nearest" });
    }
  }, [questionContent]);

  useEffect(() => {
    if (questionType === "TRUE_FALSE") {
      setAnswers([
        { num: 1, text: "True", correct: false },
        { num: 2, text: "False", correct: false },
      ]);
    } else if (questionType === "SHORT_ANSWER") {
      setAnswers([{ num: 1, text: "", correct: true }]); // 단답형에 하나의 정답 객체로 설정
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
    if (questionType === "SHORT_ANSWER") {
      newAnswers[0][field] = value; // 단답형은 항상 첫 번째 객체를 수정
    } else {
      newAnswers[index][field] = value; // 그 외의 유형에서는 해당 인덱스의 답변을 수정
    }
    setAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    let answer = "";

    if (questionType === "MULTIPLE_CHOICE") {
      const correctAnswers = answers
        .filter((answer) => answer.correct)
        .map((answer) => answer.num)
        .sort((a, b) => a - b);
      answer = correctAnswers.join(""); // 정답 번호를 문자열로 합침
    }

    if (questionType === "TRUE_FALSE") {
      const correctAnswer = answers.find((answer) => answer.correct);
      answer = correctAnswer && correctAnswer.text === "True" ? "1" : "0";
    }

    if (questionType === "SHORT_ANSWER") {
      answer = answers[0].text; // 단답형에서는 하나의 정답만 보내기 위해
    }

    const choices =
      questionType !== "SHORT_ANSWER"
        ? answers.map((answer) => answer.text)
        : []; // 단답형에서는 choices가 비어 있게 설정

    const data = {
      title: questionTitle,
      question: questionContent,
      quizImg: image,
      answer: answer,
      quizType: questionType,
      choices: choices,
      subjectId: 2,
    };
    console.log(data);
    if (handlerSubmitQuiz(data)) {
      alert("퀴즈 생성 성공!");
      navigate("/");
    }
  };

  return (
    <div>
      <Link to="/quiz/list" className="back-button">
        <IoMdArrowBack />
      </Link>
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
              <option value="MULTIPLE_CHOICE">중복 정답</option>
              <option value="TRUE_FALSE">O/X</option>
              <option value="SHORT_ANSWER">단답식</option>
            </select>
          </div>

          <div className="answers-container">
            {questionType === "MULTIPLE_CHOICE" &&
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
                    정답 (중복가능)
                  </label>
                </div>
              ))}

            {questionType === "TRUE_FALSE" &&
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

            {questionType === "SHORT_ANSWER" && (
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
                  placeholder="띄어쓰기금지"
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
};
