import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import FlashMessage from 'react-flash-message'

const Message = () => (
  <FlashMessage duration={5000}>
    <div style={{position:'absolute', bottom:'10%', right:'45%', border:'1px solid green', padding: '1rem'}}>
      <div style={{color: "green", fontSize: "1rem",fontWeight: "bold"}}>Formularz wysłany!</div>
      <div style={{color: "green", fontSize: "1rem",fontWeight: "bold"}}>Wkrótce się skontaktujemy.</div>
    </div>
  </FlashMessage>
)

export default class Wizard extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }
  static Page = ({ children }) => children

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      values: props.initialValues || {},
      formSent: false
    }
  }
  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    }))

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }))

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  validate = values => {
    const activePage = React.Children.toArray(this.props.children)[
      this.state.page
    ]
    return activePage.props.validate ? activePage.props.validate(values) : {}
  }

  handleSubmit = values => {
    const { children, onSubmit } = this.props
    const { page } = this.state
    const isLastPage = page === React.Children.count(children) - 1
    if (isLastPage) {
      return onSubmit(values)
    } else {
      this.next(values)
    }
  }

  render() {
    const { children } = this.props
    const { page, values } = this.state
    const activePage = React.Children.toArray(children)[page]
    const isLastPage = page === React.Children.count(children) - 1
    const formToReset = document.getElementById('wizard_form');
    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, submitting, values }) => (
          <form
            onSubmit={(event) => {
              const promise = handleSubmit(event);
              promise && promise.then(() => {
                const frm_elements = formToReset.elements;
                for(let i = 0; i < frm_elements.length; i++) {
                  frm_elements[i].value = "";
                }
                console.log(this.state.formSent);
                this.setState({formSent: true});
                console.log(this.state.formSent);
              })
              return promise;
            }}
          id='wizard_form'>
            {activePage}
            <div className="buttons">
              {page > 0 && (
                <button className="button" type="button" onClick={this.previous}>
                  Wstecz
                </button>
              )}
              {!isLastPage && <button className="button" type="submit">Dalej</button>}
              {isLastPage && (
                <button className="button" type="submit" disabled={submitting}>
                  Wyślij
                </button>
              )}
            </div>
            {this.state.formSent ? <Message /> : null}
          </form>
        )}
      </Form>
    )
  }
}
