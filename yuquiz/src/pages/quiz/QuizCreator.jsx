import React, { useState, useEffect, useRef } from "react";
import { IoMdArrowBack } from "react-icons/io";
import "../../styles/quiz/QuizCreator.scss";
import { Link, useNavigate } from "react-router-dom";
import { handlerSubmitQuiz } from "../../services/quiz/quizCreator";
import Dropdown from "../../components/UI/Dropdown";
import { getSubjectList } from "../../services/quiz/QuizManage";

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

  const [subjects, setSubjects] = useState([]); // 과목 리스트 상태
  const [selectedSubject, setSelectedSubject] = useState(null); // 선택된 과목 상태
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
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectList = await getSubjectList();
        const SUBJECT_OPTIONS = [
          // 디폴트 옵션 추가
          ...subjectList.map((option) => ({
            label: option.subjectName + "(" + option.subjectCode + ")", // 표시할 이름
            value: option.id, // 전달할 id
          })),
        ];
        setSubjects(SUBJECT_OPTIONS);
      } catch (error) {
        console.error("과목 데이터를 가져오는 중 오류가 발생했습니다.", error);
      }
    };

    fetchSubjects();
  }, []);
  const handleAnswerChange = (index, field, value) => {
    const newAnswers = [...answers];
    if (questionType === "SHORT_ANSWER") {
      newAnswers[0][field] = value; // 단답형은 항상 첫 번째 객체를 수정
    } else {
      newAnswers[index][field] = value; // 그 외의 유형에서는 해당 인덱스의 답변을 수정
    }
    setAnswers(newAnswers);
  };
  const validateForm = () => {
    const errors = [];

    if (!questionTitle.trim()) errors.push("퀴즈 제목을 입력하세요.");
    if (!questionContent.trim()) errors.push("퀴즈 내용을 입력하세요.");
    if (!selectedSubject) errors.push("과목을 선택하세요.");
    // 중복 정답(MULTIPLE_CHOICE)의 경우 적어도 하나의 정답이 선택되어야 함
    if (questionType === "MULTIPLE_CHOICE") {
      // 적어도 하나의 정답이 선택되어야 함
      if (answers.every((ans) => !ans.correct)) {
        errors.push("중복 정답 유형에서는 적어도 하나의 정답을 선택하세요.");
      }
      // 모든 선택지에 값이 없어서는 안 됨
      if (answers.every((ans) => !ans.text.trim())) {
        errors.push("객관식의 선택지는 적어도 하나 이상 작성해야 합니다.");
      }
      if (answers.some((ans) => ans.correct && !ans.text.trim())) {
        errors.push("체크된 정답의 선택지 텍스트를 입력하세요.");
      }
    }

    // 단답형(SHORT_ANSWER)의 경우 정답 텍스트가 있어야 함
    if (questionType === "SHORT_ANSWER" && !answers[0].text.trim()) {
      errors.push("단답형의 정답을 입력하세요.");
    }

    // OX(참/거짓, TRUE_FALSE)의 경우 반드시 하나의 정답이 선택되어야 함
    if (questionType === "TRUE_FALSE" && answers.every((ans) => !ans.correct)) {
      errors.push("OX 유형에서는 정답을 선택하세요.");
    }

    return errors;
  };

  const handleSubmitQuiz = () => {
    const errors = validateForm();

    if (errors.length > 0) {
      alert(errors.join("\n"));
      return; // 에러가 있을 경우 제출 중단
    }
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
      answer = correctAnswer && correctAnswer.text === "True" ? "1" : "2";
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
      subjectId: selectedSubject.value,
    };
    if (handlerSubmitQuiz(data)) {
      navigate(-1);
    }
  };

  return (
    <div>
      <Link to="/quiz" className="back-button">
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
          <div className="form-group">
            <label>과목 선택</label>
            <Dropdown
              options={subjects}
              onSelect={(option) => setSelectedSubject(option)}
              initLabel="과목을 선택하세요"
            />
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
