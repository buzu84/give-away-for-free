import React, { useState } from "react";
import mySvg_1 from '../../assets/Decoration.svg';

const HomeContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState([]);
  const [emailError, setEmailError] = useState([]);
  const [messageError, setMessageError] = useState([]);
  // const [errors, setErrors] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors.length !== 0) {
      // setErrors(validationErrors);
      console.log('sa bledy!');
    } else {
      sendMessage();
    }
  }

  const sendMessage = () => {
    const url = 'https://fer-api.coderslab.pl/v1/portfolio/contact';
    const userMessage = {
      name,
      email,
      message
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userMessage)
    })
      .then(response => {
      if (response.status === 200) {
        setName('');
        setEmail('');
        setMessage('');
        // setErrors([]);
        setNameError('');
        setEmailError('');
        setMessageError('');
      }
    })
    .catch(error => {
      console.log("There was an error with the `message request`: ", error);
    });
  }

  const validate = () => {
    const validationErrors = [];
    const lettersOnly = /^[A-Za-z]+$/;
    const letters = /(?!^\d+$)^.+$/;
    if (!name || name.length < 3 || !name.match(lettersOnly)) {
      validationErrors.push('Imię powinno składać się z min. 3 liter!');
      setNameError('Imię nieprawidłowe!');
    } else {
      setNameError('');
    }
    if (!message || message.length <= 120 || message.length > 200 || !message.match(letters)) {
      validationErrors.push('Dodaj wiadomość składającą się z min. 120 znaków i maksymalnie 200!');
      setMessageError('Min 120, max 200 znaków');
    } else {
      setMessageError('');
    }
    if (!email || !email.includes('@')) {
      validationErrors.push('Wpisz poprawny email!');
      setEmailError('Email nieprawidłowy!');
    } else {
      setEmailError('');
    }
    return validationErrors;
  }

  const handleNameChange = e => {
    setName(e.target.value);
  }
  const handleEmailChange = e => {
    setEmail(e.target.value);
  }
  const handleMessageChange = e => {
    setMessage(e.target.value);
  }
  return (
    <section id="section4" className="contact_us info-section-5 container" style={{height: '800px'}}>
      <div className="row">
        <div className="column"></div>
        <div className="column">
          <div className="info-item info-item-4">
            <div className="info-box">
              <h1 >Skontaktuj się z nami</h1>
              <img className="icon" src={mySvg_1} alt="decoration" />
              <div className="container visible_form">
                <fieldset className="form_field">
                  <form onSubmit={handleSubmit} className="form_flex">
                    <div className="name_email_container">
                      <div className="name_container">
                        <label className="form_label">Imię:</label>
                        {nameError.length === 0 ? (
                          <input className="contact_input" value={name} type="text" name="name" onChange={handleNameChange} placeholder="Krzysztof" />
                        ) : (
                          <input className="contact_input_2" value={name} type="text" name="name" onChange={handleNameChange} placeholder="Krzysztof"/>
                        )}
                        <strong style={{color: "red", fontSize: "0.8rem",fontWeight: "bold"}}>{nameError}</strong>

                      </div>
                      <div className="name_container">
                        <label className="form_label">E-mail:</label>
                        {emailError.length === 0 ? (
                          <input className="contact_input" value={email} type="text" name="email" onChange={handleEmailChange} placeholder="krzysztof@wp.pl"/>
                        ) : (
                          <input className="contact_input_2" value={email} type="text" name="email" onChange={handleEmailChange} placeholder="krzysztof@wp.pl"/>
                        )}
                        <strong style={{color: "red", fontSize: "0.8rem",fontWeight: "bold"}}>{emailError}</strong>
                      </div>
                    </div>
                    <label className="form_label">Wpisz swoją wiadomość:</label>
                    {messageError.length === 0 ? (
                      <textarea className="contact_input text_area_input" value={message} type="text" name="message" onChange={handleMessageChange} rows="10" cols="40" placeholder="Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini."/>
                    ) : (
                      <textarea className="contact_input_2" value={message} type="text" name="message" onChange={handleMessageChange} rows="10" cols="40" placeholder="Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini."/>
                    )}

                    <strong style={{color: "red", fontSize: "0.8rem",fontWeight: "bold"}}>{messageError}</strong>
                    <div className="form_btn_container">
                      <button className="form_btn" type="submit">Dodaj!</button>
                    </div>
                  </form>
                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="footerElements">
        <div className="ender_container">
          <div className="ender">Copyright by <span>Coders Lab</span></div>
        </div>
        <div className="socialMedia">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-square"></i></a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        </div>
      </footer>
    </section>
  );
}

export default HomeContact;
