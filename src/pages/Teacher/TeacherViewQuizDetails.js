import React from "react";
import MenuComponent from "../../components/LeftMenu/Menu";
import {
    Box,
    Typography,
} from "@mui/material";
import BackButton from "../../components/BackButton/BackButton";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Cell,
} from "recharts";

const teacherViewQuizDetails = () => {
    const quiz = {
        name: "Quiz 1",
        questions: [
            {
                id: 1, question: "What is 1 + 1?", type: "multiple_choice",
                answer: [
                    {
                        text: "1",
                        isCorrect: true
                    },
                    {
                        text: "2",
                        isCorrect: false
                    },
                    {
                        text: "4",
                        isCorrect: false
                    },
                    {
                        text: "6",
                        isCorrect: true
                    },
                ]
            },
            {
                id: 2, question: "What is 2 + 3?", type: "select_one",
                answer: [
                    {
                        text: "1",
                        isCorrect: false
                    },
                    {
                        text: "2",
                        isCorrect: false
                    },
                    {
                        text: "4",
                        isCorrect: false
                    },
                    {
                        text: "5",
                        isCorrect: true
                    },

                ]
            },
            {
                id: 3, question: "What is 3 + 4?", type: "select_one",
                answer: [{
                    text: "1",
                    isCorrect: false
                },
                {
                    text: "2",
                    isCorrect: false
                },
                {
                    text: "4",
                    isCorrect: false
                },
                {
                    text: "7",
                    isCorrect: true
                }]
            },
            {
                id: 4, question: "What is 4 + 5?", type: "select_one",
                answer: [{
                    text: "1",
                    isCorrect: false
                },
                {
                    text: "2",
                    isCorrect: false
                },
                {
                    text: "4",
                    isCorrect: false
                },
                {
                    text: "9",
                    isCorrect: true
                }]
            },

        ],
        timeLimitMinutes: 10,
        score: 10,
    };


    const data = [
        { answer: 'A', attemptNumber: 2, isCorrect: true },
        { answer: 'B', attemptNumber: 5, isCorrect: false },
        { answer: 'C', attemptNumber: 20, isCorrect: false },
        { answer: 'D', attemptNumber: 9, isCorrect: false },
        // Add more data points as needed
    ];

    return (
        <div className="container" style={{ marginRight: "-230px" }}>
            <MenuComponent />
            <Box>
                <div className="header-page"
                    style={{
                        marginLeft: "60px",
                        width: "700px"
                    }}>
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
                        marginLeft: 8
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
                                    marginLeft: 8
                                }}
                            >
                                <Box>
                                    <Box marginLeft={8}>
                                        <Typography variant="h6" gutterBottom>
                                            Question {index + 1}: {question.question}
                                        </Typography>
                                        {question.answer?.map((answer, index) => (
                                            /**
                                            nêu type là select_one thì render ra radio button,
                                            nếu type là select_multiple thì render ra checkbox,
                                            nếu isCorrect === true thì checked,
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
                                                    {String.fromCharCode(65 + index)}. {answer.text}
                                                </Typography>
                                            </Box>

                                        ))}
                                    </Box>
                                    <Box>
                                        <BarChart
                                            width={800}
                                            height={200}
                                            data={data}
                                            layout="vertical"
                                        >
                                            <XAxis type="number" domain={[0, "dataMax"]} tickCount={10} />
                                            <YAxis type="category" dataKey="answer" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="attemptNumber" barSize={20}>
                                                {data.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.isCorrect ? 'green' : 'red'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box >
        </div >
    );
}

export default teacherViewQuizDetails;