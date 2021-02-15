import React from 'react'
import PropTypes from 'prop-types'
import { Form } from 'react-final-form'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'


export default compose(withRouter)(
  class Wizard extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }
  static Page = ({ children }) => children

  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      values: props.initialValues || {}
    }
  }

  next = values =>
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values
    })
  )

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    })
  )

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
    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, submitting, values }) => (
          <form onSubmit={(event) => {
            const promise = handleSubmit(event);
            promise && promise.then(() => {
              this.props.history.push('/form-sent')
            })
            return promise;
          }}>
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
          </form>
        )}
      </Form>
    )
  }
})
