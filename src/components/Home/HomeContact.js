import React, { useState } from "react";
import mySvg_1 from '../../assets/Decoration.svg';

const HomeContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
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
    <section id="section4" className="contact_us info-section-4 container" style={{height: '800px'}}>
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
                        <input  className="contact_input" value={name} type="text" name="name" onChange={handleNameChange} placeholder="Krzysztof"/>
                      </div>
                      <div className="name_container">
                        <label className="form_label">E-mail:</label>
                        <input className="contact_input" value={email} type="text" name="email" onChange={handleEmailChange} placeholder="krzysztof@wp.pl"/>
                      </div>
                    </div>
                    <label className="form_label">Wpisz swoją wiadomość:</label>
                    <textarea className="contact_input text_area_input" value={message} type="text" name="message" onChange={handleMessageChange} rows="10" cols="40" placeholder="Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut soko zucchini."/>
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
