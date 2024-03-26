"use client";
import { useState } from "react";
import TestSummaryReport from "./test";

export default function Home() {
  const [employeeData, setEmployeeData] = useState(
    Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => ""))
  );
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (employeeIndex, questionIndex, value) => {
    const newEmployeeData = [...employeeData];
    newEmployeeData[employeeIndex][questionIndex] = value;
    setEmployeeData(newEmployeeData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <h2>Employee Questionnaire</h2>
          {Array.from({ length: 10 }, (_, employeeIndex) => (
            <div key={employeeIndex}>
              <h3>Employee {employeeIndex + 1}</h3>
              {Array.from({ length: 10 }, (_, questionIndex) => (
                <div key={questionIndex}>
                  <p>Question {questionIndex + 1}:</p>
                  <label>
                    <input
                      type="radio"
                      value="strongly disagree"
                      checked={
                        employeeData[employeeIndex][questionIndex] ===
                        "strongly disagree"
                      }
                      onChange={() =>
                        handleChange(
                          employeeIndex,
                          questionIndex,
                          "strongly disagree"
                        )
                      }
                    />
                    Strongly Disagree
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="disagree"
                      checked={
                        employeeData[employeeIndex][questionIndex] ===
                        "disagree"
                      }
                      onChange={() =>
                        handleChange(employeeIndex, questionIndex, "disagree")
                      }
                    />
                    Disagree
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="neutral"
                      checked={
                        employeeData[employeeIndex][questionIndex] === "neutral"
                      }
                      onChange={() =>
                        handleChange(employeeIndex, questionIndex, "neutral")
                      }
                    />
                    Neutral
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="agree"
                      checked={
                        employeeData[employeeIndex][questionIndex] === "agree"
                      }
                      onChange={() =>
                        handleChange(employeeIndex, questionIndex, "agree")
                      }
                    />
                    Agree
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="strongly agree"
                      checked={
                        employeeData[employeeIndex][questionIndex] ===
                        "strongly agree"
                      }
                      onChange={() =>
                        handleChange(
                          employeeIndex,
                          questionIndex,
                          "strongly agree"
                        )
                      }
                    />
                    Strongly Agree
                  </label>
                </div>
              ))}
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <TestSummaryReport employeeData={simulatedEmployeeData} />
      )}
    </div>
  );
}
const generateEmployeeData = () => {
  const employeeData = [];

  for (let i = 0; i < 10; i++) {
    const employeeResponses = [];
    for (let j = 0; j < 10; j++) {
      // Randomly select a response from the options
      const responses = [
        "strongly disagree",
        "disagree",
        "neutral",
        "agree",
        "strongly agree",
      ];
      const randomIndex = Math.floor(Math.random() * responses.length);
      const response = responses[randomIndex];
      employeeResponses.push(response);
    }
    employeeData.push(employeeResponses);
  }

  return employeeData;
};

// Simulate employee data
const simulatedEmployeeData = generateEmployeeData();
