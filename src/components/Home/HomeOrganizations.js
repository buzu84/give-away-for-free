import React, { Component } from 'react'
import { compose } from 'recompose'
import { withFirebase } from '../Firebase'
import mySvg from '../../assets/Decoration.svg'
import Spinner from "./Spinner"

class HomeOrganizations extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      showHideOrganizations: false,
      showHideFoundations: true,
      showHideCollections: false
    };
    this.hideComponent = this.hideComponent.bind(this);
  }
  hideComponent(name) {
    switch (name) {
      case "showHideOrganizations":
        if (this.state.showHideFoundations === true) {
          this.setState({ showHideFoundations: !this.state.showHideFoundations });
        }
        if (this.state.showHideCollections === true) {
          this.setState({ showHideCollections: !this.state.showHideCollections });
        }
        if (this.state.showHideOrganizations === false) {
          this.setState({ showHideOrganizations: !this.state.showHideOrganizations });
        }
        break;
      case "showHideFoundations":
        if (this.state.showHideOrganizations === true) {
          this.setState({ showHideOrganizations: !this.state.showHideOrganizations });
        }
        if (this.state.showHideCollections === true) {
          this.setState({ showHideCollections: !this.state.showHideCollections });
        }
        if (this.state.showHideFoundations === false) {
          this.setState({ showHideFoundations: !this.state.showHideFoundations });
        }
        break;
      case "showHideCollections":
        if (this.state.showHideFoundations === true) {
          this.setState({ showHideFoundations: !this.state.showHideFoundations });
        }
        if (this.state.showHideOrganizations === true) {
          this.setState({ showHideOrganizations: !this.state.showHideOrganizations });
        }
        if (this.state.showHideCollections === false) {
          this.setState({ showHideCollections: !this.state.showHideCollections });
        }
        break;
      default:;
    }
  }
  render () {
    const { showHideOrganizations, showHideFoundations, showHideCollections } = this.state;
    return (
      <section id="section3" className="organizations_list info-section-6 container" style={{height: 'auto'}}>
        <h1>Komu pomagamy?</h1>
        <img className="image" src={mySvg} alt="decoration" />
        <div className="info-item info-item-2">
          <button className="btn_give_away_third" onClick={() => this.hideComponent("showHideFoundations")}>FUNDACJOM</button>
          <button className="btn_give_away_third" onClick={() => this.hideComponent("showHideOrganizations")}>ORGANIZACJOM<br></br>POZARZĄDOWYM</button>
          <button className="btn_give_away_third" onClick={() => this.hideComponent("showHideCollections")}>LOKALNYM<br></br>ZBIÓRKOM</button>
        </div>
        {showHideOrganizations && <Organizations />}
        {showHideFoundations && <Foundations />}
        {showHideCollections && <Collections />}
      </section>
    );
  }

}

const OrganizationList = ({ organizations }) => (
  <ul className="help_organisation_container">
    {organizations.map(organization => (
      <OrganizationItem key={organization.uid} organization={organization} />
    ))}
  </ul>
);

const FoundationList = ({ foundations }) => (
  <ul className="help_organisation_container">
    {foundations.map(foundation => (
      <FoundationItem key={foundation.uid} foundation={foundation} />
    ))}
  </ul>
);

const CollectionList = ({ collections }) => (
  <ul className="help_organisation_container">
    {collections.map(collection => (
      <CollectionItem key={collection.uid} collection={collection} />
    ))}
  </ul>
);

const OrganizationItem = ({ organization }) => (
  <li className="help_organisation">
    <h2>{organization.name} </h2>
    <strong>{organization.cel}</strong>
    <strong className="align_right"> rzeczy:  {organization.rzeczy}</strong>
  </li>
);

const FoundationItem = ({ foundation }) => (
  <li className="help_organisation">
    <h2>{foundation.name}</h2>
    <strong>{foundation.cel}</strong>
    <strong className="align_right"> rzeczy:  {foundation.rzeczy}</strong>
  </li>
);

