import React, { useState, useEffect } from 'react';
// Components
import Notes from './components/notes/index';
import api from './services/api';
import RadioButton from './components/radiobutton/RadioButton';
// CSS
import './App.css';
import './sidebar.css'
import './main.css'


function App() {
  const [selectedValue, setSelectedValue] = useState('all')
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [allNotes, setAllNotes] = useState([])

  useEffect(() => {
    getAllNotes()
  }, [])

    async function getAllNotes() {
      const response = await api.get('/annotations',)
      setAllNotes(response.data)
    }

    async function loadNotes(option) {
      const params = {priority: option};
      const response = await api.get('/priorities', {params});

      if (response) {
        setAllNotes(response.data);
      }
    }

    function handleChange(e) {
      setSelectedValue(e.value);

      if (e.checked && e.value !== 'all') {
        loadNotes(e.value)
      } else {
        getAllNotes()
      }
    }

  async function handleDelete(id) {
    const deletedNote = await api.delete(`/annotations/${id}`)

    if (deletedNote) {
      setAllNotes(allNotes.filter(note => note._id !== id));
    }
  }

  async function handleChangePriority(id) {
    const note = await api.post(`/priorities/${id}`);

    if (note && selectedValue !== 'all') {
      loadNotes(selectedValue);
    } else if (note) {
      getAllNotes();
    }
  }


  async function handleSubmit(e) {
    e.preventDefault();
    const response = await api.post('/annotations', {
      title,
      notes,
      priority: false
    })

    setTitle('')
    setNotes('')

    if (selectedValue !== 'all') {
      getAllNotes();
    } else {
      setAllNotes([...allNotes, response.data])
    }
    setSelectedValue('all')

  }

  useEffect(() => {
    function enableSubmitButton() {
      let btn = document.getElementById('btn_submit')
      btn.style.background = '#ffd3ca'
      if (title && notes) {
        btn.style.background = "#eb8f7a"
      }
    }
    enableSubmitButton()
  }, [title, notes])

  return (
    <div className="App">
      <aside>
        <strong>Caderno de Notas</strong>
        <form onSubmit={handleSubmit}>

          <div className="input-block">
            <label htmlFor="title">Título da Anotação</label>
            <input
              required
              maxLength="30"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />

          </div>
          <div className="input-block">
            <label htmlFor="nota">Anotações</label>
            <textarea
              required
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>
          <button id='btn_submit' type="submit">Salvar</button>
        </form>
        <RadioButton 
          selectedValue={selectedValue}
          handleChange={handleChange}
        />
      </aside>

      <main>
        <ul>
          {allNotes.map(data => (
            <Notes data={data} 
              handleDelete={handleDelete}
              handleChangePriority={handleChangePriority}
            />
          ))}

        </ul>
      </main>

    </div>
  );
}

export default App;
