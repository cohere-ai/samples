import { useState } from "react"
import styled from "styled-components"
import axios from "axios"

const BACKEND_API = "http://localhost:8000"

const Container = styled.div`
  max-width: 600px;
  margin: 60px auto;
  margin-bottom: 40px;

  form {
    width: 100%;
    input,
    textarea {
      width: 100%;
      border: 1px solid #ddd;
      padding: 20px;
      margin-bottom: 20px;
      font-family: Roboto;
    }

    textarea {
      resize: none;
    }

    input[type="submit"] {
      cursor: pointer;
      background-color: black;
      color: white;

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`

export default function Home() {
  const [data, setData] = useState({ name: "", number: "", review: "" })

  const updateState = (type, value) => {
    setData((data) => ({ ...data, [type]: value }))
  }

  const submitData = async (e) => {
    e.preventDefault()

    await axios(BACKEND_API, {
      method: "post",
      data: { ...data },
      headers: {
        "Content-Type": "application/json",
      },
    })

    setData({ name: "", number: "", review: "" })
  }

  return (
    <Container>
      <h1>Review this hotel</h1>
      <form onSubmit={submitData}>
        <input
          onChange={(e) => updateState("name", e.target.value)}
          placeholder="Name"
        />
        <input
          onChange={(e) => updateState("number", e.target.value)}
          placeholder="Phone number"
        />
        <textarea
          onChange={(e) => updateState("review", e.target.value)}
          placeholder="Enter review"
        />
        <input
          disabled={
            !data.name.length || !data.number.length || !data.review.length
          }
          type="submit"
        />
      </form>
    </Container>
  )
}
