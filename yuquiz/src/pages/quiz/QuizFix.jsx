import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowBack } from "react-icons/io";
import "../../styles/quiz/QuizFix.scss";

export const QuizFix = () => {
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [answers, setAnswers] = useState([]);
  const [image, setImage] = useState(null);
  const textAreaRef = useRef(null);

  // 예제 퀴즈 데이터
  const questions = {
    title: "알고리즘 문제",
    question: "퀵정렬 알고리즘의 시간복잡도는?",
    quizImg: "?",
    answer: "2",
    quizType: "MULTIPLE_CHOICE", // 유형
    choices: ["1.O(N)", "2.O(N^2)", "3.O(NlogN)"],
    subjectId: 2,
  };

  // 유형 텍스트
  const getQuizTypeLabel = (quizType) => {
    switch (quizType) {
      case "MULTIPLE_CHOICE":
        return "객관식";
      case "TRUE_FALSE":
        return "O/X";
      case "SHORT_ANSWER":
        return "단답식";
      default:
        return "알 수 없음";
    }
  };

  // 기존 데이터를 로드하여 상태 설정
  useEffect(() => {
    const quiz = questions;

    setQuestionTitle(quiz.title);
    setQuestionContent(quiz.question);
    setQuestionType(quiz.quizType);

    // 유형에 따라 answers 상태를 설정
    if (quiz.quizType === "MULTIPLE_CHOICE") {
      setAnswers(
        quiz.choices.map((choice, index) => ({
          num: index + 1,
          text: choice,
          correct: quiz.answer === `${index + 1}`, // 정답을 표시
        }))
      );
    } else if (quiz.quizType === "TRUE_FALSE") {
      setAnswers([
        { num: 1, text: "True", correct: quiz.answer === "True" },
        { num: 2, text: "False", correct: quiz.answer === "False" },
      ]);
    } else if (quiz.quizType === "SHORT_ANSWER") {
      setAnswers([{ num: 1, text: quiz.answer, correct: true }]);
    }

    setImage(quiz.quizImg); // 이미지 설정
  }, []);

  const handleAnswerChange = (index, field, value) => {
    const newAnswers = [...answers];
    newAnswers[index][field] = value;
    setAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    // 퀴즈 데이터를 서버로 제출하는 로직
    const updatedQuiz = {
      title: questionTitle,
      question: questionContent,
      quizType: questionType,
      choices:
        questionType === "MULTIPLE_CHOICE" || questionType === "TRUE_FALSE"
          ? answers.map((answer) => answer.text)
          : [],
      answer:
        questionType === "MULTIPLE_CHOICE" || questionType === "TRUE_FALSE"
          ? answers.find((answer) => answer.correct)?.text || ""
          : answers[0].text,
      quizImg: image,
      // 기타 필요한 데이터 추가
    };

    console.log("Updated Quiz:", updatedQuiz);
    // 여기서 updatedQuiz를 서버로 보내는 API 호출을 하면 됩니다.
  };

  return (
    <div>
      <button className="back-button">
        <IoMdArrowBack />
      </button>
      <div className="container">
        <div className="quiz-creator">
          <h2 className="title">Quiz 수정</h2>
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
            <label>Quiz 유형(유형은 수정❌)</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              disabled
            >
              <option value={questions.quizType}>
                {getQuizTypeLabel(questions.quizType)}
              </option>
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
                    Correct
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
            <button onClick={handleSubmitQuiz}>Quiz 수정 완료</button>
          </div>
        </div>
      </div>
    </div>
  );
}
