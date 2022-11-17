import { useState } from 'react'
import './App.css'

function App() {
  const [screen, setScreen] = useState("")
  const [num1, setNum1] = useState("")
  const [num2, setNum2] = useState("")
  const [operator, setOperator] = useState("")

  const handleNumber = (n: string) => {
    const newNum: string = (n === "del") ? num1.slice(0, -1) : num1 + n
    setNum1(newNum)
    if (newNum.includes(".")) {
      const parts = newNum.split(".")
      setScreen(() =>
        Number(parts[0]).toLocaleString('en-US', { maximumFractionDigits: 10 }) + "." + parts[1]
      )
    } else {
      setScreen(() => Number(newNum).toLocaleString('en-US', { maximumFractionDigits: 10 }))
    }
  }

  const handleOperation = (op: string) => {
    const newNum1: number = Number(num1)
    const newNum2: number = Number(num2)
    let newSum: number = 0
    if (num1 === "") {
      setOperator(() => op)
    } else {
      if (num2 === "") {
        setNum2(() => num1)
        setNum1(() => "")
      } else {
        if (operator === "+") {
          newSum = newNum2 + newNum1
        }
        if (operator === "-") {
          newSum = newNum2 - newNum1
        }
        if (operator === "*") {
          newSum = newNum2 * newNum1
        }
        if (operator === "/") {
          newSum = newNum2 / newNum1
        }
        setNum2(newSum.toString())
        setNum1(() => "")
        setScreen(() => newSum.toLocaleString('en-US', { maximumFractionDigits: 10 }))
      }
      setOperator(() => op)
    }
  }

  return (
    <div className='theme-selector theme-1 flex justify-center items-center min-h-[100vh]'>
      <div className='flex flex-col font-bold'>
        <div className='flex title my-5 mx-1 justify-between'>
          <div className='text-2xl font-bold self-center'>calc</div>
          <div className='flex text-[0.625rem]'>
            <div className='m-2 self-end'>THEME</div>
            <div className='flex flex-col items-center'>
              <div>
                <span className='px-1'>1</span>
                <span className='px-1'>2</span>
                <span className='px-1'>3</span>
              </div>
              <div className='toggle-bt-bg rounded-full flex justify-center mx-1 p-[3px]'>
                <input className="toggle-bt" type="radio" name="toggle" id="one" onClick={
                  () => {
                    const button: HTMLElement = document.querySelector(".theme-selector")!
                    button.classList.remove("theme-2")
                    button.classList.remove("theme-3")
                    button.classList.add("theme-1")
                  }
                  }/>
                  <input className="toggle-bt" type="radio" name="toggle" id="two" onClick={
                  () => {
                    const button: HTMLElement = document.querySelector(".theme-selector")!
                    button.classList.remove("theme-1")
                    button.classList.remove("theme-3")
                    button.classList.add("theme-2")
                  }
                  }/>
                  <input className="toggle-bt" type="radio" name="toggle" id="three" onClick={
                  () => {
                    const button: HTMLElement = document.querySelector(".theme-selector")!
                    button.classList.remove("theme-2")
                    button.classList.remove("theme-1")
                    button.classList.add("theme-3")
                  }
                  }/>
                </div>
            </div>
          </div>
        </div>
        <div className='flex justify-end text-[2rem] items-center screen-bg p-4 rounded-lg h-20'>
          {screen ? screen : "0"}
        </div>
        <div className="pad-bg text-2xl my-4 grid gap-4 grid-cols-4 w-[400px] p-4 rounded-lg">
          <button className='p-2' 
            onClick={() => handleNumber("7")}>7</button>
          <button className='p-2'
            onClick={() => handleNumber("8")}>8</button>
          <button className='p-2'
            onClick={() => handleNumber("9")}>9</button>
          <button className='p-2 del-bt'
            onClick={() => handleNumber("del")}>DEL</button>
          
          <button className='p-2'
            onClick={() => handleNumber("4")}>4</button>
          <button className='p-2'
            onClick={() => handleNumber("5")}>5</button>
          <button className='p-2'
            onClick={() => handleNumber("6")}>6</button>
          <button className='p-2'
            onClick={() => handleOperation("+")}>+</button>
          
          <button className='p-2'
            onClick={() => handleNumber("1")}>1</button>
          <button className='p-2'
            onClick={() => handleNumber("2")}>2</button>
          <button className='p-2'
            onClick={() => handleNumber("3")}>3</button>
          <button className='p-2'
            onClick={() => handleOperation("-")}>-</button>
          
          <button className='p-2'
            onClick={() => handleNumber(".")}>.</button>
          <button className='p-2'
            onClick={() => handleNumber("0")}>0</button>
          
          <button className='p-2'
            onClick={() => handleOperation("/")}>/</button>
          <button className='p-2'
            onClick={() => handleOperation("*")}>x</button>
          
          <button className='del-bt col-span-2 p-2'
            onClick={() => {
              setNum1(() => "")
              setNum2(() => "")
              setScreen(() => "")
              setOperator(() => "")
            }}>RESET</button>
          <button className='equal-bt col-span-2 p-2'
            onClick={() => handleOperation("=")}>=</button>
        </div>
      </div>
    </div>
  )
}

export default App
