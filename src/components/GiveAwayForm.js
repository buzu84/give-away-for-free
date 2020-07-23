/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
// import Styles from './GiveAwayForm/Styles';
import { Field } from 'react-final-form';
import Wizard from './GiveAwayForm/Wizard';
import DatePicker from "react-datepicker";
import myPic_4 from '../assets/Icon-4.svg';
import myPic_1 from '../assets/Icon-1.svg';
import mySvg from '../assets/Decoration.svg';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const Error = ({ name }) => (
  <Field
    name={name}
    subscribe={{ touched: true, error: true }}
    render={({ meta: { touched, error } }) =>
      touched && error ? <span>{error}</span> : null
    }
  />
)

const required = value => (value ? undefined : 'Required')

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

const GiveAwayFormBase = () => (
    <Wizard
      initialValues={{ helpGroups: [], city: '', street: '', zip_code: '', phone: '', date: '', time: '' }}
      onSubmit={onSubmit}
    >
      <Wizard.Page>
        <div className="step">
        <h2>Ważne!</h2>
        <p>Uzupełnij szcegóły dotyczące rzeczy. Dzięki temu bedziemy wiedzieć komu najlepiej je przekazać.</p>
        </div>
        <h4>Krok 1/4</h4>
        <h1>Zaznacz co chcesz oddać:</h1>
        <div>
          <label>
            <Field name="pick" component="input" type="radio" value="ubrania" validate={required}/>{' '}
            Ubrania, które nadają się do ponownego użycia
          </label>
          <Error name="pick" />
        </div>
        <div>
          <label>
            <Field name="pick" component="input" type="radio" value="stare_ubrania" validate={required}/>{' '}
            Ubrania, do wyrzucenia
          </label>
          <Error name="pick" />
        </div>
        <div>
          <label>
            <Field name="pick" component="input" type="radio" value="zabawki" validate={required}/>{' '}
            Zabawki
          </label>
          <Error name="pick" />
        </div>
        <div>
          <label>
            <Field name="pick" component="input" type="radio" value="ksiazki" validate={required}/>{' '}
            Książki
          </label>
          <Error name="pick" />
        </div>
        <div>
          <label>
            <Field name="pick" component="input" type="radio" value="inne" validate={required}/>{' '}
            Inne
          </label>
          <Error name="pick" />
        </div>
      </Wizard.Page>
      <Wizard.Page
        validate={values => {
          const errors = {}
          if (!values.bags || values.bags === "--wybierz--") {
            errors.bags = 'Required'
          }
          return errors
        }}
      >
        <div className="step">
        <h2>Ważne!</h2>
        <p>Wszystkie rzeczy do oddania zapakuj w 60l worki. Dokładną instrukcję jak poprawnie zapakować rzeczy znajdziesz <button>TUTAJ</button></p>
        </div>
        <h4>Krok 2/4</h4>
        <h1>Podaj liczbę 60l worków, w które spakowałeś/łaś rzeczy:</h1>
        <div>
          <label>Liczba 60l worków:</label>
          <Field name="bags" component="select">
            <option>--wybierz--</option>
            <option value="1" >1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Field>
          <Error name="bags" />
        </div>
      </Wizard.Page>
      <Wizard.Page
        validate={values => {
          const errors = {}
          if ((!values.localization || values.localization === '--wybierz--') && !values.localizationSpecific) {
            errors.localization = 'Pick from a list or enter specific localization'
          }
          if (values.helpGroups.length === 0) {
            errors.helpGroups = 'Required'
          }
          return errors
        }}
      >
      <div className="step">
      <h2>Ważne!</h2>
      <p>Jeśli chcesz pomóc, wybierz komu najchętniej. Wybierz lub wpisz lokalizację.</p>
      </div>
      <h4>Krok 3/4</h4>
      <h1>Lokalizacja:</h1>
      <div>
        <Field name="localization" component="select">
          <option >--wybierz--</option>
          <option value="Poznań" >Poznań</option>
          <option value="Kraków">Kraków</option>
          <option value="Warszawa">Warszawa</option>
          <option value="Wrocław">Wrocław</option>
          <option value="Katowice">Katowice</option>
        </Field>
        <Error name="localization" />
      </div>
      <h4>Komu chcesz pomóc?</h4>
      <div>
        <label>
          <Field name="helpGroups" component="input" type="checkbox" value="dzieci" />
          dzieciom
        </label>
        <Error name="helpGroups" />
      </div>
      <div>
        <label>
          <Field name="helpGroups" component="input" type="checkbox" value="matki" />
          samotnym matkom
        </label>
        <Error name="helpGroups" />
      </div>
      <div>
        <label>
          <Field name="helpGroups" component="input" type="checkbox" value="bezdomni" />
          bezdomnym
        </label>
        <Error name="helpGroups" />
      </div>
      <div>
        <label>
          <Field name="helpGroups" component="input" type="checkbox" value="niepelnosprawni" />
          niepełnosprawnym
        </label>
        <Error name="helpGroups" />
      </div>
      <div>
        <label>
          <Field name="helpGroups" component="input" type="checkbox" value="starsi" />
          osobom starszym
        </label>
        <Error name="helpGroups" />
      </div>
      <div>
        <h4>Wpisz nazwę konkretnej lokalizacji(opcjonalnie)</h4>
        <label>
          <Field name="localizationSpecific" component="input" type="text" />
        </label>
        <Error name="localization" />
      </div>
      </Wizard.Page>
      <Wizard.Page
        validate={values => {
          const zipRegEx = /[\d]{2}-[\d]{3}/g;
          const phoneRegEx = /^(\d{9})$/;
          const errors = {}
          if (values.street.length <= 2) {
            errors.street = 'At least 3 characters'
          }
          if (values.city.length <= 2) {
            errors.city = 'At least 3 characters'
          }
          if (!values.zip_code.match(zipRegEx)) {
            errors.zip_code = 'Bad zip code format'
          }
          if (values.time  === '') {
            errors.time = 'Pick time'
          }
          if (values.date === '') {
            errors.date = 'Pick date'
          }
          if (!values.phone.match(phoneRegEx)) {
            errors.phone = 'Bad phone format'
          }
          return errors
        }}
      >
        <div>
          <div className="step">
          <h2>Ważne!</h2>
          <p>Podaj adres oraz termin odbioru rzeczy.</p>
          </div>
          <h4>Krok 4/4</h4>
          <h1>Podaj adres oraz termin odbioru rzeczy przez kuriera:</h1>

          <div>
            <h2>Adres odbioru:</h2>
            <div>
              <label>
                Ulica
                <Field name="street" component="input" type="text" />
              </label>
              <Error name="street" />
            </div>
            <div>
              <label>
                Miasto
                <Field name="city" component="input" type="text" />
              </label>
              <Error name="city" />
            </div>
            <div>
              <label>
                Kod pocztowy
                <Field name="zip_code" component="input" type="text" />
              </label>
              <Error name="zip_code" />
            </div>
            <div>
              <label>
                Numer telefonu
                <Field name="phone" component="input" type="text" />
              </label>
              <Error name="phone" />
            </div>
          </div>
          <div>
            <h2>Termin odbioru:</h2>
            <div>
              <label>
                Data
                <Field name="date" component="input" type="date" min={formatDate(new Date())}/>
              </label>
              <DatePicker
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
            />
              <Error name="date" />
            </div>
            <div>
              <label>
                Godzina
                <Field name="time" component="input" type="time" />
              </label>
              <Error name="time" />
            </div>
            <div>
              <label>Uwagi da kuriera</label>
              <Field name="notes" component="textarea" placeholder="uwagi" />
              <Error name="notes" />
            </div>
          </div>
        </div>
      </Wizard.Page>
      <Wizard.Page>
      <h1>Podsumowanie Twojej darowizny</h1>
      <h4>Oddajesz:</h4>
      <div>
        <img src={myPic_1} alt="bags" />
        <p>ile workow, jakie rzeczy, ktorym grupom</p>
      </div>
      <div>
        <img src={myPic_4} alt="localization" />
        <p>dla lokalizacji </p>
      </div>
      <div>
        <h4>Adres odbioru:</h4>
        <p>Ulica </p>
        <p>Miasto </p>
        <p>Kod pocztowy </p>
      </div>
      <div>
        <h4>Termin odbioru:</h4>
        <p>Data </p>
        <p>Godzina </p>
        <p>Uwagi </p>
      </div>
      <div className="hidden">
        <label>Uwagi da kuriera</label>
        <Field name="notes" component="textarea" placeholder="uwagi" />
        <Error name="notes" />
      </div>
      </Wizard.Page>
      <Wizard.Page>
      <p>Dziękujemy za wypełnienie formularza!</p>
      <p>Na maila prześlemy wszelkie</p>
      <p>informacje o odbiorze.</p>
      <div className="hidden">
        <label>Uwagi da kuriera</label>
        <Field name="notes" component="textarea" placeholder="uwagi" />
        <Error name="notes" />
      </div>

      </Wizard.Page>
    </Wizard>
)

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
            <div className="step_cont">
              <span className="dot dot_left"></span>
              <p>1</p>
              <p>Wybierz rzeczy</p>

            </div>
            <div className="step_cont">
              <p>2</p>
              <p>Spakuj je w worki</p>
            </div>
            <div className="step_cont">
              <p>3</p>
              <p>Wybierz fundację</p>
            </div>
            <div className="step_cont">
              <p>4</p>
              <p>Zamów kuriera</p>
            </div>
          </div>
        </div>
      </div>
      <div className="form_pic_container">
        <GiveAwayFormBase />
      </div>
    </>


  )
}

export default GiveAwayForm;
