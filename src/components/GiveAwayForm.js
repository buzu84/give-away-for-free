/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useContext } from "react";
import { Field } from 'react-final-form';
import Wizard from './GiveAwayForm/Wizard';
import mySvg from '../assets/Decoration.svg';
import withAuthorization from './Session/withAuthorization.js';
import { FirebaseContext } from './Firebase';

const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span style={{fontSize: "0.8rem", color: "red"}}>{error}</span> : null
    }
  />
)

const required = value => (value ? undefined : 'Wybierz jedną opcję')

function formatDate(date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2)
      month = '0' + month;
  if (day.length < 2)
      day = '0' + day;

  return [year, month, day].join('-');
};


const GiveAwayFormBase = () => {
  const firebase = useContext(FirebaseContext);
  const onSubmit = async values => {
    firebase.assemblies().push(JSON.stringify(values));
  }

  return (
    <Wizard
      initialValues={{ helpGroups: [], city: '', street: '', zip_code: '', phone: '', date: '', time: '', active: false }}
      onSubmit={onSubmit}
    >
      <Wizard.Page>
        <div className="form_page_cont">
          <div className="step">
            <h2 className="padd_left">Ważne!</h2>
            <p className="padd_left">Uzupełnij szczegóły dotyczące Twoich rzeczy. Dzięki temu bedziemy wiedzieć komu najlepiej je przekazać.</p>
          </div>
          <h4 className="padd_left step_no">Krok 1/4</h4>
          <h1 className="padd_left header_mark">Zaznacz co chcesz oddać:</h1>
          <div className="padd_left">
            <label>
              <Field name="pick" component="input" type="radio" value="ubrania" validate={required}/>{' '}
              Ubrania, które nadają się do ponownego użycia
            </label>
          </div>
          <div className="padd_left">
            <label>
              <Field name="pick" component="input" type="radio" value="stare_ubrania" validate={required}/>{' '}
              Ubrania do wyrzucenia
            </label>
          </div>
          <div className="padd_left">
            <label>
              <Field name="pick" component="input" type="radio" value="zabawki" validate={required}/>{' '}
              Zabawki
            </label>
          </div>
          <div className="padd_left">
            <label>
              <Field name="pick" component="input" type="radio" value="ksiazki" validate={required}/>{' '}
              Książki
            </label>
          </div>
          <div className="padd_left">
            <label>
              <Field name="pick" component="input" type="radio" value="inne" validate={required}/>{' '}
              Inne
            </label>
          </div>
          <div className="padd_left"><Error name="pick" /></div>
        </div>
      </Wizard.Page>
      <Wizard.Page
        validate={values => {
          const errors = {}
          if (!values.bags || values.bags === "--wybierz--") {
            errors.bags = 'Wybierz z listy!'
          }
          return errors
        }}
      >
        <div className="form_page_cont">
          <div className="step">
            <h2 className="padd_left">Ważne!</h2>
            <p className="padd_left">Wszystkie rzeczy do oddania zapakuj w 60l worki.</p>
          </div>
          <h4 className="padd_left step_no">Krok 2/4</h4>
          <h1 className="padd_left step_header">Podaj liczbę 60l worków, w które spakowałeś/łaś rzeczy:</h1>
          <div className="padd_left">
            <label>Liczba 60l worków:</label>
            <Field className="select" name="bags" component="select">
              <option>--wybierz--</option>
              <option value="1" >1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Field>
            <Error name="bags" />
          </div>
        </div>
      </Wizard.Page>
      <Wizard.Page
        validate={values => {
          const errors = {}
          if ((!values.localization || values.localization === '--wybierz--') && !values.localizationSpecific) {
            errors.localization = 'Wybierz z listy lub wpisz lokalizację'
          }
          if (values.helpGroups.length === 0) {
            errors.helpGroups = 'Wybierz przynajmniej jedną organizację'
          }
          return errors
        }}
      >
      <div className="form_page_cont">
        <div className="step">
          <h2 className="padd_left">Ważne!</h2>
          <p className="padd_left">Jeśli chcesz pomóc, wybierz komu najchętniej. Wybierz lub wpisz lokalizację.</p>
        </div>
        <h4 className="padd_left step_no">Krok 3/4</h4>
        <h1 className="padd_left smaller_head">Lokalizacja:</h1>
        <div className="flex_cont">
          <div className="padd_left flex_cont_2">
            <Field name="localization" component="select" className="select select_2">
              <option >--wybierz--</option>
              <option value="Poznań" >Poznań</option>
              <option value="Kraków">Kraków</option>
              <option value="Warszawa">Warszawa</option>
              <option value="Wrocław">Wrocław</option>
              <option value="Katowice">Katowice</option>
            </Field>
            <Error name="localization" />
          </div>
          <div className="padd_left">
            <h4 className="smaller_head">Wpisz nazwę konkretnej lokalizacji (opcjonalnie)</h4>
            <label>
              <Field name="localizationSpecific" component="input" type="text" />
            </label>
          </div>
        </div>
        <h4 className="padd_left smaller_head padd_top">Komu chcesz pomóc?</h4>
        <div className="padd_left">
          <label className='check_label'>
            <Field name="helpGroups" component="input" type="checkbox" value="dzieci" />
            Dzieciom
          </label>
        </div>
        <div className="padd_left">
          <label className='check_label'>
            <Field name="helpGroups" component="input" type="checkbox" value="matki" />
            Samotnym matkom
          </label>
        </div>
        <div className="padd_left">
          <label className='check_label'>
            <Field name="helpGroups" component="input" type="checkbox" value="bezdomni" />
            Bezdomnym
          </label>
        </div>
        <div className="padd_left">
          <label className='check_label'>
            <Field name="helpGroups" component="input" type="checkbox" value="niepelnosprawni" />
            Niepełnosprawnym
          </label>
        </div>
        <div className="padd_left">
          <label className='check_label'>
            <Field name="helpGroups" component="input" type="checkbox" value="starsi" />
            Osobom starszym
          </label>
        </div>
        <div className="padd_left"><Error name="helpGroups" /></div>
      </div>
      </Wizard.Page>
      <Wizard.Page
        validate={values => {
          const zipRegEx = /[\d]{2}-[\d]{3}/g;
          const phoneRegEx = /^(\d{9})$/;
          const errors = {}

          if (!values.street || values.street.length <= 2) {
            errors.street = 'Przynajmniej 3 znaki'
          }
          if (!values.city || values.city.length <= 2) {
            errors.city = 'Przynajmniej 3 znaki'
          }
          if (!values.zip_code || !values.zip_code.match(zipRegEx)) {
            errors.zip_code = 'Prawidłowy format to XX-XXX'
          }
          if (values.time  === '') {
            errors.time = 'Wybierz godzinę'
          }
          if (values.date === '') {
            errors.date = 'Wybierz datę'
          }
          if (!values.phone || !values.phone.match(phoneRegEx)) {
            errors.phone = 'Wprowadź prawidłowy telefon'
          }
          return errors
        }}
      >
        <div className="form_page_cont">
          <div className="step">
            <h2 className="padd_left">Ważne!</h2>
            <p className="padd_left">Podaj adres oraz termin odbioru rzeczy.</p>
          </div>
          <h4 className="padd_left step_no">Krok 4/4</h4>
          <h1 className="padd_left">Podaj adres oraz termin odbioru rzeczy przez kuriera:</h1>
          <div className="flex_cont_3">
            <div className="padd_left">
              <h2>Adres odbioru:</h2>
              <div>
                <label className="flex_cont_4">
                  Ulica
                  <Field name="street" component="input" type="text" />
                </label>
                <Error name="street" />
              </div>
              <div>
                <label className="flex_cont_4">
                  Miasto
                  <Field name="city" component="input" type="text" />
                </label>
                <Error name="city" />
              </div>
              <div>
                <label className="flex_cont_4">
                  Kod pocztowy
                  <Field name="zip_code" component="input" type="text" />
                </label>
                <Error name="zip_code" />
              </div>
              <div>
                <label className="flex_cont_4">
                  Numer telefonu
                  <Field name="phone" component="input" type="text" />
                </label>
                <Error name="phone" />
              </div>
            </div>
            <div className="padd_left">
              <h2>Termin odbioru:</h2>
              <div>
                <label className="flex_cont_4">
                  Data
                  <Field name="date" component="input" type="date" min={formatDate(new Date())}/>
                </label>
                <Error name="date" />
              </div>
              <div>
                <label className="flex_cont_4">
                  Godzina
                  <Field name="time" component="input" type="time" />
                </label>
                <Error name="time" />
              </div>
              <div>
                <label className="flex_cont_4">
                Uwagi dla kuriera
                  <Field name="notes" component="textarea" placeholder="uwagi" rows="4" cols="20"/>
                </label>
                <Error name="notes" />
              </div>
            </div>
          </div>
        </div>
      </Wizard.Page>
    </Wizard>
  )
}



const GiveAwayForm = () => {
  return (
    <>
      <div className="rel_cont">
        <div className="form_start_pic_container"></div>
        <div className="header_cont">
          <h1 className="title_head">Oddaj rzeczy, których już nie chcesz</h1>
          <h2 className="title_head">POTRZEBUJĄCYM</h2>
          <img src={mySvg} alt="decoration" />
          <h3 className="title_head">Wystarczą 4 proste kroki:</h3>
          <div className="steps_cont">
            <div className="step">
              <span className="square square_1"></span>
              <p className="padding">1</p>
              <p>Wybierz rzeczy</p>
            </div>
            <div className="step">
            <span className="square"></span>
              <p className="padding">2</p>
              <p>Spakuj je w worki</p>
            </div>
            <div className="step">
              <span className="square"></span>
              <p className="padding">3</p>
              <p>Wybierz fundację</p>
            </div>
            <div className="step">
              <span className="square"></span>
              <p className="padding">4</p>
              <p>Zamów kuriera</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rel_pic_cont">
        <div className="form_pic_container">
          <GiveAwayFormBase />
        </div>
      </div>
    </>
  )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(GiveAwayForm);
