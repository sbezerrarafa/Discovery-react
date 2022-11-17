import './style.css'
import React, { useEffect, useState } from 'react'
import { Card } from '../../components/Card'
import axios from 'axios'


export function Home() {
  const [studentName, setStudentName] = useState('')
  const [students, setStudents] = useState([])
  const [user, setUser] = useState({ name: '', avatar: '' })



  function handleAddStudant() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }
    setStudents(prevState => [...prevState, newStudent])
  }


  useEffect(() => {

    axios.get("https://api.github.com/users/sbezerrarafa")
      .then((response) => setUser({ name: response.data.name, avatar: response.data.avatar_url }))

      .catch((error) => console.error(error));
  }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} />
        </div>
      </header>
      <input type="text" placeholder="Digite um nome..." onChange={e => setStudentName(e.target.value)} />
      <button type="button" onClick={handleAddStudant} >Adicionar</button>
      {
        students.map(student => <Card key={student.time} name={student.name} time={student.time} />)
      }


    </div>
  )
}

