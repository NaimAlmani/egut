import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { NavItem, NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography } from '@material-ui/core';
import IconItem from './../common/icons/IconItem';
import { Container, Row, Col } from 'reactstrap';
import defaults from './../../utils/defaults';
import { Fade } from 'react-reveal';
import ContactForm from './../headers/ContactForm';
const styles = theme => ({
  title: {
    textAlign: 'center'
  },
  section: {
    width: '50%',
    margin: '20px auto'
  }
});

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isContactShow: false
    };
  }
  componentDidMount() {}

  render() {
    const { classes } = this.props;

    return (
      <div>
        <h4 className={classes.title}>Restad Gård Utbildning AB</h4>
        <div className={classes.section}>
          Restad Gård Utbildning erbjuder asylsökande på Restad Gård samt
          asylsökande i och runt Vänersborg utbildning i svenska,
          samhällsorientering samt datakunskap. Vi samverkar även med de
          asylsökandes egna organisationer samt studieförbund och
          frivilligorganisationer att genomföra sina verksamheter på Restad
          Gård.
          <br />
          Detta kan ske genom olika sätt: tillhandahålla lokaler, lärarutbyte,
          materialutveckling etc. I den dagliga verksamheten erbjuds svenska på
          sex nivåer. Deltagarna delas in i grupper utifrån språknivå.
          Samhällsorienteringen är en integrerad del i svenskundervisningen.
          <br />
          Likaså dataanvändning ingår i lektionerna. Efter önskemål erbjuds
          numera även körkortsteori.
          <br />I dagsläget är det ungefär 130 personer som deltar i
          språkutbildning under veckan. På Restad Gård använder vi
          snabbinlärningsmetoden Suggestopedi. Samtliga lärare är utbildade i
          metoden. Suggestopedi på Restad Gård fokuserar initialt på förmågan
          att kommunicera muntligt i de situationer den enskilde möter i
          vardagen.
          <br />
          På högre nivåer byggs det också på med skriftlig produktion.
          <br /> Ole Guldahl är VD och ansvarar för Restad Gård Utbildnings
          aktiviteter på Restad Gård. Christina Johnstone är suggestopedipedagog
          och samordnare för den pedagogiska verksamheten i Kunskapens Hus – i
          hus 7.
          <br />
          Vår administrations assistent Khalil Albash, ansvarar för logistik och
          datorutbildning i vår datasal.
          <br />
          Därutöver arbetar Ida, Samar, Mattias och Thana med cirkelstöd från
          studieförbunden.
        </div>
        <div className={classes.section}>
          Initiativet till att etablera språkutbildning kom från Restad Gård ABs
          ägare på vintern/våren 2016. Syftet var att etablera en språkskola med
          frivilliglärare från ideella organisationer. Den övergripande
          målsättningen var att skapa en meningsfull väntan och att utnyttja
          väntetiden till aktiviteter och förbereda för integration i det
          svenska samhället. Syftet var att underlätta för alla i det dagliga
          mötet med samhället. Ytterligare en anledning var att
          språkaktiviteterna skulle bidra till att reducera psykisk ohälsa.
          Förberedelserna pågick under andra halvåret 2016 med rekrytering av
          frivilliglärare, utbildning, utveckling av läromaterial, planering av
          utbildning samt information till de boende på Restad Gård. Tio
          klassrum ställdes i ordning över 3 våningar. 2017 Vid uppstarten i
          januari startades 10 grupper upp, med mellan elever 10-15 i varje
          grupp. Efter ett fantastiskt första kvartal, tackade frivilliglärarna
          för sig och en efter en anslöt sig studieförbunden: ABF, Vuxenskolan,
          Studiefrämjandet, Medborgarskolan samt Folkuniversitetet, under det
          andra kvartalet. Parallellt anställdes två tjänster och Restad Gård
          Utbildning etablerades våren 2017. Studieorganisationerna har fortsatt
          varit aktiva med studiecirklar i varierad grad i språkskolan. Dessa
          finansieras av medel för Tidiga insatser för asylsökande samt svenska
          från dag ett från Folkbildningsrådet. Förövrigt finansieras
          verksamheten av Restad Gårds ägare, utan något externt stöd.
          Verksamheten har utvecklats från 2017 med fokus på Suggestopedi som
          pedagogisk metod – tack vare anställningen av suggestopedipedagogen
          Christina Johnstone. 2018 Antalet aktiva elever under 2018 har
          varierat av olika orsaker. Från 40 – 50 personer till 80 personer har
          tagit möjligheten att varje vecka komma till skolan för att förkovra
          sig. Under 2018 utvidgades också innehållet i språkutbildningen till
          att även omfatta samhällsorientering som en integrerad del i
          svenskutbildningen. Dessutom introducerades trafikutbildning, odling,
          svenska i köket samt språkcafé, allt med svenska språket som grund.
          Genom samverkan med övriga aktiva organisationer på Restad Gård har
          verksamheten vuxit till att även omfatta forskning, cykelkurs, idrott,
          psykisk hälsa, älskade barn.
        </div>
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(withStyles(styles)(About));
