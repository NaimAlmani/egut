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
import TimeLine from 'react-time-line';
import { FacebookProvider, Like, Page } from 'react-facebook';
const styles = theme => ({
  title: {
    textAlign: 'center',
    marginTop: '40px'
  },
  section: {
    width: '50%',
    margin: '20px auto'
  },
  secondSection: {
    padding: '30px'
  },
  IconContainer: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    background: '#f0f0f0',
    textAlign: 'center',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px'
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
      <FacebookProvider appId='524050761572679'>
        <div>
          <Fade>
            <Typography variant='headline' className={classes.title}>
              Restad Gård Utbildning AB
            </Typography>
          </Fade>
          <Divider
            width='25%'
            variant='middle'
            style={{ margin: '20px auto' }}
          />
          <div className={classes.section}>
            <Fade>
              <Typography variant='subheading'>
                Restad Gård Utbildning erbjuder asylsökande på Restad Gård samt
                asylsökande i och runt Vänersborg utbildning i svenska,
                samhällsorientering samt datakunskap. Vi samverkar även med de
                asylsökandes egna organisationer samt studieförbund och
                frivilligorganisationer att genomföra sina verksamheter på
                Restad Gård. Detta kan ske genom olika sätt: tillhandahålla
                lokaler, lärarutbyte, materialutveckling etc.
              </Typography>
            </Fade>
            <br />
            <Fade>
              <Typography variant='subheading'>
                I den dagliga verksamheten erbjuds svenska på sex nivåer.
                Deltagarna delas in i grupper utifrån språknivå.
                Samhällsorienteringen är en integrerad del i
                svenskundervisningen. Likaså dataanvändning ingår i lektionerna.
                Efter önskemål erbjuds numera även körkortsteori. I dagsläget är
                det ungefär 130 personer som deltar i språkutbildning under
                veckan.
              </Typography>
            </Fade>
            <br />
            <Fade>
              <Typography variant='subheading'>
                På Restad Gård använder vi snabbinlärningsmetoden Suggestopedi.
                Samtliga lärare är utbildade i metoden. Suggestopedi på Restad
                Gård fokuserar initialt på förmågan att kommunicera muntligt i
                de situationer den enskilde möter i vardagen. På högre nivåer
                byggs det också på med skriftlig produktion.
                <br />
                Ole Guldahl är VD och ansvarar för Restad Gård Utbildnings
                aktiviteter på Restad Gård. Christina Johnstone är
                suggestopedipedagog och samordnare för den pedagogiska
                verksamheten i Kunskapens Hus – i hus 7. Vår administrations
                assistent Khalil Albash, ansvarar för logistik och
                datorutbildning i vår datasal. Därutöver arbetar Ida, Samar,
                Mattias och Thana med cirkelstöd från studieförbunden.
              </Typography>
            </Fade>
            <div className={classes.secondSection}>
              <Fade>
                <Typography variant='h5' style={{ textAlign: 'center' }}>
                  Historik
                </Typography>
              </Fade>
              <Divider
                width='25%'
                variant='middle'
                style={{ margin: '20px auto' }}
              />

              <br />
              <Fade>
                <Typography variant='subheading'>
                  Initiativet till att etablera språkutbildning kom från Restad
                  Gård ABs ägare på vintern/våren 2016. Syftet var att etablera
                  en språkskola med frivilliglärare från ideella organisationer.
                  Den övergripande målsättningen var att skapa en meningsfull
                  väntan och att utnyttja väntetiden till aktiviteter och
                  förbereda för integration i det svenska samhället. Syftet var
                  att underlätta för alla i det dagliga mötet med samhället.
                  Ytterligare en anledning var att språkaktiviteterna skulle
                  bidra till att reducera psykisk ohälsa.
                  <br />
                  <br />
                  Förberedelserna pågick under andra halvåret 2016 med
                  rekrytering av frivilliglärare, utbildning, utveckling av
                  läromaterial, planering av utbildning samt information till de
                  boende på Restad Gård. Tio klassrum ställdes i ordning över 3
                  våningar.
                </Typography>
              </Fade>
              <br />
              <br />
              <Fade>
                <Typography variant='subtitle2' style={{ fontWeight: 'bold' }}>
                  {' '}
                  2017
                </Typography>
              </Fade>
              <Fade>
                <Typography variant='subheading'>
                  - Vid uppstarten i januari startades 10 grupper upp, med
                  mellan elever 10-15 i varje grupp. Efter ett fantastiskt
                  första kvartal, tackade frivilliglärarna för sig och en efter
                  en anslöt sig studieförbunden: ABF, Vuxenskolan,
                  Studiefrämjandet, Medborgarskolan samt Folkuniversitetet,
                  under det andra kvartalet. Parallellt anställdes två tjänster
                  och Restad Gård Utbildning etablerades våren 2017.
                </Typography>
              </Fade>
              <br />
              <Fade>
                <Typography variant='subheading'>
                  - Studieorganisationerna har fortsatt varit aktiva med
                  studiecirklar i varierad grad i språkskolan. Dessa finansieras
                  av medel för Tidiga insatser för asylsökande samt svenska från
                  dag ett från Folkbildningsrådet. Förövrigt finansieras
                  verksamheten av Restad Gårds ägare, utan något externt stöd.
                </Typography>
              </Fade>
              <br />
              <Fade>
                <Typography variant='subheading'>
                  - Verksamheten har utvecklats från 2017 med fokus på
                  Suggestopedi som pedagogisk metod – tack vare anställningen av
                  suggestopedipedagogen Christina Johnstone.
                </Typography>
              </Fade>
              <br />

              <br />
              <br />
              <Fade>
                <Typography variant='subtitle2' style={{ fontWeight: 'bold' }}>
                  {' '}
                  2018
                </Typography>
              </Fade>
              <Fade>
                <Typography variant='subheading'>
                  - Antalet aktiva elever under 2018 har varierat av olika
                  orsaker. Från 40 – 50 personer till 80 personer har tagit
                  möjligheten att varje vecka komma till skolan för att förkovra
                  sig.
                </Typography>
              </Fade>
              <br />
              <Fade>
                <Typography variant='subheading'>
                  - Under 2018 utvidgades också innehållet i språkutbildningen
                  till att även omfatta samhällsorientering som en integrerad
                  del i svenskutbildningen. Dessutom introducerades
                  trafikutbildning, odling, svenska i köket samt språkcafé, allt
                  med svenska språket som grund.
                </Typography>
              </Fade>
              <br />
              <Fade>
                <Typography variant='subheading'>
                  - Genom samverkan med övriga aktiva organisationer på Restad
                  Gård har verksamheten vuxit till att även omfatta forskning,
                  cykelkurs, idrott, psykisk hälsa, älskade barn.
                </Typography>
              </Fade>
              <br />
              <br />
            </div>
          </div>
          <div style={{ padding: '40px', background: '#333' }}>
            <Fade>
              <Typography
                variant='h5'
                style={{ textAlign: 'center', color: '#fff' }}
              >
                Besök oss
              </Typography>
            </Fade>
            <Divider
              width='25%'
              variant='middle'
              style={{ margin: '20px auto', color: '#fff', background: '#fff' }}
            />
            <Grid container>
              <Grid item lg={6} md={6} justify='space-around'>
                <Fade>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2094.07301115633!2d12.35754701603256!3d58.34156958132421!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4645232fad5169b3%3A0xc32798648a5a44e0!2sRestad%20G%C3%A5rd%20Utbildning!5e0!3m2!1sen!2sse!4v1581132624710!5m2!1sen!2sse'
                    width='75%'
                    height='300px'
                    frameborder='0'
                    allowfullscreen=''
                    style={{ margin: '0 auto' }}
                  ></iframe>
                </Fade>
              </Grid>
              <Grid item lg={6} md={6}>
                <Fade>
                  <Typography
                    variant='subtitle2'
                    style={{
                      textAlign: 'left',
                      color: '#fff',
                      margin: '20px',
                      marginLeft: '50px',
                      fontSize: '20px'
                    }}
                  >
                    Restad Gård Utbildning AB
                  </Typography>
                </Fade>

                <ul style={{ listStyle: 'none' }}>
                  <Fade>
                    <div>
                      <div className={classes.IconContainer}>
                        <IconItem name='map' size={20} />
                      </div>
                      <Typography
                        variant='subtitle2'
                        style={{
                          color: '#fff',
                          display: 'inline-flex',
                          fontSize: '14px'
                        }}
                      >
                        Kungsladugårdsvägen 5, 462 54 Vänersborg (Restad Gård
                        Utbildning AB)
                      </Typography>
                    </div>
                  </Fade>
                  <Fade>
                    <div>
                      <div className={classes.IconContainer}>
                        <IconItem name='phone' size={20} />
                      </div>
                      <Typography
                        variant='subtitle2'
                        style={{
                          color: '#fff',
                          display: 'inline-flex',
                          fontSize: '14px'
                        }}
                      >
                        0762143512
                      </Typography>
                    </div>
                  </Fade>
                  <Fade>
                    <div>
                      <div className={classes.IconContainer}>
                        <IconItem name='mail' size={20} />
                      </div>
                      <Typography
                        variant='subtitle2'
                        style={{
                          color: '#fff',
                          display: 'inline-flex',
                          fontSize: '14px'
                        }}
                      >
                        info@restadgard-utb.se
                      </Typography>
                    </div>
                  </Fade>
                </ul>
              </Grid>
            </Grid>
          </div>
        </div>
      </FacebookProvider>
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
