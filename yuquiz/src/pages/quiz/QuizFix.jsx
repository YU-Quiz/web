import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowBack } from "react-icons/io";
import "../../styles/quiz/QuizFix.scss";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getQuiz } from "../../services/quiz/QuizManage";
import { fixQuiz } from "../../services/quiz/QuizManage";

export const QuizFix = () => {
  const { quizId } = useParams(); // URL에서 quizId 가져옴
  const navigate = useNavigate();
  const [questionTitle, setQuestionTitle] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [answers, setAnswers] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const textAreaRef = useRef(null);

  useEffect(() => {
    // 초기 데이터 로드
    const fetchQuizData = async () => {
      try {
        const quiz = await getQuiz(quizId);
        setQuestionTitle(quiz.title);
        setQuestionContent(quiz.question);
        setQuestionType(quiz.quizType);

        if (quiz.quizType === "MULTIPLE_CHOICE") {
          setAnswers(
            quiz.choices.map((choice, index) => ({
              num: index + 1,
              text: choice,
              correct: quiz.answer === `${index + 1}`,
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
      } catch (error) {
        console.error("퀴즈 데이터를 불러오는 중 에러 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, [quizId]);

  const handleAnswerChange = (index, field, value) => {
    const newAnswers = [...answers];
    newAnswers[index][field] = value;
    setAnswers(newAnswers);
  };

  const handleSubmitQuiz = async () => {
    try {
      // 퀴즈 데이터를 서버로 제출하는 로직
      const updatedQuiz = {
        quizId, // 수정 중인 퀴즈의 ID
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
        subjectId: 2,
      };

      // fixQuiz API 호출로 데이터 전송
      const wellDone = await fixQuiz(updatedQuiz);
      if (wellDone) {
        console.log("Updated Quiz:", updatedQuiz);
        alert("수정 성공");
        // 퀴즈 목록 페이지로 이동
        navigate(`/quiz/play/${updatedQuiz.quizId}`);
      } else {
        alert("다시 시도해주세요. ");
      }
    } catch (error) {
      console.error("퀴즈 수정 중 오류 발생:", error);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div>
      <Link to="/quiz/list" className="back-button">
        <IoMdArrowBack />
      </Link>
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
            <select value={questionType} disabled>
              <option value={questionType}>{questionType}</option>
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
};