const CollectionItem = ({ collection }) => (
  <li className="help_organisation">
    <h2>{collection.name}</h2>
    <strong>{collection.cel}</strong>
    <strong className="align_right"> rzeczy:  {collection.rzeczy}</strong>
  </li>
);

class OrganizationsBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      organizations: []
    };
    this.handleFirstPage = this.handleFirstPage.bind(this);
    this.handleSecondPage = this.handleSecondPage.bind(this);
  }

  handleFirstPage() {
    this.setState({ loading: true });
    if (this.props.firebase != null) {
      this.props.firebase.organizations()
      .limitToFirst(3)
      .orderByKey()
      .startAt('1')
      .on('value', snapshot => {
        const dataObject = snapshot.val();
        if (dataObject) {
          const organizationList = Object.keys(dataObject).map(key => ({
            ...dataObject[key],
            uid: key,
          }));

          this.setState({
            organizations: organizationList,
            loading: false
          });
        } else {
          this.setState({ organizations: null, loading: false });
        }
      })
    }
  }

  handleSecondPage() {
    this.setState({ loading: true });

    if (this.props.firebase != null) {
      this.props.firebase.organizations()
      .limitToFirst(3)
      .orderByKey()
      .startAt('4')
      .on('value', snapshot => {
        const dataObject = snapshot.val();
        if (dataObject) {
          const organizationList = Object.keys(dataObject).map(key => ({
            ...dataObject[key],
            uid: key,
          }));

          this.setState({
            organizations: organizationList,
            loading: false
          });
        } else {
          this.setState({ organizations: null, loading: false });
        }
      })
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    if (this.props.firebase != null) {
      this.props.firebase.organizations()
      .limitToFirst(3)
      .orderByKey()
      .startAt('1')
      .on('value', snapshot => {
        const dataObject = snapshot.val();
        if (dataObject) {
          const organizationList = Object.keys(dataObject).map(key => ({
            ...dataObject[key],
            uid: key,
          }));

          this.setState({
            organizations: organizationList,
            loading: false
          });
        } else {
          this.setState({ organizations: null, loading: false });
        }
      })
    }
  }

  componentWillUnmount() {
    if (this.props.firebase != null) {
      this.props.firebase.organizations().off();
    }
  }

  render() {
    const { organizations, loading } = this.state;

    return (
      <div>
        {loading && <Spinner />}

        {organizations ? (
          <>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper ante ut tellus sagittis, rhoncus elementum massa bibendum. Cras sed maximus orci.
            </p>
            <OrganizationList organizations={organizations} />
            <div className="pagination">
              <button className="pagination_btn" onClick={this.handleFirstPage}>1</button>
              <button className="pagination_btn" onClick={this.handleSecondPage}>2</button>
            </div>
          </>
        ) : (
          <div>There are no organizations ...</div>
        )}
      </div>
    );
  }
}

class FoundationsBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      foundations: []
    };
    this.handleFirstPage = this.handleFirstPage.bind(this);
    this.handleSecondPage = this.handleSecondPage.bind(this);
    this.handleThirdPage = this.handleThirdPage.bind(this);
  }

  handleFirstPage() {
    this.setState({ loading: true });

    if (this.props.firebase != null) {
      this.props.firebase.foundations()
      .limitToFirst(3)
      .orderByKey()
      .startAt('1')
      .on('value', snapshot => {
        const dataObject = snapshot.val();
        if (dataObject) {
          const foundationList = Object.keys(dataObject).map(key => ({
            ...dataObject[key],
            uid: key,
          }));

          this.setState({
            foundations: foundationList,
            loading: false
          });
        } else {
          this.setState({ foundations: null, loading: false });
        }
      })
    }
  }

  handleSecondPage() {
    this.setState({ loading: true });

    if (this.props.firebase != null) {
      this.props.firebase.foundations()
      .limitToFirst(3)
      .orderByKey()
      .startAt('4')
      .on('value', snapshot => {
        const dataObject = snapshot.val();
        if (dataObject) {
          const foundationList = Object.keys(dataObject).map(key => ({
            ...dataObject[key],
            uid: key,
          }));

          this.setState({
            foundations: foundationList,
            loading: false
          });
        } else {
          this.setState({ foundations: null, loading: false });
        }
      })
    }
  }

  handleThirdPage() {
    this.setState({ loading: true });

    if (this.props.firebase != null) {
      this.props.firebase.foundations()
      .limitToFirst(3)
      .orderByKey()
      .startAt('7')
      .on('value', snapshot => {
        const dataObject = snapshot.val();
        if (dataObject) {
          const foundationList = Object.keys(dataObject).map(key => ({
            ...dataObject[key],
            uid: key,
          }));

          this.setState({
            foundations: foundationList,
            loading: false
          });
        } else {
          this.setState({ foundations: null, loading: false });
        }
      })
    }
  }

  componentDidMount() {
    this.setState({ loading: true });

    if (this.props.firebase != null) {
      this.props.firebase.foundations()
      .limitToFirst(3)
      .orderByKey()
      .startAt('1')
      .on('value', snapshot => {
        const dataObject = snapshot.val();
        if (dataObject) {
          const foundationList = Object.keys(dataObject).map(key => ({
            ...dataObject[key],
            uid: key,
          }));

          this.setState({
            foundations: foundationList,
            loading: false
          });
        } else {
          this.setState({ foundations: null, loading: false });
        }
      })
    }
  }

  componentWillUnmount() {
    if (this.props.firebase != null) {
      this.props.firebase.foundations().off();
    }
  }

  render() {
    const { foundations, loading } = this.state;

    return (
      <div>
        {loading && <Spinner />}

        {foundations ? (
          <>
            <p>
              W naszej bazie znajdziesz listę zweryfikowanych fundacji, z którymi współpracujemy. Mozesz sprawdzić czym się zajmują, komu pomagają i czego potrzebują.
            </p>
            <FoundationList foundations={foundations} />
            <div className="pagination">
              <button className="pagination_btn" onClick={this.handleFirstPage}>1</button>
              <button className="pagination_btn" onClick={this.handleSecondPage}>2</button>
              <button className="pagination_btn" onClick={this.handleThirdPage}>3</button>
            </div>
          </>
        ) : (
          <div>There are no Foundations ...</div>
        )}
      </div>
    );
  }
}

class CollectionsBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      collections: []
    };
  }
  componentDidMount() {
    this.setState({ loading: true });

    if (this.props.firebase != null) {
      this.props.firebase.collections()
      .limitToFirst(3)
      .orderByKey()
      .startAt('1')
      .on('value', snapshot => {
        const dataObject = snapshot.val();

        if (dataObject) {
          const collectionList = Object.keys(dataObject).map(key => ({
            ...dataObject[key],
            uid: key,
          }));

          this.setState({
            collections: collectionList,
            loading: false
          });
        } else {
          this.setState({ collections: null, loading: false });
        }
      })
    }
  }

  componentWillUnmount() {
    if (this.props.firebase != null) {
      this.props.firebase.collections().off();
    }
  }

  render() {
    const { collections, loading } = this.state;

    return (
      <div>
        {loading && <Spinner />}

        {collections ? (
          <>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ullamcorper ante ut tellus sagittis, rhoncus elementum massa bibendum. Cras sed maximus orci.
          </p>
            <CollectionList collections={collections} />
          </>
        ) : (
          <div>There are no Collections ...</div>
        )}
      </div>
    );
  }
}

const Organizations = compose(
  withFirebase
)(OrganizationsBase);

const Foundations = compose(
  withFirebase
)(FoundationsBase);

const Collections = compose(
  withFirebase
)(CollectionsBase);

export { Organizations, Foundations, Collections };

export default HomeOrganizations;
