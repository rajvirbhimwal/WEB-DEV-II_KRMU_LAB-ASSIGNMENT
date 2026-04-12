import React, { useState } from 'react'
import '../App.css'
import report from '../data'

const ReportCard = () => {

  const [reportState, setReportState] = useState(report)

  let newStudent = {
    name: '',
    marks: ''
  }

  function submitHandler(event) {
    event.preventDefault()

    newStudent.name = event.target.name.value.trim()
    newStudent.marks = event.target.marks.value.trim()

    setReportState((preData)=>{
      return [...preData, newStudent]
    })

    event.target.reset()
  }

  let TotalStudents = reportState.length

  let passedStudents = reportState.filter((item)=>{
      return item.marks >= 40
  }).length

  let averageMarks = (
      reportState.reduce((acc, item)=>{
        return acc + Number(item.marks)
      },0) / TotalStudents
  ).toFixed(2)

  return (
    <div className='ReportCard'>

      <form onSubmit={submitHandler}>
        <input name='name' placeholder='Name' required/>
        <input name='marks' placeholder='Marks' required/>
        <button>Add</button>
      </form>

      <div className="stats">
        <h2>Total Students : {TotalStudents}</h2>
        <h2>Passed Students : {passedStudents}</h2>
        <h2>Failed Students : {TotalStudents - passedStudents}</h2>
        <h2>Avg. Marks : {averageMarks}</h2>
      </div>

      {
        reportState.map((item, index)=>{
          return(
            <div className="studentCard" key={index}>
              <p>Name : {item.name}</p>
              <p>Marks : {item.marks}</p>
            </div>
          )
        })
      }

    </div>
  )
}

export default ReportCard