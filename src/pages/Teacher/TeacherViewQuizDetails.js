import MenuComponent from "../../components/LeftMenu/Menu";
import { Box, Typography } from "@mui/material";
import BackButton from "../../components/BackButton/BackButton";
import React, { useEffect, useState } from "react";

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell } from "recharts";
import ApiInstance from "../../axios";
import { useParams } from "react-router-dom";

const TeacherViewQuizDetails = () => {
    const [questions, setQuestions] = useState([]);
    const [quiz, setQuiz] = useState(null);
    const { quizId } = useParams();

    useEffect(() => {
        ApiInstance.get(`/quiz/review-detail/${ quizId }`)
            .then((response) => {
                setQuiz(response.data.data);
                setQuestions(response.data.data.questions);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [quizId]);

    return (
        <div className="container" style={{ marginRight: "-230px" }}>
            <MenuComponent role="teacher" />
            <Box>
                <div
                    className="header-page"
                    style={{
                        marginLeft: "60px",
                        width: "700px",
                    }}
                >
                    <BackButton />
                    <Typography textAlign="center" variant="h4" gutterBottom>
                        View Answer Details
                    </Typography>
                </div>

                <Box
                    className="summary-info"
                    sx={{
                        backgroundColor: "#fff",
                        alignItems: "center",
                        p: 2,
                        borderRadius: 1,
                        boxShadow: 1,
                        mb: 2,
                        marginLeft: 8,
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Quiz Name: {quiz?.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Number of Questions: {quiz?.questions?.length}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Time: {quiz?.timeLimitMinutes} minutes
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        Total Score: {quiz?.score}
                    </Typography>
                </Box>
                <Box>
                    <Box>
                        {quiz?.questions.map((question, index) => (
                            <Box
                                key={question.id}
                                className="summary-info"
                                sx={{
                                    backgroundColor: "#fff",
                                    alignItems: "center",
                                    p: 2,
                                    borderRadius: 1,
                                    boxShadow: 1,
                                    mb: 2,
                                    marginLeft: 8,
                                }}
                            >
                                <Box>
                                    <Box marginLeft={8}>
                                        <Typography variant="h6" gutterBottom>
                                            Question {index + 1}: {question.text}
                                        </Typography>
                                        {question.answerOptions?.map((answer, index) => (
                                            /**
                                                                  nÃªu type lÃ  select_one thÃ¬ render ra radio button,
                                                                  náº¿u type lÃ  select_multiple thÃ¬ render ra checkbox,
                                                                  náº¿u isCorrect === true thÃ¬ checked,
                                                                  */
                                            <Box display={"flex"}>
                                                {question.type === "select_one" ? (
                                                    <input
                                                        type="radio"
                                                        name={`question${question.id}`}
                                                        checked={answer.isCorrect}
                                                        style={{ marginRight: "10px", marginTop: "-5px" }}
                                                    />
                                                ) : null}
                                                {question.type === "multiple_choice" ? (
                                                    <input
                                                        type="checkbox"
                                                        name={`question${question.id}`}
                                                        checked={answer.isCorrect}
                                                        style={{ marginRight: "10px", marginTop: "-5px" }}
                                                    />
                                                ) : null}
                                                <Typography variant="body1" gutterBottom>
                                                    {String.fromCharCode(65 + index)}. {answer.optionText}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                    <Box>
                                        <BarChart
                                            width={800}
                                            height={200}
                                            data={question.answerOptions}
                                            layout="vertical"
                                        >
                                            <XAxis
                                                type="number"
                                                domain={[0, "dataMax"]}
                                                tickCount={10}
                                            />
                                            <YAxis type="category" dataKey="optionText" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="count" barSize={20}>
                                                {question.answerOptions.map((entry, index) => (
                                                    <Cell
                                                        key={`cell-${index}`}
                                                        fill={entry.isCorrect ? "green" : "red"}
                                                    />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </div>
    );
};

export default TeacherViewQuizDetails;